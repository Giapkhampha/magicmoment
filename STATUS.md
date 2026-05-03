# STATUS.md — Magic Moment Project
> Cập nhật lần cuối: 30/04/2026 (v4.4 — PWA Installable)
> Mục đích: File này giúp Claude hiểu toàn bộ ngữ cảnh dự án để tiếp tục phát triển

---

## 🎯 DỰ ÁN LÀ GÌ?

**Magic Moment** — Web app học tiếng Anh cho trẻ 3-6 tuổi, ba/mẹ đồng hành.
- **Người dùng:** Bố (mất gốc tiếng Anh) + con gái Maya 3 tuổi
- **Triết lý:** "Ba là người chơi cùng, không phải giáo viên" — AI làm cầu nối
- **Stack:** Single-file HTML/CSS/JS · Groq API (free) · Deploy Vercel
- **Live URL:** `https://[tên-project].vercel.app` (do user deploy)
- **Repo:** Giapkhampha/magicmoment

---

## ✅ ĐÃ HOÀN THÀNH (v4.4)

### App chính: `index.html` (Magic Moment v4.3)

#### Phase 1 — MVP (3 modules cốt lõi)
- **Magic Scan** — Chụp ảnh → AI nhận dạng → TTS + mic chấm phát âm
- **Scene Explorer** — Upload ảnh → ghim đồ vật → Đố Tìm + Quiz
- **StoryDuo** — Ba kể chuyện VI → AI dịch EN + emoji scene + 3 từ vựng

#### Phase 2A — Engagement Loop
- **Streak Calendar** — Tick hằng ngày, cột mốc 3/7/14/30/60/100 ngày
- **Mascot Bibi** — Thỏ trắng SVG inline, 6 states (idle/happy/thinking/celebrate/sleeping/wave)
- **Daily Quest** — 3 nhiệm vụ/ngày reset 0h, bonus +50⭐ khi hoàn thành cả 3
- **UI Responsive** — Mobile-first, max-width 480px, safe area iPhone/Android

#### Phase 2B — Viral Engine
- **Sticker Album** — 30 stickers × 5 chủ đề, rare 20%, flip animation, theme badge
- **Share Card** — Canvas 1080×1920, Web Share API, fallback download

#### Phase 2C — Parent Insight
- **Parent Dashboard** — Bar chart 7 ngày, top topics, sticker progress, review words, all-time stats

#### v4.1 — Theme Packs (Phase 3)
- **Theme Packs** — 5 chủ đề starter: Animals, Colors, Food, Body, Numbers
- 8 từ × 5 pack = 40 từ cấu trúc; data hardcoded (no API)
- Flashcard UI: emoji + EN (Baloo 2 gold) + IPA + VI (Caveat) + example sentence
- TTS auto khi mở card; nút Nghe lại + Nói thử (en-US mic + Levenshtein check)
- "✅ Đã thuộc" → +5⭐, vào wordHist(source:'theme:packId'), tryUnlockSticker, progressQuest
- "🤔 Chưa rõ" → word đẩy về cuối queue, gặp lại sau
- Hoàn thành pack lần đầu: +50⭐ bonus + forceUnlock sticker từ đúng theme
- Review mode (pack completed): ôn lại tất cả, không cộng bonus lần 2
- localStorage: mm_themes = {packId: {completed, completedAt, learned[], timesPlayed}}
- Home: story tile thu nhỏ về 2x2 grid, thêm tile "📚 Chủ đề" (amber→gold)
- Parent Dashboard: getTopTopics() hiện "🐱 Động vật" thay vì "theme:animals"

#### v4.2 — In-App Help Guide (Phase 3 Feature 2)
- **Help Guide** — 1 screen mới (`s-help`), 9 sections accordion với Bibi mini SVG (`#help-bibi-svg`, wave state) làm tour guide
- Auto-popup lần đầu: sau khi `closeOnboarding()` set `mm_onboarded`, gọi `checkHelpAutoOpen()` → delay 800ms → `openHelp()`
- Guard logic: `checkHelpAutoOpen()` chỉ chạy khi `!mm_help_seen_v1 && mm_onboarded` (tránh conflict với onboarding modal)
- Icon ❓ (`btn-help-home`) góc trên phải home screen (position:absolute top:16px right:16px) → mở help bất kỳ lúc nào
- CTA "Thử ngay" trong từng section → đi thẳng vào đúng module (onclick attribute inline)
- `exitHelp()` → set `mm_help_seen_v1` + `go('s-home')`; `markHelpSeen()` gọi thêm khi bấm CTA
- 4 call sites cho `checkHelpAutoOpen()`: `window.onload`, `saveKey()`, `closeOnboarding()` + định nghĩa hàm
- CTA screen mapping thực tế: scan→`go('s-cam')` · scene→`go('s-scene')` · story→`go('s-sd-home');renderSDHome()` · theme→`openThemes()` · dashboard→`openDashboard()`
- localStorage key mới: `mm_help_seen_v1` (versioned, reset khi nội dung help thay đổi)
- Sections: Bắt đầu nhanh · Magic Scan · Scene Explorer · StoryDuo · Theme Packs · Phần thưởng · Dashboard · Mẹo · Hỏi đáp
- CSS mới: `.help-bibi-banner`, `.bibi-mini`, `.help-accordion`, `.help-item`, `.help-header`, `.help-body`, `.help-cta`, `.help-tip`, `.help-table`, `.btn-help-home`, `#help-bibi-svg` animation scope
- Version badge cập nhật: `v4.2 · Magic Moment ✨`

#### v4.4 — PWA Installable
- **Service Worker** (`sw.js`) — Cache strategy: network-first HTML/JS/CSS, cache-first icons, skip Groq API calls
- **Manifest** (`manifest.json`) — App metadata, 3 icons (192/512/maskable), standalone display, theme gold #FFD94A
- **Install prompt** — `btn-install-pwa` tự hiện khi browser fire `beforeinstallprompt` (Android Chrome); ẩn sau khi install
- **iOS hint** — Banner slide-up hướng dẫn iOS Safari user add to home screen; hiện sau 30s, dismiss 1 lần (flag `mm_ios_hint_shown`)
- **Offline support** — Theme Packs + Help Guide hoạt động không cần internet; Magic Scan/StoryDuo báo lỗi (cần Groq API)
- **Update flow** — SW activate → clear old caches → load version mới
- localStorage keys mới: `mm_pwa_installed`, `mm_ios_hint_shown`
- Files mới: `manifest.json`, `sw.js`; icons đã có sẵn tại `/icons/`
- Version badge: v4.3 → v4.4

#### v4.3 — Ecosystem Footer
- **Eco Footer** — section cuối s-home, chỉ hiển thị ở home, không xuất hiện screen khác
- Brand signature: `🌸 Made with ❤️ by Ba Maya · giapkhampha.me` (clickable → hub chính)
- 2 link cards side-by-side (stack vertical ≤400px):
  - **Giáp Khám Phá** (`eco-a`, teal→purple) → `giapkhamphame.vercel.app`
  - **Ba & Maya Journey** (`eco-b`, amber→rose) → `maya-journey.vercel.app`
- `<a href>` tag thật, `target="_blank" rel="noopener"` — không dùng JS onclick
- Accent bar 3px trên mỗi card qua `::before` pseudo-element
- CSS: `.eco-footer`, `.eco-brand`, `.eco-heading`, `.eco-cards`, `.eco-card`, `.eco-icon`, `.eco-text`, `.eco-title`, `.eco-sub`
- Version badge: `v4.2` → `v4.3`

#### v4.0 — Polish & Deploy
- **Meta tags** — description, theme-color, OG tags (Facebook/Zalo share preview)
- **PWA meta** — apple-mobile-web-app-capable, status-bar-style, title
- **Loading screen** — Loader 🐰 fade-out khi app sẵn sàng (xóa trắng màn hình)
- **Error boundary** — `window.onerror` + `window.onunhandledrejection` (log, không crash)
- **Version badge** — "v4.0 · Magic Moment ✨" ở footer home

### localStorage keys
| Key | Nội dung |
|-----|---------|
| `mm_key` | Groq API key |
| `mm_hist` | Word history (english, vietnamese, emoji, timestamp, source) |
| `mm_scoreday` | Điểm hôm nay |
| `mm_wcnt` | Tổng từ đã học |
| `mm_streak` | Streak data (current, best, days[], milestones[]) |
| `mm_quest` | Daily quest (date, quests{scan,game,story}, bonusGiven) |
| `mm_stickers` | Sticker data (unlocked[], themeBadges[], wordsSinceLastSticker) |
| `mm_migrated_v3_1` | Migration flag |
| `mm_onboarded` | Onboarding flag |
| `mm_themes` | Theme Packs data ({packId: {completed, completedAt, learned[], timesPlayed}}) |
| `mm_help_seen_v1` | Flag đã xem Help Guide (versioned) |
| `mm_pwa_installed` | Flag đã install PWA (ẩn install button) |
| `mm_ios_hint_shown` | Flag đã thấy iOS install hint (không hiện lại) |

---

### Các file đã tạo
| File | Mô tả | Trạng thái |
|------|-------|-----------|
| `index.html` | App tích hợp toàn bộ features (v4.4) | ✅ Production ready |
| `manifest.json` | PWA manifest — tên, icons, màu, display mode | ✅ |
| `sw.js` | Service Worker — cache strategy, offline support | ✅ |
| `HELP_GUIDE_DESIGN.md` | Design doc cho In-App Help Guide (v4.2) | ✅ Archived |
| `THEME_PACKS_DESIGN.md` | Design doc cho Theme Packs (v4.1) | ✅ Archived |
| `vercel.json` | Config deploy Vercel | ✅ |
| `SKILL.md` | Technical patterns & code snippets | ✅ |
| `INSTRUCTIONS.md` | Product vision & pedagogy | ✅ |
| `STATUS.md` | File này | ✅ |

---

## 🔧 TECHNICAL DECISIONS ĐÃ CHỐT

### API
- **Groq** (không phải Anthropic/Claude API) vì miễn phí hoàn toàn
- Vision model: `meta-llama/llama-4-scout-17b-16e-instruct`
- Text model: `llama-3.3-70b-versatile`
- Key format: `gsk_...` — lưu localStorage key `mm_key`

### Illustration
- **KHÔNG dùng Pollinations.ai** (chậm, không ổn định)
- Thay bằng **Emoji Scene** (CSS animation) — instant, không cần API
- AI trả về `scene_emojis[]` + `bg_from` + `bg_to` trong JSON

### Camera
- **Desktop:** `getUserMedia()` → video stream → canvas capture
- **Mobile:** `<input type="file" accept="image/*" capture="environment">`
- Hai nút riêng biệt (không gộp) để tránh nhầm lẫn

### CORS Fix
- App **BẮT BUỘC** chạy từ `http://` hoặc `https://`
- File `file://` → lỗi CORS → không gọi được API
- Local dev: `python -m http.server 8080`
- Production: Vercel

### JSON Parsing
- AI đôi khi trả JSON lỗi → dùng parser 3 lớp:
  1. `JSON.parse()` thuần
  2. `new Function('return (...)')()` — eval fallback
  3. Throw error rõ ràng
- Luôn clean trailing commas, control chars trước khi parse

### Scoring (không phạt)
```
Mọi action đều có điểm dương:
- Đúng: +10-15⭐ (tùy game)
- Sai:  +5⭐ (khuyến khích tiếp tục)
- Confetti: CHỈ khi đúng
```

---

## 🐛 BUGS ĐÃ FIX (để không lặp lại)

| Bug | Nguyên nhân | Fix áp dụng |
|-----|-------------|-------------|
| `Illegal return statement` | `str_replace` xoá mất function declaration | Luôn verify JS với `node -e "new Function()"` sau edit |
| `Failed to fetch` | Mở `file://` trên Chrome Windows | Hướng dẫn dùng localhost hoặc Vercel |
| `Unexpected number in JSON` | AI trả JSON có trailing comma | parseJSON() 3 lớp |
| Camera mở file dialog thay vì webcam | `capture="environment"` không work trên desktop | Tách 2 màn hình: webcam (getUserMedia) và file input |
| Ảnh Pollinations không load | Server timeout + CORS | Bỏ hoàn toàn, dùng Emoji Scene |
| StoryDuo dịch quá ngắn | `max_tokens: 300` + prompt "cho bé 3 tuổi" | Tăng lên 600-700 tokens, bỏ yêu cầu "simple" |
| `ls1 is not defined` | Trong showLoad(), `ls1` không có quotes | Fix thành `'ls1','ls2','ls3'` |

---

## 📊 TRẠNG THÁI DEPLOY

```
Local dev:   http://localhost:8080/index.html  ✅
Vercel:      https://[user-domain].vercel.app  ✅ (user đã deploy)
GitHub:      Giapkhampha/magicmoment           ✅ (repo của user)
```

**Lưu ý deploy:** User đã thành công deploy lên Vercel với:
- Framework: **Other** (không phải Angular/React/...)
- File chính: `index.html` → `vercel.json` route tất cả về đây

---

## 🗺️ ROADMAP — Updated post v4.3 (Ecosystem Aware)

### Phase 3 — DONE ✅
- [x] **Theme Packs** — 5 chủ đề starter, 40 từ vựng (v4.1)
- [x] **In-App Help Guide** — 9 sections accordion, auto-popup (v4.2)
- [x] **Ecosystem Footer** — brand signature + 2 link cards (v4.3)

### Phase 4 — Top 3 ưu tiên kế tiếp

**Quyết định dựa trên: ecosystem context (3 apps Giáp Khám Phá) + giáo dục impact + observation Maya thực tế**

#### 🥇 #1 — PWA Installable ✅ DONE (v4.4)

#### 🥈 #1 (mới) — Word Jar / Spaced Repetition (~4h)
- Bình "từ cần ôn" tự động xuất hiện sau 3/7/14/30 ngày
- Algorithm: dựa trên SM-2 simplified
- Mỗi ngày tap "Word Jar" → 5 từ ngẫu nhiên cần ôn
- **Lý do ưu tiên:** Vấn đề lớn nhất hiện tại = bé học từ rồi quên. Đây là single feature có giáo dục impact cao nhất trên toàn roadmap.

#### 🥉 #3 — Theme Packs Level 2 (~3h)
- 6 packs mới: Home, Nature, Actions, Feelings, Family, Clothes
- 8 từ × 6 pack = 48 từ Level 2
- Phù hợp 4-5 tuổi (sau khi Maya thuộc Level 1)
- **Lý do ưu tiên:** Content depth — tránh chán khi bé hết Level 1.

### Phase 5 — Khi có signals từ user

**Không hardcode trước — quyết định dựa trên observation.**

| Trigger | Build feature |
|---------|---------------|
| Bé hết Theme Pack Level 2 | Theme Packs Level 3 (4 packs: School/Transport/Clothes/Seasons) |
| Mẹ/ông bà ghen tị muốn tham gia | Multi-Profile (2-3 profile chung 1 device) |
| Ba muốn theo dõi từ điện thoại khác | Cloud Sync (Supabase free tier) |
| StoryDuo thành hit | Story Sharing (link chia sẻ sách cho ông bà) |
| Mic phát hiện nhiều bé phát âm sai | Pronunciation Premium (phoneme analysis) |

### Hướng dài hạn (parking lot — chờ ecosystem mature)

- **Cross-app integration** (Magic Moment ↔ Maya Journey): Học từ Magic Moment auto-post vào nhật ký Maya Journey
- **Shared Word Bank**: Từ vựng học ở Magic Moment xuất hiện trong bài viết Giáp Khám Phá
- **Custom Domain**: `magicmoment.giapkhampha.me` (sau khi mua giapkhampha.me)
- **Native App** (React Native): Wrap thành iOS/Android app

### ❌ Đã loại / Giảm priority sau ecosystem awareness

| Feature | Trạng thái | Lý do |
|---------|-----------|-------|
| Story Library (50 chuyện) | ⬇️ Giảm | Sách hay đã có ở Giáp Khám Phá hub |
| Onboarding Video | ❌ Loại | Có thể làm content trên Giáp Khám Phá thay vì nhồi vào app |
| Community feature | ❌ Loại | Giáp Khám Phá đóng vai trò community |
| PenPal Planet | ⬇️ Giảm | Phức tạp, cần backend; không phải core value |
| Printable Book | ⬇️ Giảm | Nice-to-have, không tăng learning |

---

## 💡 NGUYÊN TẮC PHÁT TRIỂN POST-v4.3

1. **Magic Moment FOCUS:** Học tiếng Anh qua AI (vision, voice, narrative)
2. **KHÔNG ôm đồm:** Sách hay, phương pháp giáo dục, community — đã có ở Giáp Khám Phá hub
3. **Observe trước khi build:** Quan sát Maya & ba dùng 2-3 tuần trước khi quyết Phase 5
4. **Ecosystem first:** Mọi feature mới nghĩ đến tích hợp với Maya Journey + Giáp Khám Phá

---

## 💡 CONTEXT QUAN TRỌNG CHO SESSION MỚI

- Con gái tên **Maya**, 3 tuổi
- Dùng **"Bé"** hoặc **"Bé yêu"** trong app — không hardcode tên cụ thể
- Ba dùng **Samsung Android** + **Windows Chrome**
- Stack: Vanilla HTML/CSS/JS · Groq API (gsk_...) · Vercel
- Repo: Giapkhampha/magicmoment
- Version hiện tại: **v4.4**
- Mọi text error: **tiếng Việt**
- KHÔNG dùng framework, KHÔNG external asset
- JS validate: `node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"`

---

## 🚀 KHI BẮT ĐẦU SESSION MỚI

Claude cần đọc file này và:
1. Hỏi user muốn build feature nào tiếp theo
2. Đọc lại SKILL.md trước khi viết code mới
3. Verify JS syntax sau mỗi lần sửa file
4. Test case đầu tiên: chạy từ localhost, không từ file://
5. Mọi feature mới → update STATUS.md phần "Đã hoàn thành"

---

*File này được tạo vào ngày 28/04/2026 — cuối session build Magic Moment v3*
*Cập nhật lần cuối: 29/04/2026 — v4.3 Ecosystem Footer*
