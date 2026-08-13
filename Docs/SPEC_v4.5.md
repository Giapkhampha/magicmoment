# SPEC v4.5 — Backend Proxy

**Mục tiêu:** Bỏ friction "user phải tự lấy Groq key". User mới vào dùng ngay.
**Ship deadline:** Tuần này (T6/T7 tuần 04/05/2026)

---

## Architecture
[index.html] ──→ /api/groq (Vercel Serverless) ──→ Groq API
│
└─ key pool round-robin + fail-over
└─ rate limit per IP (30/phút + 100/giờ)

## Files mới / thay đổi

| File | Thay đổi |
|---|---|
| `/api/groq.js` | TẠO MỚI — proxy endpoint |
| `index.html` | Sửa `groqVision()` + `groqChat()` để gọi `/api/groq` mặc định, fallback localStorage key nếu Power User Mode ON |
| `index.html` | Thêm Settings screen (`s-settings`) với toggle Power User Mode |
| `index.html` | Status badge "💛 Server Ba Maya" hoặc "🔑 Key cá nhân" trên home |
| `vercel.json` | Đảm bảo route `/api/*` không bị block (folder /api/ đã tồn tại với function khác) |

## /api/groq.js — Behavior

**Input (POST body):**
```json
{
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "max_tokens": 800,
  "messages": [...]
}
```

**Logic:**
1. Đọc `process.env.GROQ_KEYS` — split bằng dấu phẩy → array `keys[]`
2. Rate limit per IP (in-memory Map):
   - Đếm request trong 60s gần nhất → nếu >= 30 → trả 429 "Quá nhanh, đợi 1 phút"
   - Đếm request trong 3600s gần nhất → nếu >= 100 → trả 429 "Đã đạt giới hạn giờ"
3. Round-robin chọn key (state in-memory module-level)
4. Forward request đến Groq API với key đã chọn
5. Nếu Groq trả 429/401 → mark key cooldown 60s, thử key tiếp theo (max 3 lần thử)
6. Nếu tất cả key fail → trả 503 "Server tạm hết quota, thử lại sau 1 phút"
7. Response: stream nguyên si từ Groq về client

**Header response:**
- `X-Pool-Status: healthy|degraded` (để UI hiện badge phù hợp)
- `X-RateLimit-Remaining-Minute: N`
- `X-RateLimit-Remaining-Hour: N`

**Lưu ý serverless:**
- Rate limit in-memory không persist giữa cold-start → CHẤP NHẬN ĐƯỢC ở scale này. Không cần Redis.
- Round-robin state cũng in-memory → đôi khi key A bị gọi 2 lần liên tiếp khi cold-start, không sao.
- Get IP từ header: `req.headers['x-forwarded-for']?.split(',')[0]` (Vercel chuẩn)

## index.html — Changes

### Biến global mới
```js
let powerUserMode = localStorage.getItem('mm_power_user') === '1';
// Mặc định: false (dùng server)
// User cũ có mm_key trong localStorage: KHÔNG auto bật Power User
// Họ phải vào Settings và tự toggle ON nếu muốn dùng key cá nhân
```

### Migration on app load (chạy 1 lần)
```js
function migrateToV45() {
  if (localStorage.getItem('mm_migrated_v45')) return;
  // v4.5: KHÔNG auto bật Power User Mode kể cả với user cũ có mm_key
  // Lý do: Default tốt nhất là server Ba Maya cho 95%+ user
  // Key cũ vẫn được giữ trong localStorage để user thấy lại khi vào Settings
  localStorage.setItem('mm_migrated_v45', '1');
}
```

### Sửa groqVision() và groqChat()
- Nếu `powerUserMode === true` VÀ có `apiKey` → gọi Groq API trực tiếp (giữ logic cũ)
- Ngược lại → POST `/api/groq` (KHÔNG gửi Authorization header, server tự handle)

### Settings screen mới (s-settings)
⚙️ Cài đặt
─────────────
🤖 Chế độ AI
◉ 💛 Dùng server Ba Maya (mặc định, miễn phí)
○ 🔑 Dùng API key cá nhân (nâng cao)
[_________________________]
Lấy key tại: console.groq.com
─────────────
[← Về trang chủ]

Khi user toggle Power User Mode ON → ô input key hiện ra. Nếu localStorage có `mm_key` cũ → auto-fill vào input.

### Home screen — thêm icon ⚙️ góc trên trái (đối xứng với ❓ phía phải)

### Status badge home (subtle)
- Hiện dưới score: `💛 Server Ba Maya` hoặc `🔑 Key cá nhân`
- Tap → đi đến Settings (`go('s-settings')`)
- Style: pill nhỏ, opacity 0.7, font-size 0.75rem

## localStorage keys mới

| Key | Giá trị |
|---|---|
| `mm_power_user` | `'1'` (Power User ON) hoặc null/`'0'` (OFF) |
| `mm_migrated_v45` | `'1'` flag migration đã chạy |

## Vercel env vars (Ba setup TRƯỚC khi deploy)
GROQ_KEYS=gsk_xxx1,gsk_xxx2,gsk_xxx3,gsk_xxx4
Apply cho cả 3 environments: Production + Preview + Development

## Acceptance test

1. ✅ User mới (incognito) vào app → KHÔNG thấy ô nhập key → Magic Scan hoạt động qua server
2. ✅ Ba mở app v4.5 lần đầu → status badge "💛 Server Ba Maya" (không phải Key cá nhân)
3. ✅ Settings → toggle ON Power User → ô input tự động fill key cũ → Magic Scan dùng key cá nhân
4. ✅ Settings → toggle OFF Power User → Magic Scan dùng lại server
5. ✅ Spam 31 request trong 1 phút → request thứ 31 báo "Quá nhanh, đợi 1 phút"
6. ✅ Tắt 1 key trong env (giả lập fail) → vẫn hoạt động qua key còn lại