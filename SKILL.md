# SKILL: English Learning Web/App for Kids (Zero → Hero)
> Version 1.0 | Magic Moment Project
> Stack: Vanilla HTML/CSS/JS · Groq API (Free) · Single-file deployable

---

## 1. ARCHITECTURE PRINCIPLES

### Single-File App Pattern
Toàn bộ app là một file `.html` duy nhất — không cần build tool, deploy bằng cách upload thẳng lên Vercel.

```
index.html
├── <style>        ← Toàn bộ CSS + CSS variables
├── HTML screens   ← Mỗi screen là <div class="screen hidden">
└── <script>       ← Toàn bộ JS logic
```

### Screen Router Pattern
```js
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
// Dùng: go('s-home'), go('s-result'), go('s-game')
```

### State Management (localStorage)
```js
let apiKey   = localStorage.getItem('mm_key')       || '';
let scoreDay = +localStorage.getItem('mm_scoreday') || 0;
let wordCnt  = +localStorage.getItem('mm_wcnt')     || 0;
let wordHist = JSON.parse(localStorage.getItem('mm_hist') || '[]');

// Save
localStorage.setItem('mm_key', apiKey);
localStorage.setItem('mm_scoreday', scoreDay);
```

---

## 2. GROQ API INTEGRATION

### Keys & Models
- Key bắt đầu bằng `gsk_` | Free: ~14,400 req/ngày
- **Vision** (nhận dạng ảnh): `meta-llama/llama-4-scout-17b-16e-instruct`
- **Text** (dịch/nội dung): `llama-3.3-70b-versatile`

### Vision Call
```js
async function groqVision(b64url, prompt) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 28000);
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST', signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 800,
        messages: [{ role: 'user', content: [
          { type: 'image_url', image_url: { url: b64url } },
          { type: 'text', text: prompt }
        ]}]
      })
    });
    clearTimeout(timer);
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.error?.message || `HTTP ${res.status}`); }
    const d = await res.json();
    return d.choices?.[0]?.message?.content || '';
  } catch(e) { clearTimeout(timer); if (e.name==='AbortError') throw new Error('Timeout!'); throw e; }
}
```

### Chat Call (text only)
```js
async function groqChat(prompt, maxTokens = 400) {
  // Giống groqVision nhưng content là string
  // model: 'llama-3.3-70b-versatile'
}
```

### JSON Parser (3 layers — bắt buộc dùng)
```js
function parseJSON(text) {
  let clean = text.replace(/```json/gi,'').replace(/```/g,'').trim();
  const s = clean.indexOf('{'), e = clean.lastIndexOf('}');
  if (s===-1||e===-1) throw new Error('Không có JSON');
  clean = clean.slice(s,e+1)
    .replace(/,\s*}/g,'}').replace(/,\s*]/g,']')
    .replace(/[\u0000-\u001F]/g,' ').trim();
  try { return JSON.parse(clean); } catch(e1) {}
  try { return (new Function('return ('+clean+'))'))(); } catch(e2) {}
  throw new Error('Parse lỗi: '+clean.slice(0,100));
}
```

### Prompt Templates

**Single object detection:**
```
"English teacher for Vietnamese kids 3-6 years old. Identify the MAIN object.
Reply ONLY valid JSON, no markdown:
{\"english\":\"apple\",\"phonetic\":\"/ˈæpəl/\",\"vietnamese\":\"Quả táo\",\"emoji\":\"🍎\",\"sentence\":\"This is an apple!\"}"
```

**Scene analysis (6-8 objects with position):**
```
"List 6 objects visible in this image for a Vietnamese child aged 3-6.
Return ONLY this JSON (no other text):
{\"scene_vi\":\"Phòng bếp\",\"objects\":[{\"english\":\"sink\",\"phonetic\":\"/sɪŋk/\",\"vietnamese\":\"Bồn rửa\",\"emoji\":\"🚿\",\"x\":20,\"y\":60,\"color_hint\":\"màu trắng\"}]}
x,y = integer percentages of object center (x=0 left, x=100 right, y=0 top, y=100 bottom)."
```

**Story translation (3 vocab words + emoji scene):**
```
"Translate Vietnamese story to English. Return ONLY valid JSON:
{\"english\":\"[full translation, do not summarize]\",
\"key_words\":[{\"en\":\"rabbit\",\"vi\":\"con thỏ\",\"phonetic\":\"/ˈræbɪt/\"},{\"en\":\"w2\",\"vi\":\"v2\",\"phonetic\":\"/p2/\"},{\"en\":\"w3\",\"vi\":\"v3\",\"phonetic\":\"/p3/\"}],
\"scene_emojis\":[\"🐰\",\"🌲\",\"🌸\",\"☀️\"],\"bg_from\":\"#2D5A27\",\"bg_to\":\"#4A8C3F\"}"
```

---

## 3. CAMERA & IMAGE

### File Input (Universal - mọi thiết bị)
```html
<input type="file" id="inp-cam" accept="image/*" capture="environment">
<input type="file" id="inp-gal" accept="image/*">
<canvas id="canvas" style="display:none;"></canvas>
```
```js
document.getElementById('inp-gal').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  e.target.value = '';
  const r = new FileReader();
  r.onload = ev => processImage(ev.target.result);
  r.readAsDataURL(f);
});
```

### Webcam (Desktop)
```js
async function openWebcam() {
  try { camStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}); }
  catch(e) { camStream = await navigator.mediaDevices.getUserMedia({video:true}); }
  document.getElementById('video').srcObject = camStream;
}
function captureWebcam() {
  const video = document.getElementById('video');
  const c = document.getElementById('canvas');
  c.width = video.videoWidth; c.height = video.videoHeight;
  c.getContext('2d').drawImage(video, 0, 0);
  const dataUrl = c.toDataURL('image/jpeg', 0.85);
  camStream.getTracks().forEach(t => t.stop());
  processImage(dataUrl);
}
```

### Image Compression (BẮT BUỘC trước khi gửi API)
```js
function compress(url, maxW, quality) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => {
      const c = document.getElementById('canvas');
      let w = img.width, h = img.height;
      if (w > maxW) { h = h * maxW / w; w = maxW; }
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      res(c.toDataURL('image/jpeg', quality));
    };
    img.src = url;
  });
}
// Single object: compress(url, 768, 0.72)
// Scene:         compress(url, 400, 0.65)  ← nhỏ hơn = nhanh hơn
```

---

## 4. SPEECH FEATURES

### Text-to-Speech (EN)
```js
function speakWord(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = 0.75; u.pitch = 1.1;
  const vs = window.speechSynthesis.getVoices();
  const v = vs.find(v => v.lang.startsWith('en') &&
    (v.name.includes('Samantha')||v.name.includes('Google')||v.name.includes('Karen')));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}
// QUAN TRỌNG: Init voices sớm
window.speechSynthesis.getVoices();
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
```

### Speech Recognition (Vietnamese)
```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new SR();
recog.lang = 'vi-VN';
recog.interimResults = true;
```

### Pronunciation Check (Levenshtein)
```js
function checkPronunciation(said, target) {
  return said.toLowerCase().split(/\s+/).some(w =>
    lev(w, target.toLowerCase()) <= Math.floor(target.length * 0.4)
  );
}
function lev(a, b) {
  const m=a.length,n=b.length,dp=Array.from({length:m+1},(_,i)=>
    Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
```

---

## 5. UI PATTERNS

### CSS Design System
```css
:root {
  --gold:#FFD94A; --coral:#FF6B6B; --mint:#4ECDC4; --purple:#A855F7;
  --amber:#FFB347; --rose:#EF476F; --sky:#3BA7F5; --green:#22C55E;
  --navy:#0F0A2E; --paper:#FFF8EC; --brown:#2D1B0E;
  --card:rgba(255,255,255,.07); --border:rgba(255,255,255,.12);
}
```

### Required Fonts
```
Baloo 2  → Tiêu đề, số điểm, key words (tròn, vui)
Caveat   → Chữ viết tay, storytelling, VI text
Nunito   → Body text, buttons (dễ đọc cho bé)
```

### Vocab Badge (3 màu)
```js
function buildVocabRow(key_words) {
  return '<div class="vocab-row">' + key_words.slice(0,3).map(w =>
    `<div class="vocab-badge">
      <span class="vb-en">${w.en.toUpperCase()}</span>
      <span class="vb-sep">=</span>
      <span class="vb-vi">${w.vi}</span>
    </div>`
  ).join('') + '</div>';
}
// CSS: badge 1=amber, 2=rose, 3=mint
```

### Emoji Scene (NO external image needed!)
```js
function buildEmojiScene(page) {
  const positions = [
    {left:'12%',top:'25%',sz:'3.5rem',dur:'3.5s',del:'0s',rot0:'-5deg',rot1:'5deg',dy:'-14px'},
    {left:'72%',top:'18%',sz:'3rem',  dur:'4s',  del:'0.6s'},
    {left:'40%',top:'45%',sz:'4rem',  dur:'3s',  del:'0.3s'},
    {left:'15%',top:'62%',sz:'2.2rem',dur:'5s',  del:'0.9s'},
    {left:'65%',top:'58%',sz:'2.5rem',dur:'4.5s',del:'0.5s'},
    {left:'88%',top:'40%',sz:'2rem',  dur:'3.8s',del:'1.1s'},
  ];
  const html = (page.scene_emojis||['✨']).slice(0,6).map((em,i) => {
    const p = positions[i]||positions[0];
    return `<div class="emoji-float" style="left:${p.left};top:${p.top};--sz:${p.sz};--dur:${p.dur};--del:${p.del};">${em}</div>`;
  }).join('');
  return `<div class="emoji-scene">
    <div class="emoji-scene-bg" style="background:linear-gradient(135deg,${page.bg_from||'#1a3a5c'},${page.bg_to||'#2d6a8f'});"></div>
    <div class="emoji-scene-dots"></div>${html}</div>`;
}
```

### Confetti (bắt buộc khi đúng!)
```js
function confetti() {
  const cols=['#FFD94A','#FF6B6B','#4ECDC4','#A855F7','#fff'];
  for(let i=0;i<40;i++) setTimeout(()=>{
    const c=document.createElement('div'); c.className='confetti-p';
    c.style.cssText=`left:${Math.random()*100}vw;top:-20px;
      background:${cols[~~(Math.random()*cols.length)]};
      width:${Math.random()*10+6}px;height:${Math.random()*10+6}px;
      border-radius:${Math.random()>.5?'50%':'3px'};
      --dx:${(Math.random()-.5)*200}px;`;
    document.body.appendChild(c); setTimeout(()=>c.remove(),1800);
  }, i*35);
}
// CSS animation: @keyframes cf { from{...} to{transform:translate(var(--dx),110vh) rotate(720deg);} }
```

---

## 6. GAME MECHANICS

### Find-It Game
```js
// Tap tolerance: 20% radius
const dist = Math.hypot(tapX - obj.x, tapY - obj.y);
const hit = dist <= 20;

// Scoring
const pts = wrongCount===0 ? 15 : wrongCount===1 ? 10 : 5;
// Sau 2 sai: hint ring | Sau 3 sai: auto-reveal
```

### Quiz Game
```js
// 1 đúng + 3 sai ngẫu nhiên
const wrong = shuffle(allObjects.filter(o=>o.english!==currentObj.english)).slice(0,3);
const choices = shuffle([currentObj, ...wrong]);
```

### Scoring Rules
```
Find-It:   Lần 1 đúng=+15⭐  Lần 2=+10⭐  Lần 3=+5⭐
Quiz:      Đúng=+10⭐
Scan+Mic:  Đúng=+10⭐  Sai=+5⭐  (khuyến khích, không phạt)
StoryDuo:  Mỗi trang mới=auto confetti
```

---

## 7. DEPLOYMENT

```bash
# Bắt buộc: KHÔNG mở file:// trực tiếp!
# Local test:
python -m http.server 8080
# http://localhost:8080/index.html

# Production (Vercel):
# 1. Upload index.html + vercel.json lên GitHub
# 2. Connect Vercel → Deploy (30 giây)
```

```json
// vercel.json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

---

## 8. DEBUG CHECKLIST

| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| `Failed to fetch` | Mở từ `file://` | Dùng localhost hoặc Vercel |
| `credit balance too low` | Anthropic hết credit | Dùng Groq key (gsk_) |
| `Illegal return statement` | JS syntax error | Validate bằng `node -e` |
| `Unexpected number in JSON` | AI trả JSON lỗi | Dùng parseJSON() 3 lớp |
| Camera mở file dialog | `capture=` không support desktop | Thêm webcam screen riêng |
| Ảnh AI không load | Server timeout | Dùng Emoji Scene thay thế |
| Mic không nhận | Browser không phải Chrome | Fallback textarea |
