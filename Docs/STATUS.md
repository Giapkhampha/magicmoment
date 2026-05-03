# STATUS.md — Magic Moment Live State

> **File SỐNG.** Cập nhật mỗi khi có sprint mới hoàn thành.
> Đây là file Claude/AI nên đọc TRƯỚC TIÊN khi bắt đầu phiên mới để biết "đang ở đâu".

> **Cập nhật lần cuối:** 04/05/2026 (v4.4.2 — Domain migration to giapkhampha.me)

---

## 🎯 Đang ở đâu?

- **Version hiện tại:** v4.4.2
- **URL chính thức:** https://magicmoment.giapkhampha.me ⭐
- **URL cũ (vẫn hoạt động):** https://magicmoment-five.vercel.app (redirect 307 → magicmoment.giapkhampha.me)
- **Trạng thái:** ✅ Production stable
- **Sprint vừa hoàn thành:** Domain migration (v4.4.2)
- **Sprint tiếp theo:** Backend Proxy v4.5 (key pool, user không cần nhập key)

---

## ✅ Đã hoàn thành (lịch sử versions)

### v4.4.2 — Domain Migration (04/05/2026)
- Migrate domain từ `magicmoment-five.vercel.app` → `magicmoment.giapkhampha.me`
- Setup CNAME `magicmoment` → `cname.vercel-dns.com` trong Cloudflare
- Add domain vào Vercel project → SSL auto-issued
- Vercel redirect cũ: `magicmoment-five.vercel.app` → 307 → `learn-01.vercel.app` (Vercel internal)
- Bổ sung meta tags trong `<head>`: `og:url`, `canonical` → URL mới
- Fix 1 hardcoded URL trong canvas share card (line 2390)
- Bump cache: `magic-moment-v4.4` → `magic-moment-v4.4.2` (force SW refresh)
- Version badge: v4.4.1 → v4.4.2
- **Commit:** `7fcd9f0`
- **Push command dùng:** `git push origin master:main --force-with-lease`

### v4.4 — PWA Installable (30/04/2026)
- Service Worker với cache strategy: precache shell + network-first HTML/JS/CSS
- manifest.json với 3 icons (192/512/maskable) — Ba Maya tự thiết kế Canva (🐰 + 🪄 + sparkles trên gold)
- Install prompt button trên home khi `beforeinstallprompt` fire
- iOS install hint banner sau 30 giây cho Safari users
- Folder `/icons/` upload trực tiếp lên GitHub (không qua git CLI)
- Vercel env vars: chưa cần thêm gì
- **Files mới:** `manifest.json`, `sw.js`, `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-maskable.png`

### v4.3 — Ecosystem Footer (29/04/2026)
- Section cuối home, chỉ hiển thị ở `s-home`
- Brand: "🌸 Made with ❤️ by Ba Maya · giapkhampha.me"
- 2 link cards: Giáp Khám Phá (teal→purple), Ba & Maya Journey (amber→rose)
- `<a href>` tag thật, `target="_blank" rel="noopener"`
- Accent bar 3px qua `::before` pseudo-element

### v4.2 — In-App Help Guide (29/04/2026)
- Screen mới `s-help`, 9 sections accordion
- Bibi mini SVG (wave state) làm tour guide
- Auto-popup lần đầu sau `closeOnboarding()` (delay 800ms)
- Icon ❓ (`btn-help-home`) góc trên phải home (position absolute)
- CTA "Thử ngay" trong từng section
- localStorage key mới: `mm_help_seen_v1`
- Sections: Bắt đầu nhanh · Magic Scan · Scene Explorer · StoryDuo · Theme Packs · Phần thưởng · Dashboard · Mẹo · Hỏi đáp

### v4.1 — Theme Packs (29/04/2026)
- 5 chủ đề starter: Animals, Colors, Food, Body, Numbers
- 8 từ × 5 pack = 40 từ (data hardcoded, không gọi API)
- Flashcard UI với queue logic ("Đã thuộc"/"Chưa rõ")
- +50⭐ bonus + sticker khi hoàn thành pack lần đầu
- Review mode (đã completed): không cộng bonus lần 2
- localStorage: `mm_themes` = `{packId: {completed, completedAt, learned[], timesPlayed}}`
- Home tile mới "📚 Chủ đề" (amber→gold gradient)

### v4.0 — Polish & Deploy (28/04/2026)
- Meta tags: description, theme-color, OG tags
- PWA meta cơ bản (apple-mobile-web-app-capable)
- Loading screen với loader 🐰
- Error boundary: `window.onerror` + `window.onunhandledrejection`
- Version badge v4.0 ở footer
- Deploy chính thức trên Vercel

### v3.x — Engagement Loop (trước 28/04)
- **Streak Calendar** với cột mốc 3/7/14/30/60/100 ngày
- **Mascot Bibi** SVG inline 6 states
- **Daily Quest** 3 nhiệm vụ/ngày, +50⭐ bonus
- **Sticker Album** 30 stickers × 5 themes, rare 20%, flip animation
- **Share Card** Canvas 1080×1920 với Web Share API

### v2.x — Parent Insight
- **Parent Dashboard** với bar chart 7 ngày, top topics, sticker progress

### v1.x — MVP (3 modules cốt lõi)
- **Magic Scan** — Chụp ảnh → AI nhận dạng → TTS + mic chấm phát âm
- **Scene Explorer** — Upload ảnh → ghim đồ vật → Đố Tìm + Quiz
- **StoryDuo** — Ba kể VI → AI dịch EN + emoji scene + 3 từ vựng

---

## 🐛 Bugs đã fix gần đây (để không lặp)

| Bug | Khi nào | Fix |
|-----|---------|-----|
| `mm_hist exceeded quota` trên mobile | v4.4.1 hotfix | Compress image về thumbnail 96x96 + safeSetHist với auto-cleanup |
| Hardcoded `magicmoment.vercel.app` trong share card | v4.4.2 | Search & replace |
| PWA install button không hiện sau migrate domain | v4.4.2 | Cache mới (`v4.4.2`) + clear PWA cũ trên browser |
| `Failed to fetch` từ file:// | (cũ) | Bắt buộc dùng localhost hoặc Vercel |
| `Illegal return statement` | (cũ) | Validate JS với `node -e "new Function()"` sau mọi edit |
| AI trả JSON lỗi trailing comma | (cũ) | parseJSON() 3 lớp |
| Camera mở file dialog thay webcam | (cũ) | Tách 2 màn hình: webcam (getUserMedia) + file input |
| Pollinations.ai timeout | (cũ) | Bỏ hoàn toàn, dùng Emoji Scene |

---

## 🔑 Technical state hiện tại

### API & Models
- **Provider:** Groq (free tier, key user tự nhập)
- **Vision:** `meta-llama/llama-4-scout-17b-16e-instruct` (1,000 req/ngày Vision)
- **Text:** `llama-3.3-70b-versatile` (1,000 req/ngày Text)
- **Key format:** `gsk_...`, lưu localStorage `mm_key`
- **⚠️ Pain point:** User mới phải tự lấy key Groq → friction → sẽ fix ở v4.5 (Backend Proxy)

### localStorage keys hiện tại

| Key | Nội dung |
|-----|----------|
| `mm_key` | Groq API key user nhập |
| `mm_hist` | Word history (tối đa 50 items, image thumbnail 96x96) |
| `mm_scoreday` | Điểm hôm nay |
| `mm_wcnt` | Tổng từ đã học |
| `mm_streak` | Streak data (current, best, days[], milestones[]) |
| `mm_quest` | Daily quest (date, quests, bonusGiven) |
| `mm_stickers` | Sticker data (unlocked[], themeBadges[]) |
| `mm_themes` | Theme Packs data |
| `mm_onboarded` | Onboarding flag |
| `mm_help_seen_v1` | Help Guide đã xem |
| `mm_pwa_installed` | PWA đã cài |
| `mm_ios_hint_shown` | iOS install hint đã hiện |
| `mm_hist_compressed_v45` | Migration flag (v4.4.1) |

### Files trong repo
```
magicmoment/
├── index.html           ← App chính (v4.4.2, ~170KB)
├── manifest.json        ← PWA manifest
├── sw.js                ← Service Worker (CACHE_NAME: magic-moment-v4.4.2)
├── vercel.json          ← Routing config
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable.png
├── CLAUDE.md            ← Entry point (mới tạo 04/05/2026)
└── docs/
    ├── CONTEXT.md       ← Bối cảnh (mới)
    ├── STATUS.md        ← File này (file SỐNG)
    ├── ROADMAP.md       ← Kế hoạch (mới)
    └── CONVENTIONS.md   ← Code style (mới)
```

### Deploy
- **GitHub:** github.com/Giapkhampha/magicmoment
- **Local branch:** `master`
- **Production branch:** `main` (Vercel watch)
- **Push:** `git push origin master:main --force-with-lease`
- **Vercel project:** giaptdtc / magicmoment (Hobby plan, free)

---

## ⏭️ Đang làm / Đang vướng

### Đang làm
- Tạo knowledge architecture (CLAUDE.md, CONTEXT.md, STATUS.md, ROADMAP.md, CONVENTIONS.md)

### Đang vướng / cần quyết
- Chưa setup PWA install lại trên domain mới (cần clear PWA cũ + reload)
- Chưa làm Backend Proxy (v4.5) — user mới vẫn phải lấy key Groq

### Sẵn sàng làm tiếp (priority order)
1. **Backend Proxy v4.5** — User không cần nhập API key (chi tiết trong ROADMAP.md)
2. **Word Jar / Spaced Repetition** — Bé học từ rồi quên → cần ôn lại
3. **Theme Packs Level 2** — 6 packs mới (Home, Nature, Actions, Feelings, Family, Clothes)

---

## 📊 Capacity / Performance state

### Quota Groq hiện tại (free, 1 key Ba Maya)
- Vision: 1,000 req/ngày
- Text: 1,000 req/ngày
- → ~80 user/ngày capacity (bottleneck Vision)

### Sau khi v4.5 Backend Proxy (kế hoạch)
- 1 Super tier ($20/mo) + 4 Free keys = 14,000 req/ngày Vision
- → ~1,100 user/ngày capacity

### Vercel state
- Hobby plan (free)
- Auto-deploy từ branch `main`
- Functions chưa dùng (chưa có `/api/` folder)
- Bandwidth + builds: chưa hit limit

---

## 🌐 Domain & DNS

### Cloudflare DNS records cho `giapkhampha.me`
```
A     | giapkhampha.me     | 76.76.21.21         | DNS only ✓
CNAME | www                | cname.vercel-dns.com | DNS only ✓
CNAME | pdf                | cname.vercel-dns.com | DNS only ✓
CNAME | magicmoment        | cname.vercel-dns.com | DNS only ✓ (mới v4.4.2)
MX × 3 | route1-3.mx.cloudflare.net | (Email Routing)
TXT × 2 | DKIM + SPF        | (Email Routing)
```

### Email forwarding active
- `lienhe@giapkhampha.me` → Gmail Ba Maya ✓
- (Tương lai có thể thêm: `magic@`, `pdf@`, etc.)

---

## 🔥 Quick reference cho Claude/AI

Khi user request feature mới:
1. **Đọc ROADMAP.md** xem feature đó có trong plan không
2. **Đọc CONVENTIONS.md** xem có patterns đã chốt liên quan không
3. **Đọc section "Bugs đã fix"** ở trên xem có lesson learned không
4. **Hỏi user** trước khi sửa nếu có gì mơ hồ

Khi sửa bug:
1. **Đọc section "Bugs đã fix gần đây"** xem có pattern tương tự
2. **Verify bug reproducer** trước khi đoán nguyên nhân
3. **Sửa nhỏ + test** thay vì rewrite lớn

Khi user nói "deploy / push":
1. **`git push origin master:main --force-with-lease`** (KHÔNG `git push origin main` thuần)
2. **Đợi Vercel build** ~1-2 phút
3. **Hard refresh** (`Ctrl+Shift+R`) trên production để verify

---

*File version 4.4.2 — 04/05/2026*
*Update mỗi khi: ship version mới, fix bug đáng nhớ, đổi infrastructure*
