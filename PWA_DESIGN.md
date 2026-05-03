# PWA INSTALLABLE — Design & Build Spec
> Phase 4 · Feature đầu tiên · Magic Moment v4.4
> Mục tiêu: Cài Magic Moment như app thật trên điện thoại — icon home screen, không cần mở browser

---

## 1. TẠI SAO PWA LÀ ƯU TIÊN #1 PHASE 4?

### Vấn đề hiện tại
- App chạy qua browser → mỗi lần mở phải vào Chrome → tap bookmark → load
- 3 apps trong ecosystem (Magic Moment, Maya Journey, Giáp Khám Phá) → user không nhớ URL nào của app nào
- Icon Vercel default → không có brand identity rõ
- Khi share cho gia đình khác → họ thấy "1 trang web" thay vì "1 app"

### PWA giải quyết
- Icon Magic Moment trên home screen điện thoại (như Duolingo, Khan Academy)
- Tap icon → mở full-screen, không thấy thanh URL → cảm giác "app thật"
- Loading screen riêng (splash screen)
- Có thể chạy offline cho 1 số tính năng (Theme Packs, Help Guide)
- Trong tương lai: push notification nhắc bé học mỗi ngày

### Nâng cấp ecosystem
- Magic Moment có icon riêng → khác Maya Journey → khác Giáp Khám Phá
- 3 icons cùng nhau → "ecosystem visible" trên màn hình điện thoại
- User chuyển qua lại 3 apps dễ dàng → tương tự switching app native

---

## 2. SCOPE — LÀM GÌ TRONG SPRINT NÀY

### ✅ MUST HAVE (~3h)
1. **manifest.json** — App metadata (name, icons, colors, display mode)
2. **App icons** — 192x192 + 512x512 PNG (Magic Moment branding)
3. **Service Worker** — Cache strategy cho offline
4. **Install prompt** — Hiển thị nút "Cài đặt app" trên home khi điều kiện đủ
5. **Test cài đặt** trên Android Chrome + iOS Safari

### ⏳ NICE TO HAVE (post-MVP)
- Push notification (cần backend, để sau)
- Background sync (cần phức tạp)
- Offline Theme Packs (chỉ cache từ vựng hardcoded)

### ❌ KHÔNG LÀM
- Native app (đã có roadmap riêng cho RN)
- Cloud sync (cần backend, tách feature)

---

## 3. DATA STRUCTURE & FILES

### 3.1 Files cần tạo mới

```
magicmoment/
├── index.html         (đã có)
├── vercel.json        (đã có)
├── manifest.json      (MỚI)
├── sw.js              (MỚI - Service Worker)
├── icons/             (MỚI - folder)
│   ├── icon-192.png   (MỚI)
│   ├── icon-512.png   (MỚI)
│   └── icon-maskable.png (MỚI - cho Android adaptive)
└── ...
```

### 3.2 manifest.json

```json
{
  "name": "Magic Moment - Học tiếng Anh cùng bé",
  "short_name": "Magic Moment",
  "description": "Web app học tiếng Anh cho trẻ 3-6 tuổi, ba/mẹ đồng hành cùng bé qua AI",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0F0A2E",
  "theme_color": "#FFD94A",
  "lang": "vi",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["education", "kids"],
  "screenshots": []
}
```

### 3.3 sw.js (Service Worker)

```javascript
// sw.js - Magic Moment Service Worker v1
const CACHE_NAME = 'magic-moment-v4.4';
const RUNTIME_CACHE = 'magic-moment-runtime';

// Files to cache khi install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install: cache shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy: 
// - HTML/JS/CSS: network first, fallback cache
// - Icons/static: cache first
// - API calls: network only (không cache)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // KHÔNG cache API calls (Groq)
  if (url.hostname.includes('groq.com') || url.hostname.includes('api.')) {
    return; // Để browser handle natively
  }
  
  // Cache first cho icons
  if (url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(event.request).then(cached => 
        cached || fetch(event.request).then(response => {
          return caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }
  
  // Network first cho html/js/css (để update khi có version mới)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
```

### 3.4 Update vercel.json

```json
{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "manifest.json", "use": "@vercel/static" },
    { "src": "sw.js", "use": "@vercel/static" },
    { "src": "icons/**", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/manifest.json", "dest": "/manifest.json" },
    { "src": "/sw.js", "dest": "/sw.js" },
    { "src": "/icons/(.*)", "dest": "/icons/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" },
        { "key": "Service-Worker-Allowed", "value": "/" }
      ]
    }
  ]
}
```

---

## 4. CHANGES TRONG INDEX.HTML

### 4.1 Thêm vào `<head>`

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- iOS specific -->
<link rel="apple-touch-icon" href="/icons/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Magic Moment">

<!-- Theme color (đã có nhưng confirm) -->
<meta name="theme-color" content="#FFD94A">
```

### 4.2 Thêm Service Worker registration

Đặt cuối `<script>`, trong block init:

```javascript
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}
```

### 4.3 Install prompt UI

#### State management
```javascript
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  
  // Show install button trong eco-footer (chỉ Android Chrome)
  const installBtn = document.getElementById('btn-install-pwa');
  if (installBtn) installBtn.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed');
  const installBtn = document.getElementById('btn-install-pwa');
  if (installBtn) installBtn.style.display = 'none';
  deferredInstallPrompt = null;
  localStorage.setItem('mm_pwa_installed', 'true');
});

async function installPWA() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  console.log('Install outcome:', outcome);
  deferredInstallPrompt = null;
}
```

#### HTML button (thêm vào eco-footer hoặc home)
```html
<button id="btn-install-pwa" class="btn-install" 
        onclick="installPWA()" style="display:none;">
  📱 Cài đặt app trên màn hình
</button>
```

#### CSS
```css
.btn-install {
  width: 100%;
  margin-top: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--gold), #FFB347);
  border: none;
  border-radius: 14px;
  font: 700 0.92rem 'Baloo 2', cursive;
  color: #0F0A2E;
  cursor: pointer;
  display: flex; /* Hidden until prompt available */
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(255,217,74,.3);
  transition: transform 0.12s;
}
.btn-install:active { transform: scale(0.97); }
.btn-install:hover { transform: translateY(-2px); }
```

#### Vị trí trong home screen
Thêm vào **trên** eco-footer, **sau** version badge:

```html
<div style="...">v4.4 · Magic Moment ✨</div>

<!-- PWA Install Button (chỉ hiện khi browser support + chưa install) -->
<div style="padding:0 16px;">
  <button id="btn-install-pwa" class="btn-install" 
          onclick="installPWA()" style="display:none;">
    📱 Cài đặt app trên màn hình
  </button>
</div>

<div class="eco-footer">
  <!-- ... existing eco-footer ... -->
</div>
```

### 4.4 iOS Install Hint (Safari không support beforeinstallprompt)

```javascript
// Check iOS Safari (không có beforeinstallprompt)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

if (isIOS && !isInStandaloneMode && !localStorage.getItem('mm_ios_hint_shown')) {
  // Show iOS install hint sau 30 giây dùng app
  setTimeout(() => {
    const hint = document.getElementById('ios-install-hint');
    if (hint) hint.classList.add('show');
  }, 30000);
}

function dismissIOSHint() {
  document.getElementById('ios-install-hint').classList.remove('show');
  localStorage.setItem('mm_ios_hint_shown', 'true');
}
```

```html
<!-- iOS install hint banner -->
<div id="ios-install-hint" class="ios-hint">
  <div class="ios-hint-content">
    <span class="ios-hint-icon">📱</span>
    <div class="ios-hint-text">
      <div class="ios-hint-title">Cài đặt Magic Moment</div>
      <div class="ios-hint-desc">Tap nút Chia sẻ <span style="font-size:1.2em;">⬆️</span> → "Thêm vào màn hình chính"</div>
    </div>
    <button class="ios-hint-close" onclick="dismissIOSHint()">✕</button>
  </div>
</div>
```

```css
.ios-hint {
  position: fixed;
  bottom: -100px;
  left: 16px;
  right: 16px;
  background: linear-gradient(135deg, #1a1130, #0F0A2E);
  border: 1px solid var(--gold);
  border-radius: 16px;
  padding: 14px;
  z-index: 1000;
  transition: bottom 0.4s ease-out;
  box-shadow: 0 8px 24px rgba(0,0,0,.5);
}
.ios-hint.show { bottom: 16px; }
.ios-hint-content {
  display: flex; align-items: center; gap: 12px;
}
.ios-hint-icon { font-size: 1.8rem; }
.ios-hint-text { flex: 1; }
.ios-hint-title {
  font: 700 0.92rem 'Baloo 2', cursive;
  color: var(--gold);
}
.ios-hint-desc {
  font: 500 0.78rem 'Nunito', sans-serif;
  color: rgba(255,255,255,.85);
  margin-top: 2px;
}
.ios-hint-close {
  background: rgba(255,255,255,.1);
  border: none;
  border-radius: 50%;
  width: 28px; height: 28px;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}
```

---

## 5. APP ICONS — TẠO BẰNG CÁCH NÀO?

### Option A: Đơn giản nhất (recommend cho ba)

Dùng **emoji 🪄 hoặc 🐰** + background gold trên Canva:

1. Vào Canva → "Create a design" → Custom size 512x512
2. Background: solid color `#FFD94A` (gold) hoặc gradient `#FFD94A → #FFB347`
3. Emoji 🪄 hoặc 🐰 ở giữa, size 60% canvas
4. Export PNG 512x512 → save as `icon-512.png`
5. Resize 192x192 (Canva tự làm) → save as `icon-192.png`
6. Maskable: padding nhiều hơn (icon ở giữa 80%) → save as `icon-maskable.png`

### Option B: AI generate

Prompt cho ChatGPT/Midjourney:
```
"Create a friendly, colorful app icon for a children's English learning app called Magic Moment. 
Style: flat design, rounded square, gold/yellow background gradient (#FFD94A to #FFB347). 
Center: cute white rabbit (Bibi mascot) with magic wand. 
Size: 1024x1024 PNG. No text. iOS app icon style."
```

### Option C: Online generator
- https://realfavicongenerator.net — upload 1 ảnh 512x512 → tự generate full set
- https://www.pwabuilder.com/imageGenerator — chuyên cho PWA

**Note:** Tôi không tự tạo icon được trong session này. Ba làm trước rồi để vào folder `icons/` trước khi push prompt cho Claude Code.

---

## 6. PROMPT CHO CLAUDE CODE

```
Tôi muốn build feature PWA Installable cho Magic Moment v4.3 → v4.4.
Đọc STATUS.md và SKILL.md trong project trước. Đọc PWA_DESIGN.md đính kèm.

CONTEXT:
Magic Moment hiện đang là 1 web app deploy Vercel. Tôi muốn nâng cấp thành PWA 
để user có thể "cài đặt" như app native — có icon trên home screen điện thoại,
mở full-screen không thấy thanh URL.

PRE-REQUISITE (tôi đã chuẩn bị trước khi gửi prompt):
- Folder /icons/ với 3 file: icon-192.png, icon-512.png, icon-maskable.png
- Đã upload lên repo

NHIỆM VỤ — 4 phần:

PHẦN 1: Tạo manifest.json
- Copy nội dung từ design doc mục 3.2
- Đặt ở root cùng cấp index.html

PHẦN 2: Tạo sw.js (Service Worker)
- Copy nội dung từ design doc mục 3.3
- Strategy: precache shell + network-first cho HTML/JS/CSS, cache-first cho icons
- KHÔNG cache Groq API calls
- Đặt ở root cùng cấp index.html

PHẦN 3: Update vercel.json
- Theo mục 3.4 — thêm builds cho manifest.json, sw.js, icons/
- Thêm headers cho sw.js (Cache-Control: no-cache, Service-Worker-Allowed: /)

PHẦN 4: Update index.html
- Thêm meta tags trong <head> (manifest link, apple-touch-icon, app-capable...)
- Thêm Service Worker registration (sau window load)
- Thêm beforeinstallprompt handler
- Thêm CSS .btn-install + .ios-hint
- Thêm HTML install button trong home screen (giữa version badge và eco-footer)
- Thêm HTML iOS install hint banner
- Thêm logic check iOS Safari → show hint sau 30s
- Đổi version badge: v4.3 → v4.4

YÊU CẦU CỤ THỂ:

1. Service Worker phải register thành công (check DevTools → Application → SW)
2. Install button CHỈ hiện khi browser fire beforeinstallprompt event
3. iOS hint CHỈ hiện trên iOS Safari (không phải Android, không phải desktop)
4. Sau khi install thành công → install button ẩn vĩnh viễn (mm_pwa_installed flag)
5. KHÔNG cache Groq API → app vẫn cần internet để gọi AI (Magic Scan, StoryDuo)
6. Theme Packs + Help Guide vẫn hoạt động được offline (vì là hardcoded data)

RÀNG BUỘC:
- KHÔNG phá feature nào hiện tại
- Validate JS sau khi sửa
- Test chạy local: python -m http.server 8080 → http://localhost:8080
- Service Worker chỉ work trên https hoặc localhost (không file://)
- Icons phải có sẵn trong /icons/ trước khi test (báo tôi nếu thiếu)

ACCEPTANCE TEST:

A. Desktop Chrome:
1. Open http://localhost:8080 → DevTools → Application → Service Workers → SW registered ✓
2. Application → Manifest → manifest.json loaded, icons preview ✓
3. Address bar → icon "Install Magic Moment" → tap → install dialog ✓
4. Sau install: app mở trong window riêng, không có URL bar ✓

B. Android Chrome:
1. Mở app trên Vercel → sau ~30s, button "📱 Cài đặt app" hiện trong home ✓
2. Tap button → install prompt xuất hiện → tap "Cài đặt" ✓
3. Icon Magic Moment xuất hiện trên home screen Android ✓
4. Tap icon → app mở full-screen (không thấy Chrome UI) ✓

C. iOS Safari:
1. Mở app trên Safari → sau 30s, banner iOS hint hiện từ dưới lên ✓
2. Banner hướng dẫn: "Tap Share → Thêm vào màn hình chính" ✓
3. Tap ✕ → banner ẩn, không hiện lại (mm_ios_hint_shown flag) ✓
4. Sau khi user manually add to home → tap icon → app mở standalone mode ✓

D. Offline test:
1. Mở app, chờ SW activate
2. DevTools → Network → Offline mode
3. Reload → app vẫn load (từ cache) ✓
4. Theme Packs + Help Guide hoạt động ✓
5. Magic Scan → báo lỗi "cần internet" (vì gọi Groq API) — đúng behavior ✓

E. Update flow:
1. Sau khi user đã install → ba update code → push Vercel
2. User mở app → SW phát hiện version mới → cache cũ bị clear ✓
3. Reload → app version mới load ✓

Output: 4 files updated/created:
- /manifest.json (mới)
- /sw.js (mới)
- /vercel.json (updated)
- /index.html (updated)
```

---

## 7. DEPLOY CHECKLIST

```
PRE-DEPLOY:
- [ ] Tạo 3 icon files (192, 512, maskable)
- [ ] Upload icons/ folder lên GitHub
- [ ] Đảm bảo icons accessible: https://[domain]/icons/icon-192.png

POST-DEPLOY:
- [ ] Vercel deploy success
- [ ] Test https://[domain]/manifest.json → JSON load ✓
- [ ] Test https://[domain]/sw.js → JavaScript load ✓
- [ ] Lighthouse PWA audit: score ≥ 90
- [ ] Test install flow trên Android Chrome thật (không emulator)
- [ ] Test iOS install hint trên iPhone thật
- [ ] Update STATUS.md sau khi confirm hoạt động

TROUBLESHOOTING:
- SW không register → check console, có thể vì https issue
- Install button không hiện → Manifest invalid hoặc app đã install
- iOS hint không hiện → check userAgent detection
- Icons không load → check vercel.json routing
```

---

## 8. UPDATE STATUS.MD SAU KHI SHIP

```markdown
#### v4.4 — PWA Installable
- **Service Worker** — Cache strategy: network-first HTML/JS/CSS, cache-first icons, no-cache API
- **Manifest** — App metadata, 3 icons (192/512/maskable), standalone display
- **Install prompt** — Auto button trên home khi browser support beforeinstallprompt
- **iOS hint** — Banner hướng dẫn user iOS Safari add to home screen (sau 30s)
- **Offline support** — Theme Packs + Help Guide hoạt động không cần internet
- **Update flow** — SW activate → clear old cache → load version mới
- localStorage keys mới: mm_pwa_installed, mm_ios_hint_shown
- File mới: manifest.json, sw.js, icons/icon-192.png, icons/icon-512.png, icons/icon-maskable.png
```

---

## 9. ƯỚC TÍNH

| Hạng mục | Effort |
|----------|--------|
| Tạo icons (Canva/AI) | 30 phút (ba tự làm) |
| manifest.json + sw.js | 30 phút |
| Update index.html (meta + JS + CSS + HTML) | 1.5h |
| Update vercel.json | 15 phút |
| Test desktop + mobile | 1h |
| Fix bugs | 30 phút |
| **Tổng** | **~3-4h** với Claude Code |

---

## 10. SAU PWA — NEXT STEPS

Khi PWA ship xong, đề xuất tiếp theo:

1. **Word Jar (Spaced Repetition)** — feature giáo dục impact cao
2. **Theme Packs Level 2** — content depth (nếu Maya gần hết Level 1)

Quyết định thứ tự dựa trên: Maya đã thuộc bao nhiêu từ Level 1? Có dấu hiệu quên không?

---

*Document version 1.0 — 29/04/2026*
*Spec đủ chi tiết để Claude Code build trong 1 session.*
