# ROADMAP.md — Kế hoạch phát triển Magic Moment

> **Mục đích:** Định hướng các sprint tiếp theo, không phải checklist cứng nhắc.
> **Cập nhật:** Khi observation Maya/user thay đổi priority, hoặc sau khi ship feature.

---

## 🧭 Triết lý roadmap

1. **Observe trước khi build** — Cho Maya & ba dùng vài tuần trước khi quyết feature mới
2. **Magic Moment FOCUS** vào học tiếng Anh AI — KHÔNG ôm đồm sách hay/community (đã có ở hub Giáp Khám Phá)
3. **Ecosystem first** — Mọi feature mới nghĩ đến tích hợp với Maya Journey + Giáp Khám Phá hub
4. **Không hardcode tương lai xa** — Chỉ plan chi tiết 1-2 sprint kế tiếp, sau đó là parking lot

---

## ✅ DONE (xem STATUS.md cho chi tiết)

### Phase 1 — MVP
- [x] Magic Scan (v1.x)
- [x] Scene Explorer (v1.x)
- [x] StoryDuo (v1.x)

### Phase 2 — Engagement Loop
- [x] Streak Calendar (v3.x)
- [x] Daily Quest (v3.x)
- [x] Mascot Bibi (v3.x)
- [x] Sticker Album (v3.x)
- [x] Share Card (v3.x)
- [x] Parent Dashboard (v3.x)

### Phase 3 — Curriculum + Onboarding + Ecosystem
- [x] Theme Packs Level 1 (v4.1)
- [x] In-App Help Guide (v4.2)
- [x] Ecosystem Footer (v4.3)
- [x] PWA Installable (v4.4)
- [x] Hotfix mm_hist quota (v4.4.1)
- [x] Domain migration giapkhampha.me (v4.4.2)

---

## 🎯 Phase 4 — Frictionless + Retention (Next)

### Sprint 4.1 — Backend Proxy v4.5 ⭐⭐⭐ (priority cao nhất)

**Vấn đề cần giải:** User mới phải tự lấy Groq API key → friction → nhiều người bỏ.

**Giải pháp:**
- Vercel Serverless Function `/api/groq.js`
- Key pool: 1 Super Groq ($20/mo) + 4 Free keys → 14,000 req/ngày Vision
- Round-robin với cooldown khi key fail
- Rate limit per IP: 30/min, 100/giờ
- Power user mode: Settings toggle "Dùng key cá nhân" (preserve UX cũ)
- Status badge: "💛 Server Ba Maya" hoặc "🔑 Key cá nhân"

**Effort:** ~5h Claude Code + 1.5h Ba chuẩn bị keys
**Capacity sau khi ship:** ~1,100 user/ngày
**Files mới:** `/api/groq.js`
**Vercel env:** `GROQ_KEYS` (comma-separated)

**Spec đầy đủ:** Có sẵn trong file `BACKEND_PROXY_v4.5_PLAN.md` (output từ phiên trước)

---

### Sprint 4.2 — Word Jar / Spaced Repetition ⭐⭐⭐

**Vấn đề:** Bé học từ rồi quên rất nhanh → cần cơ chế ôn lại đúng thời điểm.

**Giải pháp:**
- Tile mới "🫙 Word Jar" trên home
- Algorithm SM-2 simplified: từ học cách đây 3, 7, 14, 30 ngày → cần ôn
- Mỗi ngày tap → 5 từ ngẫu nhiên cần ôn
- Mỗi từ: hiển thị emoji + EN → bé tự nói tiếng Việt → tap reveal
- Đúng → cộng score, push lùi schedule
- Quên → reset schedule về 3 ngày

**Effort:** ~4h Claude Code
**Files cần đụng:** `index.html` only (logic + UI mới)
**localStorage mới:** `mm_jar` = `[{english, vi, lastReview, nextReview, easeFactor}]`

---

### Sprint 4.3 — Theme Packs Level 2 ⭐⭐⭐

**Vấn đề:** Maya hết 5 packs Level 1 → cần content mới ngay.

**Giải pháp:**
- 6 packs mới hardcoded: Home, Nature, Actions, Feelings, Family, Clothes
- 8 từ × 6 = 48 từ Level 2
- UI giống Level 1, chỉ thêm data
- Tile "📚 Chủ đề" hiển thị 11 packs (5 + 6) chia thành 2 sections: "Cấp 1 — Khởi đầu", "Cấp 2 — Khám phá"

**Effort:** ~3h Claude Code (data + UI tabs)
**Files đụng:** `index.html` only

---

## 🔮 Phase 5 — Khi có user thật (signal-based)

**Trigger:** Khi có 50+ active users hoặc nhận feedback rõ ràng từ Ba/giáo viên.

| Trigger từ user | Build feature |
|-----------------|---------------|
| Bé hết Theme Pack Level 2 | Theme Packs Level 3 (4 packs: School/Transport/Clothes/Seasons) |
| Mẹ/ông bà ghen tị muốn tham gia | Multi-Profile (2-3 profile chung 1 device) |
| Ba muốn theo dõi từ điện thoại khác | Cloud Sync (Supabase free tier) |
| StoryDuo thành hit | Story Sharing (link chia sẻ sách cho ông bà) |
| Mic phát hiện nhiều bé phát âm sai | Pronunciation Premium (phoneme analysis) |
| Many user hỏi "có app không?" | React Native wrapper |

---

## 🌐 Hướng dài hạn (Parking lot)

### Ecosystem Integration
- **Cross-app integration**: Magic Moment ↔ Maya Journey (post nhật ký từ vựng học)
- **Shared Word Bank**: Từ vựng học ở Magic Moment hiện trong bài viết Giáp Khám Phá
- **SSO ecosystem**: 1 account dùng cả 3 app (cần backend)

### Content Depth
- **Story Library** (giảm priority — đã có sách hay ở hub)
- **Mini Songs** (5 bài hát thiếu nhi tiếng Anh)
- **Printable Book** (xuất StoryDuo thành PDF)

### Platform
- **Native App (React Native)** wrapper iOS/Android
- **Offline mode hoàn chỉnh** với pre-cached AI responses
- **Tablet UI** (iPad-first cho học cùng cả nhà)

### Engagement nâng cao
- **Family Challenge** — Ba & Mẹ thi đua điểm tuần
- **PenPal Planet** — Kết nối bé với bé quốc tế (cần moderation)
- **AI Conversation Mode** — Voice chat với nhân vật AI (thỏ Bibi, mèo, etc.)

---

## ❌ Đã loại / Giảm priority

Sau insight ecosystem (04/2026):

| Feature | Trạng thái | Lý do |
|---------|-----------|-------|
| Story Library 50 chuyện | ⬇️ Giảm | Sách hay đã có ở Giáp Khám Phá hub |
| Onboarding Video | ❌ Loại | Có thể làm content trên Giáp Khám Phá |
| Community feature | ❌ Loại | Hub đóng vai trò community |
| PenPal Planet | ⬇️ Giảm | Phức tạp, cần backend, không phải core value |
| Printable Book | ⬇️ Giảm | Nice-to-have, không tăng learning |

---

## 🤔 Quy trình quyết định feature mới

Trước khi thêm feature vào Phase 4/5, AI/Ba Maya cần trả lời:

1. **Vấn đề thực tế nào** feature này giải quyết? (Maya/user feedback cụ thể?)
2. **Có thể làm bằng tool ecosystem khác** không? (Hub, Maya Journey, PDF Việt)
3. **Effort vs Impact** — feature này tăng retention/learning bao nhiêu?
4. **Có tăng tải Groq API** không? (Nếu có → cần update capacity plan)
5. **Có break privacy** không? (Magic Moment commitment: không thu data bé)

Nếu 5 câu trên không có câu trả lời rõ → **không build, để parking lot**.

---

## 📅 Cadence release dự kiến

- **Patch (vX.X.Y):** Hotfix bug, không feature mới — release ngay khi cần
- **Minor (vX.Y.0):** Feature mới đáng kể — 1-2 tuần/lần
- **Major (vX.0.0):** Thay đổi kiến trúc lớn — 2-3 tháng/lần

---

## 🎯 Định hướng sản phẩm (vision dài hạn)

**1 năm tới (đến 04/2027):**
- Magic Moment có 200+ từ vựng curated (Level 1-3)
- Backend Proxy stable, capacity 5,000 user/ngày
- 100+ user thật, đa số là parent Việt Nam
- Maya Journey + Magic Moment integration đẹp
- Có 1-2 KOL parent share sản phẩm tự nhiên

**2 năm tới (đến 04/2028):**
- Native app iOS/Android (React Native wrapper)
- Premium tier với feature advanced (10k+/mo subscriber)
- Brand Ba Maya / Giáp Khám Phá thành ecosystem giáo dục độc lập
- Magic Moment được trường mẫu giáo Việt dùng làm extra-curricular

---

*File version 1.0 — 04/05/2026*
*Update khi observation thay đổi priority hoặc ship sprint xong*
