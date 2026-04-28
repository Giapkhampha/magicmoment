# INSTRUCTIONS: Xây dựng App Học Tiếng Anh Cho Trẻ Em
## "Zero to Hero" — Ba & Con Đồng Hành

> Tài liệu này định hướng toàn bộ sản phẩm: từ triết lý giáo dục,
> thiết kế UX/UI, đến lộ trình tính năng cụ thể.

---

## PHẦN 1: TẦM NHÌN SẢN PHẨM

### Vấn đề cần giải quyết
1. **Ba/mẹ mất gốc tiếng Anh** không tự tin dạy con
2. **Trẻ 3-6 tuổi** — giai đoạn vàng tiếp thu ngôn ngữ — nhưng thiếu công cụ phù hợp
3. **App thị trường** (Duolingo Kids, Lingokids) đắt tiền, không có yếu tố **gia đình đồng hành**
4. **Học vẹt** không hiệu quả — trẻ cần học qua ngữ cảnh thật và cảm xúc

### Triết lý cốt lõi
> **"Ba/mẹ là người chơi cùng, không phải giáo viên"**

- Ba/mẹ mất gốc tiếng Anh → AI làm cầu nối, không phải rào cản
- Học qua đồ vật thật trong nhà → Input Hypothesis (Krashen)
- Gamification nhẹ nhàng → không áp lực, không điểm phạt
- Mỗi buổi học = khoảnh khắc kết nối gia đình

### Đối tượng người dùng
| Người dùng | Mô tả | Pain point |
|-----------|-------|-----------|
| **Ba/mẹ** (25-40 tuổi) | Mất gốc hoặc tiếng Anh yếu | Không tự tin dạy con |
| **Bé** (3-6 tuổi) | Giai đoạn vàng ngôn ngữ | Cần học qua hình ảnh, âm thanh, trò chơi |
| **Ông bà** | Muốn tham gia cùng cháu | Cần app đơn giản, không cần kỹ thuật |

---

## PHẦN 2: PHƯƠNG PHÁP GIÁO DỤC

### Các phương pháp tiên tiến tích hợp

#### 1. Total Physical Response (TPR)
- Bé nghe → nhìn vật thật → nói ngay
- Áp dụng: Scan đồ vật trong nhà, nhận dạng ngay lập tức

#### 2. Input Hypothesis — Stephen Krashen
- Ngôn ngữ thấm qua **ngữ cảnh thật**, không qua bảng chữ cái
- Áp dụng: Học từ qua ảnh chụp thực tế, không qua flashcard

#### 3. Bilingual Immersion Model
- Não bé 3 tuổi xây **song song 2 kho từ vựng** — đây là giai đoạn DUY NHẤT
- Áp dụng: StoryDuo — tiếng Việt và tiếng Anh song song trên cùng trang

#### 4. Narrative-based Learning
- Từ gắn với **câu chuyện** được nhớ lâu hơn 70% (Stanford)
- Áp dụng: StoryDuo — từ vựng xuất hiện trong ngữ cảnh câu chuyện

#### 5. Spaced Repetition
- Lặp lại từ vựng đúng thời điểm → ghi nhớ lâu dài
- Áp dụng: Lịch sử từ đã học, gợi ý ôn tập

#### 6. Peer Learning Effect
- Trẻ học từ bạn đồng trang lứa nhanh hơn 40%
- Áp dụng (tương lai): PenPal Planet — kết nối bé với bé quốc tế

#### 7. Communicative Language Teaching (CLT)
- Học ngôn ngữ hiệu quả nhất khi có **mục đích giao tiếp thật**
- Áp dụng (tương lai): Voice chat với AI character

### Nguyên tắc thiết kế nội dung
```
✅ Từ đơn giản, 1-2 âm tiết (apple, dog, table)
✅ Câu ngắn, max 10 từ cho bé 3 tuổi
✅ Emoji hỗ trợ visual memory
✅ IPA phonetic cho ba/mẹ tham khảo
✅ Từ tiếng Việt đi kèm (bilingual)
✅ 3 từ vựng/trang (không quá tải)
❌ Không grammar rules cho trẻ dưới 6 tuổi
❌ Không học chữ viết — chỉ nói và nghe
❌ Không điểm phạt — chỉ có điểm cộng
```

---

## PHẦN 3: CÁC MODULE ĐÃ XÂY DỰNG

### Module 1: 📸 Magic Scan
**Mục tiêu học tập:** Từ vựng đồ vật hàng ngày
**Cách dùng:**
1. Ba/mẹ hướng camera vào bất kỳ đồ vật nào
2. AI nhận dạng → đọc tên tiếng Anh + emoji + câu ví dụ
3. Bé nghe → lặp lại vào mic → nhận điểm

**Phương pháp:** TPR + Input Hypothesis
**Thời gian học:** 2-5 phút/session
**Tần suất:** Có thể chơi mọi lúc mọi nơi

---

### Module 2: 🖼️ Scene Explorer + Games
**Mục tiêu học tập:** Nhóm từ vựng theo chủ đề (phòng bếp, phòng ngủ...)
**Cách dùng:**
1. Upload bức hình có nhiều đồ vật
2. AI đặt ghim lên từng đồ vật
3. Chơi 2 game: "Đố Tìm" và "Quiz Đoán Từ"

**Game Đố Tìm:**
- AI đọc tên → Bé tap vào hình đúng vị trí
- Gợi ý sau 2 lần sai
- Điểm: 15→10→5 tùy số lần thử

**Quiz Đoán Từ:**
- Thấy emoji + gợi ý tiếng Việt → Chọn 1/4 đáp án
- Confetti khi đúng, reveal đáp án khi sai

**Phương pháp:** Visual Learning + Gamification
**Thời gian:** 5-10 phút/bức hình

---

### Module 3: 📖 StoryDuo
**Mục tiêu học tập:** Vocabulary trong ngữ cảnh câu chuyện + bilingual immersion
**Cách dùng:**
1. Ba/mẹ kể 1 câu tiếng Việt (nói hoặc gõ)
2. AI dịch đầy đủ sang tiếng Anh + vẽ emoji scene
3. Highlight 3 từ vựng chính (3 màu)
4. Cả hai nghe phát âm → lật sách xem lại

**Phương pháp:** Narrative Learning + Bilingual Immersion
**Nội dung phù hợp:** Câu chuyện cổ tích, chuyện hàng ngày, sáng tạo
**Thời gian:** 10-20 phút/câu chuyện (4-8 trang)

---

## PHẦN 4: LỘ TRÌNH TÍNH NĂNG (Roadmap)

### Giai đoạn 1 — MVP ✅ (ĐÃ XONG)
- [x] Magic Scan (nhận dạng đồ vật)
- [x] Scene Explorer + Đố Tìm + Quiz
- [x] StoryDuo (kể chuyện song ngữ)
- [x] Tích hợp 3 module vào 1 app
- [x] Deploy Vercel

### Giai đoạn 2 — Growth (Ưu tiên cao)
- [ ] **Streak & Calendar** — Chuỗi ngày học liên tục, thành tích
- [ ] **Word Jar** — Bình "từ đã học" hàng tuần, ôn tập Spaced Repetition
- [ ] **Theme Packs** — Gói chủ đề (động vật, màu sắc, số đếm, thức ăn)
- [ ] **Share Card** — Tạo card chia sẻ TikTok/Reels "Hôm nay bé học được..."
- [ ] **Progress Report** — Báo cáo tuần cho phụ huynh

### Giai đoạn 3 — Engagement (Viral)
- [ ] **PenPal Planet** — Kết nối bé với bé quốc tế qua voice message
- [ ] **Challenge Mode** — Ba con cùng thử thách: 10 từ trong 5 phút
- [ ] **Story Library** — Thư viện câu chuyện mẫu (50+ câu chuyện)
- [ ] **Printable Book** — In sách tranh StoryDuo ra giấy
- [ ] **AI Conversation** — Chat voice với nhân vật AI (thỏ, mèo...)

### Giai đoạn 4 — Platform
- [ ] **Multi-child Profile** — Nhiều bé trong 1 tài khoản
- [ ] **Teacher Mode** — Giáo viên tạo bài học cho cả lớp
- [ ] **Offline Mode** — Service Worker, học không cần internet
- [ ] **Native App** — React Native cho iOS/Android
- [ ] **Community** — Phụ huynh chia sẻ câu chuyện, hình ảnh

---

## PHẦN 5: UX/UI GUIDELINES

### Màu sắc theo trạng thái
```
🏠 Home screen     → Navy dark background + Gold gradient logo
📸 Scan mode       → Coral/Gold (năng lượng, hành động)
🖼️ Scene/Game      → Mint/Purple (khám phá, học tập)
📖 StoryDuo        → Amber/Rose/Warm (ấm áp, gia đình)
✅ Correct answer  → Green + Confetti
❌ Wrong answer    → Coral nhẹ (không phạt, chỉ gợi ý)
⭐ Score/Points    → Gold (thành tích)
```

### Typography Rules
```
Tiêu đề chính      → Baloo 2 800, gradient text
Từ tiếng Anh key   → Baloo 2 800, ALL CAPS, màu Gold
Tiếng Việt story   → Caveat 700 (viết tay, gần gũi)
Body text          → Nunito 700 (dễ đọc)
Phonetic IPA       → Nunito italic, opacity 0.4
```

### Sizing cho trẻ em
```
Nút bấm tối thiểu  → 44px height (touch target)
Emoji illustration → Tối thiểu 3rem
Từ tiếng Anh       → Tối thiểu 2rem
Font body          → Tối thiểu 0.85rem
Khoảng cách nút    → Gap tối thiểu 8px
```

### Animation Guidelines
```
Bounce In          → Dùng cho logo, icon chính (ăn mừng)
Pulse              → Dùng cho CTA button (thu hút bấm)
Float              → Dùng cho emoji scene (nhẹ nhàng)
Confetti           → CHỈ khi bé trả lời đúng
Scale Up           → Pop-in cho result card
NO:                → Shake/vibrate (gây lo lắng cho bé)
```

---

## PHẦN 6: NỘI DUNG & CURRICULUM

### Vocabulary Progression (Zero → Hero)

**Cấp độ 1 — Starter (3-4 tuổi)**
```
Colors:   red, blue, green, yellow, white, black
Animals:  cat, dog, fish, bird, rabbit, elephant
Body:     eye, ear, nose, mouth, hand, foot
Food:     apple, banana, rice, water, milk, egg
Numbers:  one, two, three, four, five
```

**Cấp độ 2 — Explorer (4-5 tuổi)**
```
Home:     table, chair, bed, door, window, kitchen
Nature:   sun, moon, tree, flower, rain, cloud
Actions:  run, jump, eat, sleep, play, read
Feelings: happy, sad, angry, scared, excited
Family:   mama, papa, sister, brother, baby
```

**Cấp độ 3 — Adventurer (5-6 tuổi)**
```
School:   book, pen, teacher, friend, school bus
Transport: car, bus, plane, boat, bicycle
Clothes:  shirt, pants, shoes, hat, dress
Seasons:  spring, summer, autumn, winter
```

### StoryDuo Content Guidelines
```
✅ Câu chuyện phù hợp:
   - Chuyện cổ tích Việt Nam (Tấm Cám, Sơn Tinh Thủy Tinh)
   - Chuyện hàng ngày (đi chợ, nấu cơm, đi học)
   - Chuyện sáng tạo vui (thỏ muốn làm TikToker 😄)
   - Kỷ niệm gia đình (chuyến đi biển, sinh nhật bé)

✅ Độ dài câu lý tưởng:
   - 1 câu = 1 trang
   - 15-80 từ tiếng Việt/câu
   - Mỗi câu chuyện: 4-8 trang

❌ Tránh:
   - Nội dung đáng sợ (ma, quái vật hung dữ)
   - Câu quá dài (>100 từ) — khó dịch đầy đủ
   - Ngôn ngữ tiêu cực/xấu
```

---

## PHẦN 7: TECHNICAL STANDARDS

### Performance Targets
```
First load time    < 3s (single HTML file, no bundle)
API response       < 5s (Vision), < 3s (Chat)
Image upload       < 400KB sau compress
Emoji scene        Instant (0ms loading!)
localStorage       Max 5MB total
```

### Browser Support
```
✅ Chrome 90+      (full features: camera, mic, speech)
✅ Edge 90+        (full features)
✅ Safari 15+      (camera + basic speech)
⚠️ Firefox         (no SpeechRecognition — fallback textarea)
⚠️ Samsung Internet (file input only, no webcam getUserMedia)
```

### Accessibility
```
Nút bấm            min 44x44px touch target
Màu sắc            Contrast ratio > 4.5:1
Font size          min 14px body text
Error messages     Tiếng Việt (không phải English error codes)
Loading states     Luôn có spinner + text mô tả
```

### Data Privacy
```
API Key            Lưu localStorage trên máy người dùng, KHÔNG gửi server
Ảnh chụp          Chỉ gửi Groq API, KHÔNG lưu server
LocalStorage       Chỉ lưu: key, scores, word history, stories
GDPR               Không thu thập dữ liệu cá nhân
```

---

## PHẦN 8: VIRAL & GROWTH STRATEGY

### Hook Points (Nơi tạo ra nội dung viral tự nhiên)
```
1. Magic Scan:
   "Con gái 3 tuổi tôi vừa học 10 từ vựng trong bếp trong 5 phút!"
   → App tạo sẵn video summary tuần có avatar bé

2. StoryDuo:
   "Ba tôi kể chuyện, AI vẽ thành sách tranh tiếng Anh cho con!"
   → Share story book → "Gửi cho ông bà" = organic growth

3. Score milestone:
   "Ba & con đã học 100 từ tiếng Anh cùng nhau! 🎉"
   → Shareable achievement card
```

### Hashtags chiến lược
```
#MagicMomentEnglish
#DạyConHọcTiếngAnh
#BaConHọcCùngNhau
#StoryDuo
#HọcTiếngAnhChoTrẻEm
```

### Referral Mechanics
```
PenPal Planet:  1 gia đình mời 3 gia đình → network effect
Story Share:    "Gửi sách cho ông bà" → spread to new users
Challenge:      "Thách bạn bè học 10 từ/ngày trong 7 ngày"
```

---

## PHẦN 9: MONETIZATION (Tương lai)

### Model: Freemium
```
FREE (mãi mãi):
├── Magic Scan: không giới hạn
├── Scene Explorer: 3 hình/ngày
├── StoryDuo: 1 câu chuyện (5 trang)
└── Word History: 50 từ

PREMIUM (99k/tháng):
├── Tất cả tính năng không giới hạn
├── Theme Packs chủ đề
├── Printable Story Book
├── Progress Report PDF
└── Priority AI (nhanh hơn)

FAMILY (149k/tháng):
├── Premium + 3 profile trẻ em
└── Grandparent sharing mode
```

---

## PHẦN 10: PROMPT LIBRARY

### Các prompt mẫu đã test và hoạt động tốt

```javascript
// 1. OBJECT DETECTION (nhanh, chính xác)
const PROMPT_SCAN = `English teacher for Vietnamese kids 3-6 years old. Identify the MAIN object.
Reply ONLY valid JSON, no markdown:
{"english":"apple","phonetic":"/ˈæpəl/","vietnamese":"Quả táo","emoji":"🍎","sentence":"This is an apple! Apples are yummy!"}`;

// 2. SCENE ANALYSIS (6-8 objects với tọa độ)
const PROMPT_SCENE = `List 6 objects visible in this image for a Vietnamese child aged 3-6.
Return ONLY this JSON (no other text, no markdown):
{"scene_vi":"Phòng bếp","objects":[{"english":"sink","phonetic":"/sɪŋk/","vietnamese":"Bồn rửa","emoji":"🚿","x":20,"y":60,"color_hint":"màu trắng"}]}
x,y = integer percentages of object center.`;

// 3. STORY TRANSLATION (dịch đầy đủ, không tóm tắt)
const PROMPT_STORY = (viText, isLong) => `Translate Vietnamese story text to English.
Return ONLY valid JSON, no markdown. Vietnamese: "${viText}"
{"english":"[full faithful translation, keep ALL details and humor]",
"key_words":[{"en":"w1","vi":"v1","phonetic":"/p1/"},{"en":"w2","vi":"v2","phonetic":"/p2/"},{"en":"w3","vi":"v3","phonetic":"/p3/"}],
"scene_emojis":["🐰","🌲","🌸","☀️"],"bg_from":"#2D5A27","bg_to":"#4A8C3F"}`;

// 4. THEME PACK GENERATION
const PROMPT_THEME = (theme) => `Create 10 English vocabulary words for Vietnamese kids aged 3-6 about "${theme}".
Return ONLY valid JSON:
{"theme_vi":"Động vật","words":[{"english":"cat","phonetic":"/kæt/","vietnamese":"Con mèo","emoji":"🐱","fun_fact":"Cats say meow!"},...]}`; 

// 5. CONVERSATION AI CHARACTER
const PROMPT_CHAT = (character, childAge, context) => 
`You are ${character}, a friendly AI companion for a ${childAge}-year-old Vietnamese child.
Speak simple English (max 8 words per sentence). Always be encouraging.
Current context: ${context}
Reply in JSON: {"english":"[response]","vietnamese":"[translation]","follow_up_question":"[simple question to continue conversation]"}`;
```

---

## CHECKLIST TRƯỚC KHI LAUNCH

### Technical
- [ ] JS syntax check: `node -e "new Function(scriptContent)"`
- [ ] Test trên Chrome desktop + Android Chrome + iOS Safari
- [ ] CORS test: chạy từ localhost/Vercel, KHÔNG từ file://
- [ ] API error handling: 401, 429, timeout, JSON parse fail
- [ ] localStorage limit: không lưu >5MB ảnh
- [ ] Mobile viewport: `<meta name="viewport" content="width=device-width">`

### Content
- [ ] Tất cả text tiếng Việt (error messages, labels, placeholders)
- [ ] Từ vựng phù hợp lứa tuổi (3-6 tuổi)
- [ ] Không có nội dung đáng sợ/tiêu cực
- [ ] Phát âm đã được kiểm tra (IPA chính xác)

### UX
- [ ] Loading state cho mọi action async
- [ ] Fallback text input khi mic không dùng được
- [ ] Back button ở mọi màn hình
- [ ] Score hiển thị luôn luôn (motivation)
- [ ] Confetti khi trả lời đúng ✅

### Deployment
- [ ] vercel.json đã có
- [ ] GitHub repo public hoặc private với Vercel access
- [ ] Custom domain (nếu có)
- [ ] Test URL trên điện thoại thật

---

*Tài liệu này sẽ được cập nhật liên tục theo từng sprint phát triển.*
*Version 1.0 — Được tạo từ dự án Magic Moment + StoryDuo*
