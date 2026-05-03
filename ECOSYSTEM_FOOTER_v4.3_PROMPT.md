# ECOSYSTEM FOOTER v4.3 — Final Prompt
> Magic Moment · Connect to Giáp Khám Phá ecosystem
> Ready to paste into Claude Code

---

## 📋 PROMPT (paste vào Claude Code)

```
Tôi muốn thêm "Ecosystem Footer" vào Magic Moment v4.2 → v4.3.
Đây là feature kết nối Magic Moment với hệ sinh thái Giáp Khám Phá của tôi.

CONTEXT:
Magic Moment là 1 sản phẩm trong ecosystem của Ba Maya:
- Hub chính: giapkhamphame.vercel.app (sẽ là giapkhampha.me khi mua tên miền)
- Maya Journey: maya-journey.vercel.app (nhật ký học hỏi của Maya 3 tuổi)
- Magic Moment: app hiện tại (học tiếng Anh)

Cần thêm phần footer ở home screen để dẫn user tới các phần khác trong ecosystem.

NHIỆM VỤ:
Thêm 1 section "Ecosystem Footer" vào CUỐI home screen (sau version badge v4.2),
với 3 elements:

1. Brand signature line (clickable):
   "🌸 Made with ❤️ by Ba Maya · giapkhampha.me"
   → Link tới: https://giapkhamphame.vercel.app
   → target="_blank" rel="noopener"

2. Heading nhỏ:
   "Khám phá thêm trong hệ sinh thái:"

3. Hai card link side-by-side (stack vertical trên mobile):
   
   Card A — Giáp Khám Phá:
   - Icon: 🌐
   - Title: "Giáp Khám Phá"
   - Subtitle: "Sản phẩm AI · Sách hay · Tài nguyên"
   - Link: https://giapkhamphame.vercel.app (target="_blank" rel="noopener")
   - Gradient: linear-gradient(135deg, #4ECDC4, #A855F7)
   
   Card B — Maya Journey:
   - Icon: 📔
   - Title: "Ba & Maya Journey"
   - Subtitle: "Nhật ký 90 ngày học cùng con"
   - Link: https://maya-journey.vercel.app (target="_blank" rel="noopener")
   - Gradient: linear-gradient(135deg, #FFB347, #EF476F)

YÊU CẦU CSS:

.eco-footer {
  margin-top: 24px;
  padding: 20px 16px 24px;
  border-top: 1px solid var(--border);
}

.eco-brand {
  display: block;
  text-align: center;
  color: rgba(255,255,255,0.5);
  font: 600 0.78rem 'Nunito', sans-serif;
  margin-bottom: 16px;
  text-decoration: none;
  transition: color 0.2s;
}
.eco-brand:hover { color: var(--gold); }

.eco-heading {
  text-align: center;
  font: 700 0.78rem 'Nunito', sans-serif;
  opacity: 0.5;
  margin-bottom: 12px;
  color: white;
}

.eco-cards {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.eco-card {
  flex: 1;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  transition: transform 0.12s, border-color 0.2s;
  text-decoration: none;
  color: white;
  position: relative;
  overflow: hidden;
}
.eco-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}
.eco-card.eco-a::before { background: linear-gradient(90deg, #4ECDC4, #A855F7); }
.eco-card.eco-b::before { background: linear-gradient(90deg, #FFB347, #EF476F); }

.eco-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255,255,255,0.25);
}
.eco-card:active { transform: scale(0.97); }

.eco-card .eco-icon {
  font-size: 1.7rem;
  flex-shrink: 0;
}

.eco-card .eco-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.eco-card .eco-title {
  font: 700 0.92rem 'Baloo 2', cursive;
  color: white;
}

.eco-card .eco-sub {
  font: 500 0.7rem 'Nunito', sans-serif;
  opacity: 0.6;
  line-height: 1.3;
}

/* Mobile: stack vertical */
@media (max-width: 400px) {
  .eco-cards { flex-direction: column; }
  .eco-card { min-width: 100%; }
}

HTML STRUCTURE:

Thêm NGAY SAU dòng version badge hiện tại trong s-home:
<div style="text-align:center;padding:8px 0 16px;font:600 0.65rem 'Nunito',sans-serif;color:rgba(255,255,255,0.15)">v4.2 · Magic Moment ✨</div>

↓ thêm phần này ↓

<div class="eco-footer">
  <a href="https://giapkhamphame.vercel.app" target="_blank" rel="noopener" class="eco-brand">
    🌸 Made with ❤️ by Ba Maya · giapkhampha.me
  </a>
  
  <div class="eco-heading">Khám phá thêm trong hệ sinh thái:</div>
  
  <div class="eco-cards">
    <a href="https://giapkhamphame.vercel.app" target="_blank" rel="noopener" class="eco-card eco-a">
      <span class="eco-icon">🌐</span>
      <div class="eco-text">
        <span class="eco-title">Giáp Khám Phá</span>
        <span class="eco-sub">Sản phẩm AI · Sách hay · Tài nguyên</span>
      </div>
    </a>
    
    <a href="https://maya-journey.vercel.app" target="_blank" rel="noopener" class="eco-card eco-b">
      <span class="eco-icon">📔</span>
      <div class="eco-text">
        <span class="eco-title">Ba & Maya Journey</span>
        <span class="eco-sub">Nhật ký 90 ngày học cùng con</span>
      </div>
    </a>
  </div>
</div>

VERSION UPDATE:
Sửa v4.2 → v4.3 trong dòng version badge:
"v4.2 · Magic Moment ✨" → "v4.3 · Magic Moment ✨"

RÀNG BUỘC:
- Eco-footer CHỈ hiển thị ở s-home, KHÔNG xuất hiện ở screen khác
- KHÔNG phá layout hiện tại
- Validate JS sau khi sửa: 
  node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\\s\\S]*)<\\/script>/)[1])"
- Test trên mobile width 375px
- Mọi text user-facing: tiếng Việt
- Không thêm tracking/analytics
- Sử dụng <a href> tag thật (không dùng JS onclick) — semantic HTML

ACCEPTANCE TEST:
1. Vào home → cuộn xuống dưới cùng → thấy eco-footer dưới version badge
2. Tap brand line "🌸 Made with ❤️..." → mở giapkhamphame.vercel.app tab mới
3. Tap card "Giáp Khám Phá" → mở giapkhamphame.vercel.app tab mới
4. Tap card "Ba & Maya Journey" → mở maya-journey.vercel.app tab mới
5. Mobile 375px: 2 cards stack vertical, không tràn
6. Desktop ≥400px: 2 cards side-by-side
7. Border-top 1px tách rõ với version badge phía trên
8. Hover card: lift up 2px, border sáng hơn
9. Layout home không bị ảnh hưởng (Magic Scan/Scene/Story/Theme vẫn hoạt động)
10. Click vào eco-footer KHÔNG navigate trong app (mở tab mới)

Output: file index.html đã update.
```

---

## 🎯 EXPECTED RESULT

Sau khi build xong, footer home sẽ trông như này:

```
┌────────────────────────────┐
│  (existing module grid)    │
│  📸 Scan   🖼️ Scene        │
│  📖 Story  📚 Theme        │
├────────────────────────────┤
│  (footer buttons)          │
│  📖 🎟️ 📊 ❓ ⚙️             │
├────────────────────────────┤
│       v4.3 · Magic Moment ✨│
├────────────────────────────┤  ← border-top
│                            │
│   🌸 Made with ❤️ by       │
│   Ba Maya · giapkhampha.me │
│                            │
│  Khám phá thêm trong       │
│  hệ sinh thái:             │
│                            │
│  ┌─────────┐  ┌─────────┐ │
│  │ 🌐      │  │ 📔      │ │
│  │ Giáp    │  │ Ba & Maya│ │
│  │ Khám Phá│  │ Journey  │ │
│  └─────────┘  └─────────┘ │
└────────────────────────────┘
```

---

## ✅ ACCEPTANCE TEST QUICK LIST

Sau khi Claude Code xong, ba test 5 cái này:

1. **Visual:** Eco-footer có hiện ở cuối home không? ✓
2. **Brand line:** Tap vào → mở tab mới đúng URL? ✓
3. **2 cards:** Tap mỗi card → mở đúng URL trong tab mới? ✓
4. **Mobile:** Mở DevTools 375px → cards stack vertical? ✓
5. **Other screens:** Vào s-cam, s-scene... → KHÔNG thấy eco-footer? ✓

Pass hết → push v4.3 lên Vercel!

---

## 🚀 SAU KHI SHIP v4.3

**Update STATUS.md:**

```
#### v4.3 — Ecosystem Footer
- Connect Magic Moment với Giáp Khám Phá ecosystem
- Brand signature: "Made by Ba Maya"
- 2 link cards:
  • giapkhamphame.vercel.app (hub chính)
  • maya-journey.vercel.app (nhật ký Maya)
- Chỉ hiển thị ở s-home, không spam screen khác
```

---

## 💭 GHI CHÚ CHO TƯƠNG LAI

Phần "subtle ecosystem hints" ở nơi khác trong app (Help Guide footer link, Story Library link, empty states...) — như ba nói, để **phát triển sau** khi observe Maya & ba dùng v4.3.

Nguyên tắc khi mở rộng:
- **Đừng spam:** Eco-footer ở home là đủ cho lần đầu
- **Contextual:** Chỉ thêm hint khi phù hợp ngữ cảnh (vd: empty state)
- **Subtle:** Link nhỏ, không lấn át content chính
- **Track impact:** Quan sát người dùng có click không trước khi thêm chỗ tiếp theo

---

*Ready to ship — paste prompt vào Claude Code và chờ kết quả 🚀*
