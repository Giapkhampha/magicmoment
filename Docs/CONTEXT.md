# CONTEXT.md — Bối cảnh & Hệ sinh thái

> **File này ít thay đổi.** Chứa thông tin nền tảng về người làm, ecosystem, branding.
> Khi có thay đổi cấu trúc lớn (mua domain mới, thêm sản phẩm, đổi brand) mới cập nhật.

---

## 👨‍👧 Người làm — Ba Maya

### Profile
- **Tên:** Nguyễn Quý
- **Bí danh trong ecosystem:** Ba Maya
- **Vai trò:** Solo founder / content creator / educator
- **Con gái:** Maya, 3 tuổi (sinh ~2023)
- **Vợ:** Chưa rõ thông tin (đang xem xét tham gia ecosystem)
- **Background:** Mất gốc tiếng Anh, không phải developer chuyên nghiệp, đang học và build cùng AI

### Cách Ba Maya làm việc với AI
- **Style:** Hỏi kỹ trước khi quyết, verify cẩn thận từng bước, không tin AI mù quáng
- **Mức tech:** Non-tech / cận tech — biết cơ bản (terminal, git, deploy Vercel) nhưng cần hướng dẫn chi tiết cho việc nâng cao
- **Thiết bị:** Samsung Android + Windows Chrome
- **Phong cách giao tiếp:** Tiếng Việt, ngắn gọn, prefer được giải thích rõ "tại sao" không chỉ "làm thế nào"

### Triết lý sản phẩm của Ba Maya
- **"Ba/mẹ là người chơi cùng, không phải giáo viên"** — AI làm cầu nối
- **Privacy-first** — ưu tiên xử lý client-side, không gửi data nhạy cảm về server
- **Không vội** — sẵn sàng dừng để fix lỗ hổng trước khi launch
- **Bền vững** — chọn stack đơn giản (vanilla JS) để maintain dễ
- **Family-centered** — sản phẩm phải có yếu tố gia đình đồng hành

---

## 🌐 Hệ sinh thái Giáp Khám Phá

### Cấu trúc domain

```
giapkhampha.me                  ← Apex domain (hub chính)
├── giapkhampha.me              → Giáp Khám Phá hub
├── pdf.giapkhampha.me          → PDF Việt
├── magicmoment.giapkhampha.me  → Magic Moment ⭐ (project này)
└── (các subdomain tương lai khác)

Ngoài ra có:
└── maya-journey.vercel.app     → Ba & Maya Journey (chưa migrate domain)
```

### Hạ tầng
- **Domain registrar:** Tenten.vn (1 năm $9, gia hạn 02/05/2027)
- **DNS:** Cloudflare Free tier (đã active)
- **Hosting:** Vercel (Free tier cho mỗi project)
- **Email:** Cloudflare Email Routing — `lienhe@giapkhampha.me` → Gmail Ba Maya
- **SSL:** Vercel auto Let's Encrypt cho mỗi domain
- **Cache strategy:** Cloudflare DNS only (proxy XÁM, không CAM) — vì SSL Vercel handle, tránh xung đột

### Vai trò mỗi sản phẩm

| Sản phẩm | Mục tiêu | User chính |
|----------|----------|------------|
| **Giáp Khám Phá hub** | Hub trung tâm, sách hay, tài nguyên giáo dục, profile các nhà giáo dục | Ba/mẹ Việt 25-40 tuổi |
| **Magic Moment** | Học tiếng Anh AI cho bé 3-6t, ba đồng hành | Ba/mẹ + bé 3-6 tuổi |
| **PDF Việt** | Công cụ PDF privacy-first 100% client-side | Ba/mẹ + giáo viên + học sinh |
| **Ba & Maya Journey** | Nhật ký 90 ngày học cùng Maya, content marketing | Ba/mẹ quan tâm parenting |

### Nguyên tắc ecosystem

1. **Mỗi sản phẩm focus một mục tiêu** — không ôm đồm
2. **Cross-link nhẹ nhàng** qua Eco Footer ở mỗi app
3. **Brand thống nhất** — domain `giapkhampha.me` xuất hiện ở footer mọi sản phẩm
4. **Khi sản phẩm A cần feature thuộc sản phẩm B → link sang B** thay vì copy

---

## 🎨 Brand & Design

### Brand voice
- **Ấm áp, gần gũi** — như Mom blog, không corporate
- **Tiếng Việt 100%** cho user-facing
- **Tone gia đình** — dùng "ba", "bé", "mình" thay vì "user", "khách hàng"
- **Tích cực** — mọi action có điểm dương, không phạt, không shame

### Magic Moment design tokens

```css
:root {
  /* Primary palette */
  --gold: #FFD94A;        /* Brand chính, score, CTA primary */
  --coral: #FF6B6B;       /* Magic Scan, năng lượng */
  --mint: #4ECDC4;        /* Scene Explorer, học tập */
  --purple: #A855F7;      /* Theme Packs, khám phá */
  --amber: #FFB347;       /* StoryDuo, ấm áp */
  --rose: #EF476F;        /* Story warm, kỷ niệm */
  
  /* Semantic colors */
  --green: #22C55E;       /* Correct, success */
  --sky: #3BA7F5;         /* Info, dashboard */
  
  /* Background */
  --navy: #0F0A2E;        /* App background dark */
  --paper: #FFF8EC;       /* StoryDuo paper */
  --brown: #2D1B0E;       /* StoryDuo text */
  
  /* UI surface */
  --card: rgba(255,255,255,.07);
  --border: rgba(255,255,255,.12);
}
```

### Typography (Magic Moment)
- **Baloo 2** — Tiêu đề, key words tiếng Anh, score (tròn, vui, dễ đọc cho bé)
- **Caveat** — Chữ viết tay tiếng Việt, storytelling (gần gũi)
- **Nunito** — Body text, buttons (clean, dễ đọc)

### Bibi mascot
- Thỏ trắng SVG inline (96 lines)
- 6 states: idle, happy, thinking, celebrate, sleeping, wave
- Xuất hiện trong app: home, help guide banner, key milestones

---

## 🎯 Đối tượng & Insight

### User chính: Ba (parent)
- **Tuổi:** 25-40
- **Pain point:** Mất gốc tiếng Anh hoặc tiếng Anh yếu, không tự tin dạy con
- **Mong muốn:** Học cùng con, có công cụ AI hỗ trợ, không tốn nhiều thời gian
- **Thiết bị:** Smartphone (Android/iPhone) + occasional laptop
- **Use case:** 5-15 phút/buổi, trên giường trước ngủ / đi xe / lúc rảnh

### User phụ: Bé (child)
- **Tuổi:** 3-6 (vàng ngôn ngữ)
- **Đặc tính:** Chưa biết đọc, học qua hình + âm thanh + game
- **Attention span:** 5-10 phút mỗi session
- **Cần:** Visual phong phú, audio rõ, tương tác cao, phản hồi tích cực

### Insight quan trọng
- Bé học từ nhanh nhưng quên cũng nhanh → cần spaced repetition
- Bé thích "săn" sticker, leveling up → gamification nhẹ là động lực tốt
- Ba/mẹ ngại dạy nhưng thích "chơi cùng" → app phải có yếu tố parent-child
- Ông bà cũng muốn tham gia → app phải đơn giản đủ cho ông bà

---

## 🚫 Điều KHÔNG làm

### Về sản phẩm Magic Moment
- Không dạy chữ viết (bé 3-6 chưa cần)
- Không dạy grammar rules
- Không có điểm phạt — chỉ điểm cộng
- Không nội dung đáng sợ (ma, quái vật, bạo lực)
- Không quảng cáo / in-app purchase trẻ em
- Không thu thập dữ liệu cá nhân của bé

### Về kỹ thuật
- Không dùng framework (React/Vue/Angular)
- Không external CDN cho core (chỉ Groq API)
- Không lưu data nhạy cảm (key user, API keys của Ba) lên server
- Không hardcode sensitive strings vào code (dùng env vars)

### Về ecosystem
- Không cross-promote bằng popup gây khó chịu
- Không thu user data ngầm
- Không spam email user

---

## 📞 Liên hệ & Channels

- **Email chính:** lienhe@giapkhampha.me
- **GitHub:** github.com/Giapkhampha
- **Domain registrar:** Tenten.vn (account giap1993)
- **DNS provider:** Cloudflare (account dùng Gmail Ba Maya)
- **Hosting:** Vercel (account dùng Gmail Ba Maya)

---

## 📜 Lịch sử ngắn

- **Q1 2026:** Bắt đầu xây Magic Moment v1-v3 (MVP)
- **04/2026:** Hoàn thành v4.0-v4.4 (Theme Packs, Help Guide, PWA, Ecosystem Footer)
- **05/2026:** Setup ecosystem domain, migrate sang `magicmoment.giapkhampha.me`
- **Tương lai:** Backend Proxy (v4.5), Word Jar Spaced Repetition, Theme Packs Level 2

---

*File version 1.0 — 04/05/2026*
*Cập nhật khi có thay đổi lớn về Ba Maya / ecosystem / brand*
