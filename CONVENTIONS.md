# CONVENTIONS.md — Code Style & Patterns

> **Mục đích:** Đảm bảo mọi feature mới (do Ba Maya, Claude, hoặc Claude Code làm) follow cùng patterns.
> Đọc file này TRƯỚC khi viết code mới.

---

## 🏗️ Architecture rules

### Single-file pattern
- Toàn bộ app trong **1 file `index.html`**
- Cấu trúc:
  ```html
  <!DOCTYPE html>
  <head>
    <meta tags + manifest link>
    <style>
      /* CSS variables + tất cả CSS */
    </style>
  </head>
  <body>
    <!-- HTML screens, mỗi screen là 1 div.screen -->
    <div id="s-home" class="screen"></div>
    <div id="s-cam" class="screen hidden"></div>
    ...
    
    <script>
      /* Tất cả JS logic */
    </script>
  </body>
  ```

### Screen Router Pattern
```js
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
// Dùng: go('s-home'), go('s-result'), go('s-themes')
```

**Convention naming:**
- Screen IDs: `s-{feature}` (vd: `s-home`, `s-cam`, `s-themes`, `s-help`)
- Functions: `camelCase` (vd: `openThemes`, `markKnown`, `showHistory`)
- Constants: `UPPER_SNAKE_CASE` (vd: `THEME_PACKS`, `HELP_SECTIONS`)

### State management
- **Source of truth:** `localStorage` cho persistent state
- **Runtime state:** biến global ở top của `<script>`
- **Pattern:**
  ```js
  let apiKey   = localStorage.getItem('mm_key')       || '';
  let scoreDay = +localStorage.getItem('mm_scoreday') || 0;
  let wordHist = JSON.parse(localStorage.getItem('mm_hist') || '[]');
  
  // Save explicitly:
  localStorage.setItem('mm_key', apiKey);
  
  // Hoặc dùng helper safeSetHist() cho mm_hist (có error handling quota)
  ```

**Naming convention localStorage keys:**
- Prefix `mm_` (Magic Moment)
- Có version suffix nếu cần migration: `mm_help_seen_v1`

---

## 🎨 Design tokens (BẮT BUỘC dùng CSS variables)

### Color palette
```css
:root {
  /* Primary palette */
  --gold: #FFD94A;        /* Brand chính, score */
  --coral: #FF6B6B;       /* Magic Scan */
  --mint: #4ECDC4;        /* Scene Explorer */
  --purple: #A855F7;      /* Theme Packs */
  --amber: #FFB347;       /* StoryDuo */
  --rose: #EF476F;        /* Story warm */
  
  /* Semantic */
  --green: #22C55E;       /* Success, correct */
  --sky: #3BA7F5;         /* Info, dashboard */
  
  /* Background */
  --navy: #0F0A2E;        /* App dark bg */
  --paper: #FFF8EC;       /* Story paper */
  --brown: #2D1B0E;       /* Story text */
  
  /* UI surface */
  --card: rgba(255,255,255,.07);
  --border: rgba(255,255,255,.12);
}
```

❌ **Đừng hardcode color hex** trong CSS classes. Dùng `var(--gold)` thay vì `#FFD94A`.

### Typography
```css
/* Tiêu đề chính, key words EN, score */
font-family: 'Baloo 2', cursive;
font-weight: 800;

/* Tiếng Việt story, viết tay */
font-family: 'Caveat', cursive;
font-weight: 700;

/* Body text, buttons */
font-family: 'Nunito', sans-serif;
font-weight: 700;

/* Phonetic IPA */
font-family: 'Nunito', sans-serif;
font-style: italic;
opacity: 0.4;
```

### Sizing rules cho trẻ em
| Element | Min size |
|---------|----------|
| Touch button | 44px height |
| Emoji illustration | 3rem |
| Từ tiếng Anh chính | 2rem |
| Body text | 0.85rem (min) |
| Khoảng cách button | gap 8px (min) |

### Animation guidelines
- **Bounce In:** Logo, icon ăn mừng
- **Pulse:** CTA button (thu hút)
- **Float:** Emoji scene (nhẹ nhàng)
- **Confetti:** CHỈ khi đúng/hoàn thành (KHÔNG dùng cho action thường)
- **Scale Up:** Pop-in cho result card
- ❌ **KHÔNG** dùng shake/vibrate (gây lo lắng cho bé)

---

## ⚙️ Code patterns đã chốt

### 1. Groq API Vision call
```js
async function groqVision(b64url, prompt) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 28000);
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST', signal: ctrl.signal,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${apiKey}` 
      },
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
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.error?.message || `HTTP ${res.status}`);
    }
    const d = await res.json();
    return d.choices?.[0]?.message?.content || '';
  } catch(e) {
    clearTimeout(timer);
    if (e.name === 'AbortError') throw new Error('Timeout!');
    throw e;
  }
}
```

### 2. JSON Parser (3 layers — bắt buộc)
```js
function parseJSON(text) {
  let clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const s = clean.indexOf('{'), e = clean.lastIndexOf('}');
  if (s === -1 || e === -1) throw new Error('Không có JSON');
  clean = clean.slice(s, e+1)
    .replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')
    .replace(/[\u0000-\u001F]/g, ' ').trim();
  try { return JSON.parse(clean); } catch(e1) {}
  try { return (new Function('return (' + clean + ')'))(); } catch(e2) {}
  throw new Error('Parse lỗi: ' + clean.slice(0, 100));
}
```

### 3. Image compression (BẮT BUỘC trước khi gửi API)
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
// Scene:         compress(url, 400, 0.65)
// History thumb: compressForHistory(url) — 96x96, quality 0.5
```

### 4. Safe localStorage setter (tránh quota exceeded)
```js
function safeSetHist(histArray) {
  const MAX_ITEMS = 50;
  while (histArray.length > MAX_ITEMS) histArray.pop();
  
  try {
    localStorage.setItem('mm_hist', JSON.stringify(histArray));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
      // Strategy 1: clear old images
      for (let i = histArray.length - 1; i >= 0 && i > 10; i--) {
        if (histArray[i].image) histArray[i].image = '';
      }
      try {
        localStorage.setItem('mm_hist', JSON.stringify(histArray));
        return true;
      } catch (e2) {
        // Strategy 2: trim to 25
        histArray.length = Math.min(histArray.length, 25);
        try {
          localStorage.setItem('mm_hist', JSON.stringify(histArray));
          return true;
        } catch (e3) {
          // Strategy 3: clear all images
          histArray.forEach(item => { item.image = ''; });
          localStorage.setItem('mm_hist', JSON.stringify(histArray));
          return true;
        }
      }
    }
    return false;
  }
}
```

### 5. Text-to-Speech (EN)
```js
function speakWord(text) {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = 0.75; u.pitch = 1.1;
  const vs = window.speechSynthesis.getVoices();
  const v = vs.find(v => v.lang.startsWith('en') &&
    (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Karen')));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}
// QUAN TRỌNG: Init voices sớm trong window.onload
window.speechSynthesis.getVoices();
window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
```

### 6. Confetti (CHỈ khi đúng/hoàn thành)
```js
function confetti() {
  const cols = ['#FFD94A','#FF6B6B','#4ECDC4','#A855F7','#fff'];
  for (let i = 0; i < 40; i++) setTimeout(() => {
    const c = document.createElement('div');
    c.className = 'confetti-p';
    c.style.cssText = `left:${Math.random()*100}vw;top:-20px;
      background:${cols[~~(Math.random()*cols.length)]};
      width:${Math.random()*10+6}px;height:${Math.random()*10+6}px;
      border-radius:${Math.random()>.5?'50%':'3px'};
      --dx:${(Math.random()-.5)*200}px;`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1800);
  }, i * 35);
}
```

---

## 📜 Prompt patterns cho Groq API

### Single object detection (Magic Scan)
```
"English teacher for Vietnamese kids 3-6 years old. Identify the MAIN object.
Reply ONLY valid JSON, no markdown:
{\"english\":\"apple\",\"phonetic\":\"/ˈæpəl/\",\"vietnamese\":\"Quả táo\",\"emoji\":\"🍎\",\"sentence\":\"This is an apple!\"}"
```

### Scene analysis (6-8 objects)
```
"List 6 objects visible in this image for a Vietnamese child aged 3-6.
Return ONLY this JSON (no other text):
{\"scene_vi\":\"Phòng bếp\",\"objects\":[{\"english\":\"sink\",\"phonetic\":\"/sɪŋk/\",\"vietnamese\":\"Bồn rửa\",\"emoji\":\"🚿\",\"x\":20,\"y\":60,\"color_hint\":\"màu trắng\"}]}
x,y = integer percentages of object center."
```

### Story translation (StoryDuo)
```
"Translate Vietnamese story to English. Return ONLY valid JSON:
{\"english\":\"[full faithful translation]\",
\"key_words\":[{\"en\":\"rabbit\",\"vi\":\"con thỏ\",\"phonetic\":\"/ˈræbɪt/\"},...3 từ],
\"scene_emojis\":[\"🐰\",\"🌲\",\"🌸\",\"☀️\"],
\"bg_from\":\"#2D5A27\",\"bg_to\":\"#4A8C3F\"}"
```

---

## 🎮 Game mechanics conventions

### Scoring rules (BẮT BUỘC follow)
```
Find-It:   Lần 1=+15⭐  Lần 2=+10⭐  Lần 3=+5⭐
Quiz:      Đúng=+10⭐
Scan+Mic:  Đúng=+10⭐  Sai=+5⭐  (KHÔNG phạt)
Theme Packs: "Đã thuộc"=+5⭐  Hoàn thành pack=+50⭐ bonus
StoryDuo:   Mỗi trang mới=auto confetti
```

**Nguyên tắc vàng:** **MỌI ACTION CÓ ĐIỂM DƯƠNG**. Không có "0 điểm" hay "trừ điểm".

### Find-It tap tolerance
```js
const dist = Math.hypot(tapX - obj.x, tapY - obj.y);
const hit = dist <= 20; // 20% radius
```

### Quiz answer generation
```js
const wrong = shuffle(allObjects.filter(o => o.english !== currentObj.english)).slice(0, 3);
const choices = shuffle([currentObj, ...wrong]);
```

---

## 🚀 Workflow conventions

### Trước khi sửa code
1. Đọc `STATUS.md` để biết version + state hiện tại
2. Đọc section liên quan trong `CONVENTIONS.md` (file này)
3. Search rộng để bắt hardcoded strings trước khi sửa:
   ```bash
   grep -n "magicmoment" index.html
   grep -n "vercel.app" index.html
   grep -n "TODO\|FIXME" index.html
   ```

### Sau khi sửa code
1. Validate JS:
   ```bash
   node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"
   ```
2. Test trên localhost: `python -m http.server 8080`
3. Verify acceptance test (theo design doc nếu có)
4. Update `STATUS.md` section "Đã hoàn thành"

### Git workflow
- **Branch:** master (local) → main (remote)
- **Commit message format:**
  - `feat:` cho feature mới
  - `fix:` cho bug fix
  - `chore:` cho cleanup, refactor không thay đổi behavior
  - `docs:` cho update docs
  - `style:` cho thay đổi UI/CSS không đổi logic
- **Push:**
  ```bash
  git push origin master:main --force-with-lease
  ```
  ⚠️ **KHÔNG** push thẳng `git push origin main` — Vercel sẽ không deploy production

### Deploy flow
1. Push commit → Vercel auto-detect (~30s)
2. Vercel build (~1-2 min)
3. Hard refresh production URL: `Ctrl+Shift+R`
4. Verify acceptance test trên production
5. Test trên mobile thật (Android/iOS) — không chỉ desktop

---

## 🚨 Anti-patterns (KHÔNG làm)

### Code
- ❌ Hardcode color hex thay vì dùng CSS var
- ❌ External CDN cho assets (làm break offline)
- ❌ `localStorage.setItem` không có try-catch (sẽ crash trên mobile khi đầy)
- ❌ Lưu base64 image vào localStorage (compress về thumbnail trước)
- ❌ Confetti khi action thường (chỉ khi đúng/hoàn thành)
- ❌ Skip validate JS sau str_replace (dễ break)

### UX
- ❌ Tự bắt user lấy API key ở màn đầu (high friction — sẽ fix ở v4.5)
- ❌ Error messages tiếng Anh ("Failed to fetch") — phải tiếng Việt
- ❌ Modal/popup không có nút đóng
- ❌ Auto-play TTS không có user gesture (iOS Safari sẽ block)
- ❌ Đặt nội dung quan trọng ở cuối page mà không có visual cue
- ❌ Dùng "user", "khách hàng" thay vì "ba", "bé", "mình"

### Content
- ❌ Nội dung đáng sợ (ma, quái vật, bạo lực)
- ❌ Câu quá dài (>10 từ cho bé 3 tuổi)
- ❌ Grammar rules cho bé dưới 6 tuổi
- ❌ Bắt bé viết — chỉ nghe và nói
- ❌ So sánh điểm bé này với bé khác (toxic)

---

## 🧪 Testing checklist trước khi ship

```
[ ] JS syntax: node -e validate pass
[ ] Localhost test: localhost:8080 load OK
[ ] Magic Scan: chụp 1 ảnh → AI nhận dạng OK
[ ] Theme Packs: vào 1 pack → "Đã thuộc" 1 từ → score tăng
[ ] StoryDuo: kể 1 câu → AI dịch + emoji OK
[ ] Help Guide: mở → 9 sections accordion OK
[ ] Mobile responsive: 375px width không bị tràn
[ ] PWA: icon hiển thị, install button có (sau clear cache)
[ ] Hard refresh production: Ctrl+Shift+R
[ ] View source: tìm "magicmoment-five.vercel.app" → 0 kết quả
[ ] STATUS.md: đã update version + sprint mới
```

---

*File version 1.0 — 04/05/2026*
*Update khi có pattern mới được chốt hoặc anti-pattern mới được phát hiện*
