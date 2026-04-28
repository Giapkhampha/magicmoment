# STATUS.md — Magic Moment Project
> Cập nhật lần cuối: 28/04/2026
> Mục đích: File này giúp Claude hiểu toàn bộ ngữ cảnh dự án để tiếp tục phát triển

---

## 🎯 DỰ ÁN LÀ GÌ?

**Magic Moment** — Web app học tiếng Anh cho trẻ 3-6 tuổi, ba/mẹ đồng hành.
- **Người dùng:** Bố (mất gốc tiếng Anh) + con gái 3 tuổi
- **Triết lý:** "Ba là người chơi cùng, không phải giáo viên" — AI làm cầu nối
- **Stack:** Single-file HTML/CSS/JS · Groq API (free) · Deploy Vercel
- **Live URL:** `https://[tên-project].vercel.app` (do user deploy)

---

## ✅ ĐÃ HOÀN THÀNH

### App chính: `index.html` (Magic Moment v3 — unified)
File duy nhất tích hợp **3 module** vào một app:

#### Module 1 — 📸 Magic Scan
- Chụp ảnh đồ vật bằng webcam (desktop) hoặc camera/thư viện (mobile)
- Groq Vision AI nhận dạng → trả về: tên tiếng Anh, IPA phonetic, tiếng Việt, emoji, câu ví dụ
- Text-to-Speech đọc to từ vựng
- Bé nói vào mic → App chấm phát âm (Levenshtein) → +10⭐ hoặc +5⭐
- Lưu lịch sử từ đã học (ảnh + từ) vào localStorage
- **Trạng thái:** ✅ Hoàn chỉnh, đang dùng được

#### Module 2 — 🖼️ Scene Explorer + 2 Games
- Upload ảnh bất kỳ → Groq phân tích → đặt ghim màu lên 6-8 đồ vật
- **Trò chơi 1 — Đố Tìm:** AI đọc tên → Bé tap vào đúng vị trí trong hình
  - Đúng lần 1: +15⭐ | lần 2: +10⭐ | lần 3: +5⭐
  - Gợi ý (hint ring) sau 2 lần sai
  - Auto-reveal sau 3 lần sai
- **Trò chơi 2 — Quiz:** Thấy emoji + gợi ý VI → Chọn 1/4 đáp án
- Màn hình Game Over có tổng điểm + 1-3 sao
- **Trạng thái:** ✅ Hoàn chỉnh

#### Module 3 — 📖 StoryDuo
- Ba kể chuyện bằng tiếng Việt (nói mic HOẶC gõ text — đề phòng nơi ồn ào)
- Groq dịch đầy đủ sang tiếng Anh (không tóm tắt), trích 3 từ vựng chính
- AI trả về 4-6 emojis + màu nền phù hợp → Build **Emoji Scene** (animation, instant)
- 3 từ vựng được highlight màu khác nhau (amber/rose/mint) ngay trong câu EN
- Vocab badges: `RABBIT = con thỏ`
- Lưu nhiều câu chuyện (max 10), mỗi câu có nhiều trang (max 20)
- Book view: xem toàn bộ câu chuyện dạng flip book
- **Trạng thái:** ✅ Hoàn chỉnh

### Các file đã tạo
| File | Mô tả | Trạng thái |
|------|-------|-----------|
| `index.html` | App tích hợp 3 module | ✅ Production ready |
| `magic-moment.html` | Bản standalone chỉ Scan + Scene | ✅ (cũ, superseded) |
| `storyduo.html` | Bản standalone chỉ StoryDuo | ✅ (cũ, superseded) |
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

## 🗺️ ROADMAP (chưa làm)

### Ưu tiên cao (Phase 2)
- [ ] **Streak Calendar** — Học liên tục X ngày, huy hiệu thành tích
- [ ] **Word Jar** — Bình từ vựng theo tuần, ôn tập Spaced Repetition
- [ ] **Share Card** — Tạo ảnh "Hôm nay bé học được..." cho TikTok/Facebook
- [ ] **Theme Packs** — Gói chủ đề: Động vật / Màu sắc / Số đếm / Thức ăn

### Phase 3 — Viral features
- [ ] **StoryDuo — Printable Book** — Xuất PDF sách tranh để in
- [ ] **Challenge Mode** — Ba con thi nhau: 10 từ trong 5 phút
- [ ] **Story Library** — 50+ câu chuyện mẫu có sẵn
- [ ] **PenPal Planet** — Kết nối bé với bé quốc tế qua voice message

### Phase 4 — Platform
- [ ] Multi-child profiles
- [ ] Teacher Mode
- [ ] Offline / PWA
- [ ] React Native app

---

## 💡 CONTEXT QUAN TRỌNG CHO LẦN SAU

### Về người dùng
- Bố **không biết code**, cần hướng dẫn step-by-step
- Dùng **Samsung Android** + **Windows Chrome**
- Đã có Groq API key: `gsk_cXzynZKVmkb...` (đừng lưu key thật vào đây!)
- Đã deploy thành công lên Vercel lần 1

### Về style code
- **Không dùng framework** (React, Vue...) — vanilla HTML/CSS/JS duy nhất
- Mọi thứ trong 1 file `.html`
- JS phải validate được bằng `node -e "new Function(content)"`
- Khi sửa file, luôn verify syntax sau mỗi `str_replace`

### Về design
- Tông màu chính: **Navy dark** background + **Gold** gradient
- Font: Baloo 2 (tiêu đề) + Caveat (viết tay/VI) + Nunito (body)
- Animations nhẹ nhàng, **KHÔNG shake/vibrate** (gây lo lắng bé)
- Confetti chỉ khi đúng, điểm trừ không bao giờ hiển thị
- Mọi text error phải bằng **tiếng Việt**

### Về pedagogy (không thay đổi)
- Học qua ngữ cảnh thật (TPR + Krashen)
- Song ngữ VI-EN song song (Bilingual Immersion)
- Narrative learning (từ trong câu chuyện nhớ lâu hơn)
- Luôn khuyến khích, không bao giờ phạt

---

## 📁 CẤU TRÚC FILE RECOMMEND

```
project/
├── index.html          ← App chính (production)
├── vercel.json         ← Deploy config
├── SKILL.md            ← Technical patterns
├── INSTRUCTIONS.md     ← Product vision
└── STATUS.md           ← File này (update mỗi session)
```

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
*Cập nhật mỗi khi có tính năng mới hoặc thay đổi quan trọng*
