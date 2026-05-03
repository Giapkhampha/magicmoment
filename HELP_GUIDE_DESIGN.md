# IN-APP HELP GUIDE — Design & Build Spec
> Phase 3 · Feature 2 · Magic Moment v4.2
> Mục tiêu: Hướng dẫn chi tiết ngay trong app cho ba/mẹ — không cần đọc tài liệu ngoài

---

## 1. TRIẾT LÝ THIẾT KẾ

### Đối tượng đọc
- **Chính:** Ba/mẹ (25-40 tuổi, mất gốc tiếng Anh)
- **Phụ:** Ông bà (cần đơn giản, font lớn)
- **KHÔNG phải:** Bé 3 tuổi (bé không đọc được)

### Nguyên tắc nội dung
```
✅ Tiếng Việt 100%, không jargon kỹ thuật
✅ Văn phong ấm áp, gần gũi (như Mom blog)
✅ Mỗi section có "Thử ngay" → đi thẳng vào module
✅ Có gợi ý cụ thể (vd: "lần đầu chơi nên dùng 5 phút")
✅ Mascot Bibi xuất hiện như tour guide
❌ Không liệt kê tính năng kiểu spec sheet
❌ Không dùng từ chuyên môn (TPR, Input Hypothesis)
❌ Không quá dài — ba/mẹ scan, không đọc nguyên trang
```

---

## 2. DATA STRUCTURE

### 2.1 HELP_SECTIONS Constant

Đặt trong JS, hardcoded — không gọi API.

```js
const HELP_SECTIONS = [
  {
    id: 'start',
    icon: '🚀',
    title: 'Bắt đầu nhanh',
    color: '#FFD94A',         // gold
    summary: 'Cài đặt 1 lần — chơi mãi mãi miễn phí',
    body_html: `...`,         // xem mục 3
    cta_label: null,           // không có CTA, chỉ nội dung
    cta_action: null
  },
  {
    id: 'scan',
    icon: '📸',
    title: 'Magic Scan',
    color: '#FF6B6B',         // coral
    summary: 'Chụp đồ vật trong nhà → AI dạy bé từ vựng',
    body_html: `...`,
    cta_label: 'Thử Magic Scan ngay',
    cta_action: 'go(\\'s-cam-choice\\')'  // hoặc đúng screen ID hiện tại
  },
  {
    id: 'scene',
    icon: '🖼️',
    title: 'Scene Explorer',
    color: '#4ECDC4',         // mint
    summary: 'Upload ảnh → chơi 2 trò chơi: Đố Tìm & Quiz',
    body_html: `...`,
    cta_label: 'Thử Scene Explorer',
    cta_action: 'go(\\'s-scene\\')'
  },
  {
    id: 'story',
    icon: '📖',
    title: 'StoryDuo',
    color: '#FFB347',         // amber
    summary: 'Ba kể 1 câu tiếng Việt → AI dịch + minh hoạ',
    body_html: `...`,
    cta_label: 'Kể chuyện cho bé',
    cta_action: 'go(\\'s-story\\')'
  },
  {
    id: 'theme',
    icon: '📚',
    title: 'Theme Packs',
    color: '#A855F7',         // purple
    summary: '5 chủ đề có sẵn — học mọi lúc, không cần camera',
    body_html: `...`,
    cta_label: 'Mở chủ đề',
    cta_action: 'openThemes()'
  },
  {
    id: 'rewards',
    icon: '🎯',
    title: 'Phần thưởng & Tiến độ',
    color: '#22C55E',         // green
    summary: 'Streak · Daily Quest · Sticker · Mascot Bibi',
    body_html: `...`,
    cta_label: null,
    cta_action: null
  },
  {
    id: 'dashboard',
    icon: '📊',
    title: 'Dashboard cha mẹ',
    color: '#3BA7F5',         // sky
    summary: 'Xem bé học bao nhiêu từ, chủ đề nào yêu thích',
    body_html: `...`,
    cta_label: 'Mở Dashboard',
    cta_action: 'go(\\'s-dashboard\\')'
  },
  {
    id: 'tips',
    icon: '💡',
    title: 'Mẹo chơi cùng bé',
    color: '#EF476F',         // rose
    summary: '7 nguyên tắc giúp bé tiến bộ nhanh hơn',
    body_html: `...`,
    cta_label: null,
    cta_action: null
  },
  {
    id: 'faq',
    icon: '❓',
    title: 'Hỏi đáp',
    color: '#9CA3AF',         // gray
    summary: 'Lỗi thường gặp · Mic không nhận · TTS im lặng',
    body_html: `...`,
    cta_label: null,
    cta_action: null
  }
];
```

### 2.2 localStorage Keys mới

```
mm_help_seen_v1   → 'true' nếu đã xem help rồi (auto-popup lần đầu)
```

---

## 3. NỘI DUNG TỪNG SECTION (body_html)

> Đây là phần quan trọng nhất. Claude Code KHÔNG được tự bịa — phải copy y nguyên text dưới đây.

### 3.1 Section "Bắt đầu nhanh" (`start`)

```html
<div class="help-block">
  <h4>👋 Chào ba/mẹ!</h4>
  <p>Magic Moment giúp ba/mẹ và bé học tiếng Anh <strong>cùng nhau</strong>, 
  không phải bé tự học một mình. Ba/mẹ không cần giỏi tiếng Anh — AI sẽ làm cầu nối.</p>
</div>

<div class="help-block">
  <h4>🔑 Cài đặt API Key (1 lần duy nhất)</h4>
  <p>App dùng Groq AI <strong>miễn phí</strong>. Lấy key 30 giây:</p>
  <ol>
    <li>Vào <a href="https://console.groq.com" target="_blank">console.groq.com</a> → đăng nhập Google</li>
    <li>Tab "API Keys" → "Create API Key"</li>
    <li>Copy key (bắt đầu bằng <code>gsk_...</code>)</li>
    <li>Dán vào ô "API Key" trên trang chủ Magic Moment → Lưu</li>
  </ol>
  <p class="help-tip">💡 Key chỉ lưu trên máy ba/mẹ, không gửi đi đâu. Free 14,400 lượt/ngày — quá đủ!</p>
</div>

<div class="help-block">
  <h4>🎯 Buổi học đầu tiên (5 phút)</h4>
  <ol>
    <li>Tap <strong>📚 Chủ đề</strong> → chọn "Động vật"</li>
    <li>Bé học 8 con vật với hình + phát âm</li>
    <li>Hoàn thành → bé nhận sticker đầu tiên 🎉</li>
  </ol>
  <p class="help-tip">💡 Đừng ép bé. Chơi 5 phút thấy bé hứng thì học 10 phút. Mệt thì dừng.</p>
</div>
```

### 3.2 Section "Magic Scan" (`scan`)

```html
<div class="help-block">
  <h4>📸 Magic Scan là gì?</h4>
  <p>Bất kỳ đồ vật nào trong nhà → chụp ảnh → AI nói tên tiếng Anh + dịch + đọc cho bé nghe.</p>
</div>

<div class="help-block">
  <h4>🎮 Cách chơi</h4>
  <ol>
    <li>Tap <strong>📸 Magic Scan</strong> trên trang chủ</li>
    <li>Chọn "📷 Camera" (chụp trực tiếp) hoặc "🖼️ Thư viện" (ảnh có sẵn)</li>
    <li>Hướng vào 1 đồ vật rõ nét (cái cốc, quả táo, đôi giày...)</li>
    <li>AI nhận dạng → đọc tên tiếng Anh</li>
    <li>Bé tap nút 🎤 lặp lại theo → cộng ⭐</li>
  </ol>
</div>

<div class="help-block">
  <h4>👶 Phù hợp với</h4>
  <p><strong>Bé 3-6 tuổi.</strong> Mỗi session 2-5 phút. Có thể chơi mọi lúc — trong bếp, công viên, siêu thị.</p>
</div>

<div class="help-block">
  <h4>💡 Mẹo nhỏ cho ba/mẹ</h4>
  <ul>
    <li>Chụp <strong>1 đồ vật rõ ràng</strong> — đừng chụp cả căn phòng (sai dùng Scene Explorer)</li>
    <li>Ánh sáng đủ → AI nhận dạng chính xác hơn</li>
    <li>Cho bé tự cầm điện thoại chụp → bé thấy mình "làm chủ"</li>
    <li>Sau khi học, hỏi bé bằng tiếng Việt: "Quả táo tiếng Anh là gì nhỉ?" → bé trả lời "apple"</li>
  </ul>
</div>
```

### 3.3 Section "Scene Explorer" (`scene`)

```html
<div class="help-block">
  <h4>🖼️ Scene Explorer là gì?</h4>
  <p>1 bức ảnh nhiều đồ vật (như phòng bếp, công viên) → AI đặt ghim lên từng vật → 
  chơi 2 trò chơi tương tác.</p>
</div>

<div class="help-block">
  <h4>🎮 Trò chơi 1: "Đố Tìm"</h4>
  <ol>
    <li>AI đọc 1 từ tiếng Anh (vd: "table")</li>
    <li>Bé tap đúng vị trí cái bàn trên ảnh</li>
    <li>Đúng lần đầu = +15⭐ · Lần 2 = +10⭐ · Lần 3 = +5⭐</li>
    <li>Sai 2 lần: app tự gợi ý vùng có đáp án</li>
  </ol>
</div>

<div class="help-block">
  <h4>🎮 Trò chơi 2: "Quiz Đoán Từ"</h4>
  <ol>
    <li>AI hiện 1 emoji + gợi ý tiếng Việt (vd: "Bồn rửa")</li>
    <li>Bé chọn 1 trong 4 đáp án tiếng Anh</li>
    <li>Đúng = confetti 🎉 +10⭐</li>
  </ol>
</div>

<div class="help-block">
  <h4>💡 Mẹo nhỏ</h4>
  <ul>
    <li>Bắt đầu với ảnh <strong>quen thuộc</strong>: phòng bé, sân chơi, bếp nhà mình</li>
    <li>Chơi Đố Tìm trước (dễ hơn) → Quiz sau (cần nhớ tên)</li>
    <li>Mỗi bức ảnh chơi được 5-10 phút trước khi bé chán</li>
  </ul>
</div>
```

### 3.4 Section "StoryDuo" (`story`)

```html
<div class="help-block">
  <h4>📖 StoryDuo là gì?</h4>
  <p>Ba/mẹ kể 1 câu chuyện <strong>tiếng Việt</strong>. AI dịch sang tiếng Anh + 
  vẽ minh hoạ emoji + chọn 3 từ vựng quan trọng dạy bé.</p>
</div>

<div class="help-block">
  <h4>🎮 Cách chơi</h4>
  <ol>
    <li>Tap <strong>📖 StoryDuo</strong> trên trang chủ</li>
    <li>Gõ (hoặc nói qua mic) câu chuyện tiếng Việt</li>
    <li>AI tạo trang sách: tiếng Việt + tiếng Anh + emoji + 3 từ key</li>
    <li>Tap "Lật trang" để kể tiếp câu thứ 2</li>
    <li>Hoàn thành 4-8 trang là 1 quyển sách hoàn chỉnh</li>
  </ol>
</div>

<div class="help-block">
  <h4>📚 Câu chuyện gì hay?</h4>
  <ul>
    <li><strong>Cổ tích Việt Nam:</strong> Tấm Cám, Sơn Tinh Thuỷ Tinh, Thạch Sanh</li>
    <li><strong>Chuyện hằng ngày:</strong> "Sáng nay Maya đi siêu thị với mẹ..."</li>
    <li><strong>Sáng tạo vui:</strong> "Có 1 con thỏ muốn làm TikToker..." 😄</li>
    <li><strong>Kỷ niệm gia đình:</strong> chuyến đi biển hè vừa rồi, sinh nhật bé</li>
  </ul>
</div>

<div class="help-block">
  <h4>✏️ Độ dài câu</h4>
  <p>15-80 từ tiếng Việt mỗi câu. Đừng viết câu quá dài (>100 từ) — AI dịch sẽ tóm tắt.</p>
</div>

<div class="help-block">
  <h4>💡 Mẹo nhỏ</h4>
  <ul>
    <li>Cho bé tự "kể" — bé nói gì ba gõ vào, kể cả khi sai ngữ pháp</li>
    <li>1 quyển sách hoàn chỉnh = chia thành 4-8 buổi (mỗi buổi 1 trang)</li>
    <li>Đọc đi đọc lại quyển sách cũ → bé sẽ thuộc lúc nào không hay</li>
  </ul>
</div>
```

### 3.5 Section "Theme Packs" (`theme`)

```html
<div class="help-block">
  <h4>📚 Theme Packs là gì?</h4>
  <p>5 chủ đề từ vựng có sẵn (Động vật, Màu sắc, Thức ăn, Cơ thể, Số đếm). 
  Mỗi chủ đề 8 từ. <strong>Không cần camera, không cần mạng</strong> — chơi trên giường, trên xe đều được.</p>
</div>

<div class="help-block">
  <h4>🎮 Cách chơi</h4>
  <ol>
    <li>Tap <strong>📚 Chủ đề</strong> trên trang chủ → chọn 1 pack</li>
    <li>Mỗi từ hiện 1 thẻ: emoji + tiếng Anh + IPA + tiếng Việt + câu ví dụ</li>
    <li>Tap 🔊 nghe phát âm</li>
    <li>Bé hiểu rồi → tap <strong>"✅ Đã thuộc"</strong> (+5⭐)</li>
    <li>Bé chưa rõ → tap <strong>"🤔 Chưa rõ"</strong> (gặp lại sau)</li>
    <li>Học hết 8 từ → +50⭐ bonus + nhận sticker chủ đề 🎉</li>
  </ol>
</div>

<div class="help-block">
  <h4>🔁 Ôn tập</h4>
  <p>Vào lại pack đã hoàn thành = ôn tập. Vẫn cộng ⭐ bình thường nhưng không có bonus +50 lần 2 (để công bằng với pack mới).</p>
</div>

<div class="help-block">
  <h4>💡 Mẹo nhỏ</h4>
  <ul>
    <li>Lần đầu chơi nên chọn <strong>Động vật</strong> hoặc <strong>Màu sắc</strong> — bé dễ liên tưởng nhất</li>
    <li>Không cần học 1 chủ đề trong 1 ngày — chia 2-3 ngày, mỗi ngày vài từ</li>
    <li>Sau khi học, ra ngoài thực tế ba có thể hỏi: "What color is this?" 🍎</li>
  </ul>
</div>
```

### 3.6 Section "Phần thưởng & Tiến độ" (`rewards`)

```html
<div class="help-block">
  <h4>🔥 Streak — Chuỗi ngày học liên tục</h4>
  <p>Bé chơi bất kỳ module nào trong ngày = tick streak. Cột mốc 3, 7, 14, 30, 60, 100 ngày 
  có phần thưởng đặc biệt. <strong>Không học 1 ngày = streak reset về 0.</strong></p>
  <p class="help-tip">💡 5 phút/ngày tốt hơn 30 phút/tuần. Đều đặn là chìa khoá.</p>
</div>

<div class="help-block">
  <h4>🎯 Daily Quest — 3 nhiệm vụ mỗi ngày</h4>
  <ul>
    <li>Mỗi ngày 0h reset 3 nhiệm vụ (vd: "scan 3 đồ vật", "chơi 1 game", "kể 1 trang chuyện")</li>
    <li>Hoàn thành cả 3 = bonus <strong>+50⭐</strong></li>
    <li>Bỏ lỡ 1 ngày = không sao, mai có quest mới</li>
  </ul>
</div>

<div class="help-block">
  <h4>🏆 Sticker Album — 30 sticker × 5 chủ đề</h4>
  <p>Mỗi 5-10 từ học được = mở 1 sticker ngẫu nhiên. <strong>20% sticker hiếm</strong> (rare).
  Hoàn thành Theme Pack = nhận sticker theme tương ứng.</p>
  <p class="help-tip">💡 Bé sẽ "săn" sticker — đây là động lực chơi tiếp tự nhiên nhất.</p>
</div>

<div class="help-block">
  <h4>🐰 Mascot Bibi — Bạn đồng hành</h4>
  <p>Thỏ trắng Bibi xuất hiện trong app, có 6 cảm xúc: vui, suy nghĩ, ăn mừng, ngủ, vẫy tay, bình thường.
  Bibi phản ứng theo việc bé làm — đúng = vui, hoàn thành = ăn mừng.</p>
</div>
```

### 3.7 Section "Dashboard cha mẹ" (`dashboard`)

```html
<div class="help-block">
  <h4>📊 Dashboard có gì?</h4>
  <ul>
    <li><strong>Biểu đồ 7 ngày qua:</strong> bé học bao nhiêu ⭐ mỗi ngày</li>
    <li><strong>Top chủ đề:</strong> bé thích chủ đề nào nhất</li>
    <li><strong>Sticker tiến độ:</strong> đã mở bao nhiêu / 30</li>
    <li><strong>Từ đã học:</strong> tổng số từ + danh sách review</li>
    <li><strong>Stats tổng:</strong> tổng ngày học, streak best, tổng ⭐</li>
  </ul>
</div>

<div class="help-block">
  <h4>📥 Khi nào xem?</h4>
  <p>Mỗi tuần 1 lần là đủ. <strong>Không nên xem mỗi ngày</strong> — sẽ tạo áp lực cho ba/mẹ và bé.</p>
</div>

<div class="help-block">
  <h4>🎁 Chia sẻ với ông bà</h4>
  <p>Tap nút <strong>"Chia sẻ thành tích"</strong> → tạo card đẹp 1080×1920 → 
  gửi qua Zalo cho ông bà xem cháu giỏi.</p>
</div>
```

### 3.8 Section "Mẹo chơi cùng bé" (`tips`)

```html
<div class="help-block">
  <h4>💡 7 nguyên tắc vàng</h4>
  <ol>
    <li><strong>Chơi cùng, không bắt bé tự chơi.</strong> Ba/mẹ ngồi cạnh, hỏi đáp, vui cười.</li>
    <li><strong>Khen nhiều — không chỉnh sai.</strong> Bé đọc "ah-pô" thay "apple" cũng cứ khen "Giỏi!". Nói lại đúng cho bé nghe, không bắt bé sửa.</li>
    <li><strong>5-15 phút/ngày là vừa.</strong> Đừng bắt bé học 30 phút liền — não 3 tuổi chưa chịu nổi.</li>
    <li><strong>Kết nối với đời thực.</strong> Sau khi học "apple" → đi chợ chỉ vào quả táo: "Look! An apple!"</li>
    <li><strong>Lặp lại — đừng vội học từ mới.</strong> Bé cần nghe 1 từ 50+ lần mới nhớ.</li>
    <li><strong>Để bé chán là dừng.</strong> Bé bắt đầu xao nhãng = đóng app ngay. Ép bé sẽ ghét app.</li>
    <li><strong>Bibi và sticker quan trọng hơn điểm số.</strong> Đừng so sánh ⭐ với bé khác.</li>
  </ol>
</div>

<div class="help-block">
  <h4>📅 Lịch học gợi ý</h4>
  <table class="help-table">
    <tr><th>Thời gian</th><th>Hoạt động</th></tr>
    <tr><td>Sáng</td><td>1 từ Theme Pack lúc đánh răng</td></tr>
    <tr><td>Trưa</td><td>Magic Scan đồ ăn → "rice", "milk"</td></tr>
    <tr><td>Tối</td><td>StoryDuo trước khi ngủ (1 trang)</td></tr>
  </table>
  <p class="help-tip">💡 Không cần đủ cả 3. 1 hoạt động/ngày là đã thành công rồi!</p>
</div>

<div class="help-block">
  <h4>🚫 Tránh những điều này</h4>
  <ul>
    <li>So sánh: "Con bạn A đã thuộc 100 từ, sao con mới 30?"</li>
    <li>Ép học khi bé mệt, đói, buồn ngủ</li>
    <li>Dạy ngữ pháp (bé 3-6 tuổi không cần)</li>
    <li>Bắt bé viết — chỉ cần nghe và nói thôi</li>
  </ul>
</div>
```

### 3.9 Section "Hỏi đáp" (`faq`)

```html
<div class="help-block">
  <h4>❓ Bé chưa biết tiếng Việt rành, có dùng được không?</h4>
  <p>Được. App song ngữ, nhưng nếu bé chỉ biết tiếng Việt cơ bản → bắt đầu Theme Packs trước (có emoji minh hoạ).</p>
</div>

<div class="help-block">
  <h4>❓ Mic không nhận giọng bé?</h4>
  <p>Bé 3 tuổi phát âm chưa rõ — bình thường. Nếu mic không hoạt động hẳn:</p>
  <ul>
    <li>Dùng Chrome (Firefox không hỗ trợ tốt)</li>
    <li>Cấp quyền micro khi browser hỏi</li>
    <li>Vẫn không được? Tap "Đã thuộc" thay vì mic — vẫn cộng điểm</li>
  </ul>
</div>

<div class="help-block">
  <h4>❓ TTS (đọc tiếng Anh) im lặng?</h4>
  <ul>
    <li>Tăng âm lượng máy lên</li>
    <li>iOS: tap màn hình 1 lần trước (Safari yêu cầu user gesture)</li>
    <li>Reload trang nếu vẫn không có tiếng</li>
  </ul>
</div>

<div class="help-block">
  <h4>❓ Có bị mất dữ liệu khi xoá app/đổi máy?</h4>
  <p>Có. Dữ liệu lưu trên trình duyệt máy này. Đổi máy = bắt đầu lại. <em>Sẽ thêm tính năng đồng bộ trong bản kế tiếp.</em></p>
</div>

<div class="help-block">
  <h4>❓ App có an toàn cho bé không?</h4>
  <ul>
    <li>Không thu thập dữ liệu cá nhân</li>
    <li>Ảnh chụp chỉ gửi AI để nhận dạng, không lưu server</li>
    <li>Không có quảng cáo, không có in-app purchase trẻ em</li>
    <li>Không kết nối social media, không chat người lạ</li>
  </ul>
</div>

<div class="help-block">
  <h4>❓ Sau Theme Packs có thêm gì không?</h4>
  <p>Có. Roadmap kế tiếp: Story Library (50+ chuyện mẫu), Family Challenge (ba con thi đua), 
  PenPal Planet (kết nối bé với bé quốc tế).</p>
</div>
```

---

## 4. UX FLOW

### 4.1 Trigger mở Help Screen

**3 cách mở:**

```
1. AUTO (lần đầu): mm_onboarded chưa set → vào app → auto open s-help
2. MANUAL: home screen có icon "❓" góc trên phải → tap → s-help
3. SUGGESTED: dashboard có nút "💡 Xem hướng dẫn" → s-help
```

### 4.2 Layout `s-help`

```
┌─────────────────────────────┐
│ ←  📖 Hướng dẫn             │ ← topbar
├─────────────────────────────┤
│                             │
│   🐰 Chào ba/mẹ!            │ ← Bibi banner
│   "Bibi sẽ hướng dẫn        │
│    ba/mẹ chơi cùng bé"      │
│                             │
├─────────────────────────────┤
│ ▸ 🚀 Bắt đầu nhanh          │ ← accordion item
│   Cài đặt 1 lần — chơi mãi  │
├─────────────────────────────┤
│ ▾ 📸 Magic Scan       [mở]  │ ← đang mở
│   Chụp đồ vật → AI dạy bé   │
│   ┌─────────────────────┐   │
│   │ <body_html>         │   │
│   │ ...nội dung chi tiết│   │
│   │ [Thử Magic Scan▶]   │   │ ← CTA button
│   └─────────────────────┘   │
├─────────────────────────────┤
│ ▸ 🖼️ Scene Explorer        │
├─────────────────────────────┤
│ ▸ 📖 StoryDuo               │
├─────────────────────────────┤
│ ▸ 📚 Theme Packs            │
├─────────────────────────────┤
│ ▸ 🎯 Phần thưởng & Tiến độ  │
├─────────────────────────────┤
│ ▸ 📊 Dashboard cha mẹ       │
├─────────────────────────────┤
│ ▸ 💡 Mẹo chơi cùng bé       │
├─────────────────────────────┤
│ ▸ ❓ Hỏi đáp                │
└─────────────────────────────┘
```

### 4.3 Accordion behavior

- Default: **tất cả collapsed** trừ section "Bắt đầu nhanh" (mở sẵn cho user mới)
- Tap item: toggle expand/collapse
- Chỉ **1 section mở tại 1 thời điểm** (mở section khác → đóng section trước)
- Animation: slide down 200ms, ease-out
- Header có border-left 4px màu của section
- Body bg slightly lighter để phân biệt

### 4.4 CTA Button "Thử ngay"

- Trong section có `cta_action` → render button cuối body
- Style: full-width, gradient theo `color` của section, font Baloo 2 700
- Tap → execute `cta_action` (eval) → navigate đến screen tương ứng
- Bonus: setItem('mm_help_seen_v1', 'true') trước khi navigate

### 4.5 Tile Help trên Home

Thêm icon nhỏ "❓" góc trên phải của topbar home (cạnh score):

```
┌──────────────────────────┐
│ Magic Moment   ❓  ⭐ 120 │
└──────────────────────────┘
```

Tap → `go('s-help')`. KHÔNG thêm tile lớn vào grid 2x2 (không phá layout).

---

## 5. HTML SKELETON

```html
<!-- Help Screen -->
<div id="s-help" class="screen hidden">
  <div class="topbar">
    <button class="btn-back" onclick="exitHelp()">←</button>
    <h2>📖 Hướng dẫn</h2>
    <span style="width:40px"></span>
  </div>
  
  <div class="help-bibi-banner">
    <div class="bibi-mini" id="help-bibi"></div>
    <div class="bibi-quote">
      <p><strong>Chào ba/mẹ!</strong></p>
      <p>Bibi sẽ hướng dẫn ba/mẹ chơi cùng bé. Tap vào từng mục để xem chi tiết.</p>
    </div>
  </div>
  
  <div class="help-accordion" id="help-accordion">
    <!-- Auto-rendered từ HELP_SECTIONS -->
  </div>
  
  <div class="help-footer">
    <p>Magic Moment v4.2 · Made with ❤️ for Maya</p>
  </div>
</div>
```

### Render function

```js
function renderHelp() {
  const wrap = document.getElementById('help-accordion');
  wrap.innerHTML = HELP_SECTIONS.map((s, i) => `
    <div class="help-item" data-id="${s.id}">
      <button class="help-header" onclick="toggleHelp('${s.id}')" 
              style="border-left-color:${s.color}">
        <span class="help-icon">${s.icon}</span>
        <span class="help-title-wrap">
          <span class="help-title">${s.title}</span>
          <span class="help-summary">${s.summary}</span>
        </span>
        <span class="help-chevron" id="chev-${s.id}">▸</span>
      </button>
      <div class="help-body" id="body-${s.id}" style="display:none;">
        ${s.body_html}
        ${s.cta_label ? `
          <button class="help-cta" 
                  style="background:linear-gradient(135deg,${s.color},${s.color}cc)"
                  onclick="${s.cta_action}; markHelpSeen();">
            ${s.cta_label} ▶
          </button>` : ''}
      </div>
    </div>
  `).join('');
  
  // Mở sẵn section "start"
  toggleHelp('start');
}

function toggleHelp(id) {
  // Đóng tất cả
  HELP_SECTIONS.forEach(s => {
    document.getElementById(`body-${s.id}`).style.display = 'none';
    document.getElementById(`chev-${s.id}`).textContent = '▸';
  });
  // Mở section được chọn (nếu chưa mở)
  const target = document.getElementById(`body-${id}`);
  if (target.style.display === 'none') {
    target.style.display = 'block';
    document.getElementById(`chev-${id}`).textContent = '▾';
  }
}

function markHelpSeen() {
  localStorage.setItem('mm_help_seen_v1', 'true');
}

function exitHelp() {
  markHelpSeen();
  go('s-home');
}

// Auto trigger lần đầu
function checkHelpAutoOpen() {
  if (!localStorage.getItem('mm_help_seen_v1') && 
      !localStorage.getItem('mm_onboarded')) {
    setTimeout(() => go('s-help'), 800);  // delay để loading screen tắt trước
  }
}
```

---

## 6. CSS NEW STYLES

```css
/* Bibi banner */
.help-bibi-banner {
  display: flex; gap: 12px; align-items: center;
  background: linear-gradient(135deg, #FFD94A22, #4ECDC422);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px; margin: 16px;
}
.bibi-mini { width: 56px; height: 56px; flex-shrink: 0; }
.bibi-quote p { margin: 4px 0; font-size: 0.9rem; line-height: 1.4; }

/* Accordion */
.help-accordion { padding: 0 16px 16px; }
.help-item {
  margin-bottom: 8px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.help-header {
  width: 100%; display: flex; align-items: center; gap: 12px;
  padding: 14px 14px 14px 12px;
  background: transparent; border: none;
  border-left: 4px solid; /* color set inline */
  cursor: pointer; text-align: left;
  color: white; font-family: 'Nunito', sans-serif;
}
.help-icon { font-size: 1.6rem; flex-shrink: 0; }
.help-title-wrap { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.help-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1rem; }
.help-summary { font-size: 0.78rem; opacity: 0.6; }
.help-chevron { font-size: 1.2rem; opacity: 0.5; }

/* Body */
.help-body {
  padding: 4px 16px 16px;
  font-family: 'Nunito', sans-serif;
  font-size: 0.92rem; line-height: 1.6;
  color: rgba(255,255,255,0.85);
}
.help-block { margin-bottom: 16px; }
.help-block h4 { font-family: 'Baloo 2', sans-serif; margin: 8px 0; color: white; }
.help-block p, .help-block li { font-size: 0.9rem; }
.help-block ol, .help-block ul { padding-left: 22px; }
.help-block code { 
  background: rgba(255,255,255,0.1); padding: 2px 6px; 
  border-radius: 4px; font-size: 0.85em;
}
.help-block a { color: var(--gold); }
.help-tip {
  background: rgba(255,217,74,0.12);
  border-left: 3px solid var(--gold);
  padding: 8px 12px; border-radius: 8px;
  font-size: 0.85rem;
}
.help-table { width: 100%; border-collapse: collapse; margin: 8px 0; }
.help-table th, .help-table td { 
  padding: 6px 10px; border-bottom: 1px solid var(--border); 
  text-align: left; font-size: 0.85rem;
}
.help-table th { background: rgba(255,255,255,0.05); font-weight: 700; }

/* CTA */
.help-cta {
  width: 100%; padding: 12px;
  border: none; border-radius: 12px;
  font-family: 'Baloo 2', sans-serif; font-weight: 700;
  font-size: 1rem; color: white;
  cursor: pointer; margin-top: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.help-cta:active { transform: translateY(1px); }

/* Help icon trên home */
.btn-help-home {
  background: rgba(255,255,255,0.1);
  border: 1px solid var(--border);
  color: white; font-size: 1rem;
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

/* Footer */
.help-footer {
  text-align: center; padding: 24px 16px;
  font-size: 0.75rem; opacity: 0.4;
}
```

---

## 7. PROMPT CHO CLAUDE CODE

```
Tôi đang phát triển app Magic Moment (web học tiếng Anh cho trẻ 3-6 tuổi).
Hiện tại đã có v4.1 với Theme Packs. Đọc STATUS.md và SKILL.md trong project trước.

NHIỆM VỤ: Build feature "In-App Help Guide" (Phase 3, feature 2) vào file index.html.

ĐÂY LÀ FILE HELP_GUIDE_DESIGN.md đính kèm — chứa toàn bộ:
- Data structure (HELP_SECTIONS với 9 sections)
- Nội dung tiếng Việt đầy đủ cho từng section (body_html)
- UX flow (accordion, CTA buttons)
- HTML/CSS skeleton

QUAN TRỌNG: Nội dung text trong design doc đã được biên tập kỹ. 
KHÔNG được tự bịa hoặc rút gọn — copy y nguyên text vào body_html.

YÊU CẦU CỤ THỂ:
1. THÊM constant HELP_SECTIONS (9 sections) vào script — copy nguyên từ design doc.
2. THÊM 1 screen mới s-help (HTML skeleton có sẵn).
3. THÊM nút "❓" góc trên phải topbar trang home — tap vào go('s-help').
4. THÊM CSS cho accordion, bibi banner, cta button (CSS đầy đủ trong design doc).
5. THÊM logic JS:
   - renderHelp() — auto-render từ HELP_SECTIONS
   - toggleHelp(id) — accordion với chỉ 1 section mở tại 1 thời điểm
   - markHelpSeen() — set localStorage flag
   - exitHelp() — về home + mark seen
   - checkHelpAutoOpen() — gọi sau loading screen, auto mở help nếu user mới
6. BIBI mini SVG trong banner — dùng state 'wave' của Bibi có sẵn (kích thước 56x56).
7. CTA action mapping — kiểm tra screen ID đúng:
   - 'scan' → go('s-cam-choice') hoặc đúng screen Magic Scan hiện tại
   - 'scene' → go('s-scene') hoặc tương ứng
   - 'story' → go('s-story') hoặc tương ứng
   - 'theme' → openThemes() (đã có từ Phase 3 feature 1)
   - 'dashboard' → go('s-dashboard') hoặc tương ứng
   Nếu screen ID khác trong code thì map đúng — đừng giữ nguyên dummy ID trong design doc.

RÀNG BUỘC:
- KHÔNG phá vỡ feature cũ. Test lại tất cả: Magic Scan, Scene, StoryDuo, Theme Packs.
- KHÔNG dùng external CSS/JS. Single-file HTML.
- Validate JS sau khi sửa: 
  node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"
- Mọi text user-facing: tiếng Việt y nguyên design doc.
- Mobile-first, max-width 480px.

ACCEPTANCE TEST:
1. User mới (xoá localStorage) → vào app → loading xong → auto mở s-help, section "Bắt đầu nhanh" mở sẵn.
2. Home screen có icon "❓" góc trên phải → tap → mở s-help.
3. Accordion: tap section khác → section trước đóng, section mới mở.
4. CTA "Thử Magic Scan ngay" → đi đúng vào màn Magic Scan, không lỗi.
5. CTA "Mở chủ đề" → openThemes() chạy, vào s-themes thấy 5 packs.
6. Reload sau khi đã xem help → KHÔNG auto open (mm_help_seen_v1 = true).
7. Nội dung tiếng Việt hiển thị đúng — không bị mất ký tự, emoji.
8. Trên mobile (375px): scroll mượt, accordion không vỡ layout.

Bắt đầu bằng việc đọc index.html hiện có, xác nhận screen IDs hiện tại của 4 module
(Scan, Scene, Story, Theme), rồi mới sửa.

Output: file index.html duy nhất đã update.
```

---

## 8. SAU KHI SHIP — UPDATE STATUS.md

```
#### Phase 3 — Feature 2 (v4.2)
- **In-App Help Guide** — 9 sections accordion với Bibi tour guide
- Auto-popup lần đầu cho user mới
- Icon ❓ trên home screen → mở help bất kỳ lúc nào
- CTA "Thử ngay" trong từng section → đi thẳng vào module
- localStorage key mới: mm_help_seen_v1
```

---

## 9. ƯỚC TÍNH

| Hạng mục | Effort |
|----------|--------|
| Copy data HELP_SECTIONS (9 sections) | 30 phút |
| HTML screen + accordion render | 1h |
| CSS styles | 1-1.5h |
| JS logic (toggle, auto-open, CTA) | 1h |
| Test trên mobile + desktop | 1h |
| **Tổng** | **~4-5h** với Claude Code |

---

*Document version 1.0 — 29/04/2026*
*Spec đủ chi tiết để Claude Code build trong 1 session.*
