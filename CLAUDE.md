# CLAUDE.md — Magic Moment Project Entry Point

> **Đây là file đầu tiên Claude/Claude Code đọc khi bắt đầu phiên làm việc mới.**
> Mục đích: Giúp AI onboard trong 60 giây — biết project là gì, đọc gì tiếp theo, làm việc thế nào.

---

## 🎯 Magic Moment là gì?

Web app học tiếng Anh cho trẻ 3-6 tuổi, ba/mẹ đồng hành cùng bé qua AI.

- **Người dùng chính:** Ba (Nguyễn Quý / Ba Maya) + con gái Maya 3 tuổi
- **Triết lý:** "Ba/mẹ là người chơi cùng, không phải giáo viên" — AI làm cầu nối
- **Stack:** Single-file HTML/CSS/JS · Groq API · Vercel hosting · Cloudflare DNS
- **Live:** https://magicmoment.giapkhampha.me
- **Repo:** github.com/Giapkhampha/magicmoment
- **Version hiện tại:** v4.4.2 (xem STATUS.md để biết version mới nhất)

---

## 📚 Đọc theo thứ tự này

Khi bắt đầu phiên mới, AI nên đọc files theo priority:

1. **CLAUDE.md** (file này) — overview 60s
2. **docs/CONTEXT.md** — Ba Maya là ai, hệ sinh thái Giáp Khám Phá, branding
3. **docs/STATUS.md** — Đang ở đâu, vừa làm gì, đang vướng gì (file SỐNG, update mỗi sprint)
4. **docs/ROADMAP.md** — Kế hoạch tiếp theo theo phase
5. **docs/CONVENTIONS.md** — Code style, design tokens, patterns kỹ thuật
6. **docs/SKILL.md** (nếu có) — Technical patterns cũ, code snippets

> **Quy tắc:** Nếu user hỏi việc gì cụ thể → đọc STATUS.md trước để biết context hiện tại, rồi đọc các file khác theo nhu cầu.

---

## 🌐 Hệ sinh thái Giáp Khám Phá

Magic Moment là **1 trong nhiều sản phẩm** trong ecosystem của Ba Maya:

```
giapkhampha.me               → Hub Giáp Khám Phá (apex)
├── pdf.giapkhampha.me       → PDF Việt (tools PDF privacy-first)
├── magicmoment.giapkhampha.me → Magic Moment (app này)
└── maya-journey.vercel.app  → Ba & Maya Journey (nhật ký Maya)
```

→ Magic Moment **focus vào học tiếng Anh AI**, KHÔNG ôm đồm sách hay/phương pháp giáo dục/community (đã có ở hub Giáp Khám Phá).

---

## ⚙️ Quy tắc làm việc với code

### Stack & ràng buộc kỹ thuật
- **Single-file HTML** — toàn bộ app trong 1 file `index.html`
- **Vanilla JS** — KHÔNG framework (React/Vue/...)
- **KHÔNG external assets** — chỉ Groq API
- **Validate JS bắt buộc sau mỗi sửa:**
  ```bash
  node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"
  ```
- **Mọi text user-facing: tiếng Việt** (error messages, labels, UI)
- **Mobile-first**, max-width 480px

### Workflow git/deploy
- **Local branch:** `master`
- **Remote production branch:** `main` (Vercel watch branch này)
- **Push command:** `git push origin master:main --force-with-lease`
- **Vercel auto-deploy** khi push lên `main`
- **Test bắt buộc:** localhost trước (`python -m http.server 8080`), KHÔNG mở từ `file://`

### Quy tắc khi sửa code
1. **Đọc STATUS.md** để biết version + state hiện tại
2. **Đọc CONVENTIONS.md** để follow patterns đã chốt
3. **Search trước khi sửa** — `grep` rộng để bắt hardcoded strings (URL, tokens, etc.)
4. **Validate JS** sau mỗi edit
5. **Update STATUS.md** sau khi feature xong
6. **Commit message rõ ràng:** `feat:`, `fix:`, `chore:`, `docs:`

---

## 🚨 Anti-patterns (không làm)

- ❌ Đừng tự bịa thông tin về Ba Maya / Maya — đọc CONTEXT.md
- ❌ Đừng tự thêm framework (React/Vue) — vi phạm stack
- ❌ Đừng dùng external CDN cho assets — vi phạm privacy/offline
- ❌ Đừng push lên `origin master` thuần — Vercel sẽ không deploy production
- ❌ Đừng sửa AUDIT.md cũ (nếu có) — archive thay vì xóa
- ❌ Đừng skip validate JS — bug syntax hay xảy ra với str_replace

---

## 💡 Khi gặp request mơ hồ

Hỏi user 1 trong 4 câu này trước khi làm:

1. "Ba muốn làm sprint nào tiếp theo trong ROADMAP, hay có request khác?"
2. "Đây là feature mới hay fix bug?"
3. "Ba muốn tôi đọc file nào trước để có context đúng?"
4. "Có sẵn lòng test trên localhost trước khi push không?"

---

## 🆘 Khi stuck

1. Đọc lại `docs/STATUS.md` — có thể đang miss context gì đó
2. Đọc `docs/CONVENTIONS.md` — có thể có pattern đã chốt
3. Hỏi user: "Tôi cần thêm thông tin về [X] để tiếp tục — ba có thể cho biết...?"
4. **Đừng bịa** — thà hỏi 1 câu còn hơn làm sai phải undo

---

*File version 1.0 — 04/05/2026*
*Cập nhật khi có thay đổi lớn về stack/workflow*
