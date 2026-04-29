# STATUS.md — Magic Moment Project
> Cập nhật lần cuối: 29/04/2026 (v4.2 — In-App Help Guide)
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

## ✅ ĐÃ HOÀN THÀNH (v4.0)

### App chính: `index.html` (Magic Moment v4.0)

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
- **Help Guide** — 9 sections accordion với Bibi mini SVG (wave state) làm tour guide
- Auto-popup lần đầu cho user mới (sau khi đóng onboarding modal)
- Icon ❓ góc trên phải home screen → mở help bất kỳ lúc nào
- CTA "Thử ngay" trong từng section → đi thẳng vào đúng module
- localStorage key mới: `mm_help_seen_v1`
- Sections: Bắt đầu nhanh · Magic Scan · Scene Explorer · StoryDuo · Theme Packs · Phần thưởng · Dashboard · Mẹo · Hỏi đáp

#### v4.1 — Theme Packs (Phase 3 Feature 1)
- **Theme Packs** — 5 chủ đề starter: Animals, Colors, Food, Body, Numbers
- *(chi tiết xem phần v4.1 bên dưới)*

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

---

### Các file đã tạo
| File | Mô tả | Trạng thái |
|------|-------|-----------|
| `index.html` | App tích hợp toàn bộ features (v4.0) | ✅ Production ready |
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

## 🗺️ ROADMAP — Phase 3 (chưa làm)

### Ưu tiên cao
- [ ] **Family Challenge** — Ba & Mẹ thi đua điểm, multi-profile, leaderboard tuần
- [ ] **Story Library** — 50+ câu chuyện mẫu có sẵn

### Ưu tiên trung bình
- [ ] **Printable Book** — Xuất StoryDuo ra PDF in được
- [ ] **Pronunciation Premium** — Phân tích phoneme sâu hơn (học từ ELSA)
- [ ] **Theme Packs** — Gói chủ đề pre-built (động vật, màu sắc, số...)

### Ưu tiên thấp / Phase 4
- [ ] **PenPal Planet** — Kết nối bé với bé quốc tế
- [ ] **Offline / PWA** — Service Worker
- [ ] **React Native** — iOS/Android native app

---

## 💡 CONTEXT QUAN TRỌNG CHO SESSION MỚI

- Con gái tên **Maya**, 3 tuổi
- Dùng **"Bé"** hoặc **"Bé yêu"** trong app — không hardcode tên cụ thể
- Ba dùng **Samsung Android** + **Windows Chrome**
- Stack: Vanilla HTML/CSS/JS · Groq API (gsk_...) · Vercel
- Repo: Giapkhampha/magicmoment
- Version hiện tại: **v4.2**
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
*Cập nhật lần cuối: 29/04/2026 — v4.0 Final Deploy*
