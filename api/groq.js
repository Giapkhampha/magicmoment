// Magic Moment — Groq API Proxy
// Rate limit per IP: 30 req/min + 100 req/hour (in-memory, resets on cold-start — acceptable at this scale)

const ipMap = new Map(); // ip -> [timestamp, ...]
let keyIndex = 0;
const keyCooldowns = new Map(); // key -> cooldown until timestamp (ms)

function getKeys() {
  return (process.env.GROQ_KEYS || '')
    .split(',')
    .map(k => k.trim())
    .filter(Boolean);
}

function getIP(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const all = ipMap.get(ip) || [];
  const minute = all.filter(t => now - t < 60000);
  const hour = all.filter(t => now - t < 3600000);

  if (minute.length >= 30) {
    return {
      ok: false,
      reason: 'minute',
      remaining: { minute: 0, hour: Math.max(0, 100 - hour.length) }
    };
  }
  if (hour.length >= 100) {
    return {
      ok: false,
      reason: 'hour',
      remaining: { minute: Math.max(0, 30 - minute.length), hour: 0 }
    };
  }

  // Keep only last-hour timestamps + add new one
  ipMap.set(ip, [...hour, now]);

  return {
    ok: true,
    remaining: {
      minute: 29 - minute.length,
      hour: 99 - hour.length
    }
  };
}

function pickKey(keys) {
  const now = Date.now();
  for (let i = 0; i < keys.length; i++) {
    const idx = (keyIndex + i) % keys.length;
    const key = keys[idx];
    if (now >= (keyCooldowns.get(key) || 0)) {
      keyIndex = (idx + 1) % keys.length;
      return { key, idx };
    }
  }
  return null; // all keys on cooldown
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const ip = getIP(req);
  const rl = checkRateLimit(ip);

  if (!rl.ok) {
    const msg = rl.reason === 'minute'
      ? 'Quá nhanh, đợi 1 phút'
      : 'Đã đạt giới hạn giờ, thử lại sau';
    res.setHeader('X-RateLimit-Remaining-Minute', String(rl.remaining.minute));
    res.setHeader('X-RateLimit-Remaining-Hour', String(rl.remaining.hour));
    return res.status(429).json({ error: { message: msg } });
  }

  const keys = getKeys();
  if (!keys.length) {
    return res.status(503).json({ error: { message: 'Server chưa cấu hình, thử lại sau' } });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const now = Date.now();
  let lastErr = 'Lỗi không xác định';

  for (let attempt = 0; attempt < Math.min(3, keys.length); attempt++) {
    const picked = pickKey(keys);
    if (!picked) break;

    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${picked.key}`
        },
        body: JSON.stringify(body)
      });

      if (groqRes.status === 429 || groqRes.status === 401) {
        keyCooldowns.set(picked.key, now + 60000);
        const errData = await groqRes.json().catch(() => ({}));
        lastErr = errData.error?.message || `HTTP ${groqRes.status}`;
        continue;
      }

      const data = await groqRes.json();
      const activeKeys = keys.filter(k => (keyCooldowns.get(k) || 0) < now);
      const poolStatus = activeKeys.length === keys.length ? 'healthy' : 'degraded';

      res.setHeader('X-Pool-Status', poolStatus);
      res.setHeader('X-RateLimit-Remaining-Minute', String(rl.remaining.minute));
      res.setHeader('X-RateLimit-Remaining-Hour', String(rl.remaining.hour));

      return res.status(groqRes.status).json(data);
    } catch (fetchErr) {
      keyCooldowns.set(picked.key, now + 60000);
      lastErr = fetchErr.message || 'Lỗi kết nối';
    }
  }

  res.setHeader('X-Pool-Status', 'degraded');
  return res.status(503).json({ error: { message: 'Server tạm hết quota, thử lại sau 1 phút' } });
};
