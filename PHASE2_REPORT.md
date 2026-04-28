# PHASE 2 REPORT — Magic Moment
## Engagement Loop + Family & Sharing — Spec & Roadmap

> **Phiên bản:** 1.0 | **Ngày:** 28/04/2026
> **Đối tượng đọc:** Ba (Product Owner) + Claude (sessions tiếp theo)
> **Tiêu chí ưu tiên:** Dễ làm + Tác động viral + Bé yêu thích
> **Định dạng:** GitHub-flavored Markdown — đọc trực tiếp trên repo

---

## 📑 MỤC LỤC

1. [Tóm tắt Executive](#1-tóm-tắt-executive)
2. [Priority Matrix — Thứ tự build](#2-priority-matrix)
3. [Engagement Loop — 4 features](#3-engagement-loop)
4. [Family & Sharing — 4 features](#4-family--sharing)
5. [Roadmap 4 tuần](#5-roadmap-4-tuần)
6. [Cost Estimate](#6-cost-estimate)
7. [Technical Appendix](#7-technical-appendix)

---

## 1. TÓM TẮT EXECUTIVE

### Mục tiêu Phase 2
Biến Magic Moment từ "công cụ học một lần" thành **thói quen hằng ngày** của gia đình + tạo **kênh tăng trưởng tự nhiên** qua sharing.

### Hai trụ cột
| Trụ cột | Mục tiêu metric | Feature chính |
|---------|-----------------|---------------|
| 🔥 **Engagement Loop** | DAU/WAU > 60% | Streak, Mascot Bibi, Quest, Sticker |
| 👨‍👧 **Family & Sharing** | K-factor > 1.0 | Dashboard, Share Card, PDF Book, Family Challenge |

### Triết lý không đổi
- ❌ KHÔNG punish (mất streak vẫn động viên, không hiện "0 days")
- ❌ KHÔNG ép buộc (notification phải dễ thương, không spam)
- ✅ Ba & con vẫn là trung tâm — mascot Bibi là **bạn thứ 3** đồng hành
- ✅ Mọi share card đều có ba+con, không chỉ con

---

## 2. PRIORITY MATRIX

### Cách chấm điểm
Mỗi feature được chấm trên 3 trục (1-3 điểm/trục, tổng max 9):
- **Easy** = Dễ code (3 = vài giờ, 1 = vài ngày)
- **Viral** = Tác động lan truyền
- **Love** = Bé yêu thích, tăng retention

### Bảng xếp hạng

| # | Feature | Easy | Viral | Love | **Tổng** | Sprint |
|---|---------|------|-------|------|----------|--------|
| 🥇 | **Streak Calendar** | 3 | 1 | 3 | **7** | Tuần 1 |
| 🥈 | **Share Card** | 2 | 3 | 2 | **7** | Tuần 2 |
| 🥉 | **Mascot Bibi** | 2 | 2 | 3 | **7** | Tuần 1-2 |
| 4 | **Sticker Album** | 2 | 2 | 3 | **7** | Tuần 3 |
| 5 | **Daily Quest** | 3 | 1 | 2 | **6** | Tuần 1 |
| 6 | **Family Challenge** | 2 | 2 | 3 | **7** | Tuần 4 |
| 7 | **Story Book PDF** | 2 | 2 | 1 | **5** | Tuần 4 |
| 8 | **Parent Dashboard** | 2 | 1 | 1 | **4** | Tuần 3 |

### Quan sát chiến lược
- **Streak + Mascot Bibi** đi đôi với nhau — cả hai dùng chung 1 component UI
- **Share Card** nên launch sau khi có Mascot — share card mới đẹp
- **Parent Dashboard** ưu tiên thấp nhất nhưng vẫn cần — Ba check nhanh tiến độ con

---

## 3. ENGAGEMENT LOOP

### 🔥 Feature 3.1 — Streak Calendar

#### Vấn đề giải quyết
Hiện tại bé học rồi quên, không có lý do quay lại app vào ngày mai.

#### UX Flow
```
Bé hoàn thành 1 action (scan / scene / story)
        ↓
Hệ thống ghi nhận "tick" cho ngày hôm nay
        ↓
Nếu hôm qua đã tick → Streak +1
Nếu hôm qua chưa tick → Streak = 1 (không hiện "Bạn đã mất streak!")
        ↓
Cột mốc 3/7/14/30/60/100 ngày → Bibi xuất hiện chúc mừng + huy hiệu
```

#### UI Mockup (text wireframe)

**Trên Home screen — góc phải header:**
```
┌─────────────────────┐
│  🔥 5 ngày  🐰      │
│  liên tục           │
└─────────────────────┘
```

**Khi đạt cột mốc — full screen overlay:**
```
┌────────────────────────────┐
│         🐰 (Bibi nhảy)     │
│                            │
│       🎉 7 NGÀY! 🎉       │
│                            │
│   "Tuyệt vời! Su và Ba đã  │
│   học cùng nhau 7 ngày!"   │
│                            │
│      [Chia sẻ] [OK]        │
└────────────────────────────┘
```

#### Data Model (localStorage)
```js
// Key: 'mm_streak'
{
  current: 5,                 // Streak hiện tại
  best: 12,                   // Best all-time
  lastDay: '2026-04-28',      // Ngày tick gần nhất (ISO)
  days: ['2026-04-22', ...],  // Mảng tất cả ngày đã học (max 365)
  milestones: [3, 7]          // Đã đạt cột mốc nào (để không double-celebrate)
}
```

#### Code Pattern
```js
function tickStreak() {
  const streak = JSON.parse(localStorage.getItem('mm_streak') ||
    '{"current":0,"best":0,"lastDay":null,"days":[],"milestones":[]}');

  const today = new Date().toISOString().slice(0,10);
  if (streak.lastDay === today) return; // đã tick rồi

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString().slice(0,10);

  streak.current = (streak.lastDay === yesterday) ? streak.current + 1 : 1;
  if (streak.current > streak.best) streak.best = streak.current;
  streak.lastDay = today;
  streak.days.push(today);
  if (streak.days.length > 365) streak.days = streak.days.slice(-365);

  // Cột mốc
  const MILESTONES = [3, 7, 14, 30, 60, 100, 365];
  for (const m of MILESTONES) {
    if (streak.current === m && !streak.milestones.includes(m)) {
      streak.milestones.push(m);
      showMilestoneScreen(m);  // Bibi celebrate
      break;
    }
  }

  localStorage.setItem('mm_streak', JSON.stringify(streak));
  updateStreakBadge();
}

// Gọi tickStreak() ở 3 nơi:
// 1. Sau khi groqVision() thành công (Magic Scan)
// 2. Sau khi hoàn thành 1 game (Scene)
// 3. Sau khi tạo 1 trang StoryDuo
```

#### Estimate
- **Code:** 3-4 giờ
- **Test:** 1 giờ (mock date để test rollover)
- **Total:** 0.5 ngày

---

### 🐰 Feature 3.2 — Mascot Bibi

#### Vấn đề giải quyết
App hiện tại "lạnh" — không có nhân vật để bé gắn bó. Đối thủ Duolingo có cú Duo, Monkey có khỉ.

#### Thiết kế nhân vật
- **Tên:** Bibi (dễ phát âm cho bé)
- **Loài:** Thỏ trắng tai dài
- **Tính cách:** Vui vẻ, hơi vụng về, luôn cổ vũ bé
- **Câu nói đặc trưng:** "Tuyệt vời quá Su ơi!" / "Bibi cũng học cùng!" / "Một chút nữa nhé!"
- **Implementation:** Inline SVG (không cần asset external) — animate bằng CSS

#### Bộ State Animations
| State | Khi nào hiện | Animation |
|-------|--------------|-----------|
| `idle` | Default trên home | Chớp mắt 4s/lần |
| `happy` | Bé trả lời đúng | Nhảy lên + tai vẫy |
| `thinking` | Đang load AI | Tay chống cằm + lắc đầu |
| `celebrate` | Streak milestone | Confetti + xoay vòng |
| `sleeping` | Bé không học >3 ngày | Zzz + tai cụp |
| `wave` | Mở app lần đầu trong ngày | Vẫy tay + speech bubble |

#### SVG Template (rút gọn)
```html
<svg id="bibi" viewBox="0 0 100 100" class="mascot">
  <!-- Body -->
  <ellipse cx="50" cy="65" rx="25" ry="22" fill="#FFF8EC"/>
  <!-- Tai trái + phải (animate khi happy) -->
  <ellipse class="ear-l" cx="38" cy="25" rx="6" ry="18" fill="#FFF8EC"/>
  <ellipse class="ear-r" cx="62" cy="25" rx="6" ry="18" fill="#FFF8EC"/>
  <!-- Mắt (animate blink) -->
  <circle class="eye-l" cx="42" cy="58" r="3" fill="#2D1B0E"/>
  <circle class="eye-r" cx="58" cy="58" r="3" fill="#2D1B0E"/>
  <!-- Mũi + miệng -->
  <ellipse cx="50" cy="68" rx="2" ry="1.5" fill="#FF6B6B"/>
  <path d="M 47 71 Q 50 74 53 71" stroke="#2D1B0E" fill="none" stroke-width="1.5"/>
</svg>

<style>
.mascot { width: 80px; height: 80px; }
.eye-l, .eye-r { animation: blink 4s infinite; }
@keyframes blink {
  0%, 90%, 100% { transform: scaleY(1); }
  93%, 97% { transform: scaleY(0.1); }
}
.mascot.happy .ear-l { animation: wiggle 0.4s infinite alternate; }
.mascot.happy .ear-r { animation: wiggle 0.4s infinite alternate-reverse; }
@keyframes wiggle {
  from { transform: rotate(-10deg); }
  to { transform: rotate(10deg); }
}
.mascot.celebrate { animation: spin 0.8s ease-in-out; }
@keyframes spin {
  from { transform: rotate(0) scale(1); }
  50% { transform: rotate(180deg) scale(1.3); }
  to { transform: rotate(360deg) scale(1); }
}
</style>
```

#### Speech Bubble Component
```js
function bibiSay(text, duration = 3000) {
  const bubble = document.getElementById('bibi-bubble');
  bubble.textContent = text;
  bubble.classList.remove('hidden');
  setTimeout(() => bubble.classList.add('hidden'), duration);
}

// Sử dụng:
bibiSay('Tuyệt vời! Học thêm 1 từ rồi!');
bibiSay('Bibi nhớ Su lắm! Quay lại học cùng nhé!');
```

#### Estimate
- **Vẽ SVG:** 2 giờ (hoặc dùng emoji 🐰 phiên bản đơn giản)
- **Animation states:** 3 giờ
- **Tích hợp 3 màn hình:** 2 giờ
- **Total:** 1 ngày

---

### 🎯 Feature 3.3 — Daily Quest

#### Vấn đề giải quyết
Bé mở app không biết hôm nay làm gì. Cần "menu nhiệm vụ" rõ ràng.

#### 3 Nhiệm vụ cố định (reset 0h hằng ngày)
| Quest | Yêu cầu | Reward |
|-------|---------|--------|
| 📸 **Thám tử nhỏ** | Scan 5 đồ vật mới | +20⭐ |
| 🎮 **Trò chơi vui** | Hoàn thành 1 game (Đố Tìm hoặc Quiz) | +20⭐ |
| 📖 **Người kể chuyện** | Tạo 1 trang StoryDuo | +20⭐ |
| 🌟 **BONUS** | Hoàn thành cả 3 quest | +50⭐ extra |

#### UI Mockup (Home screen)
```
┌──────────────────────────────────┐
│  🐰 Bibi: "Hôm nay làm gì nào?"  │
├──────────────────────────────────┤
│  📸 Thám tử nhỏ        ▰▰▰▱▱     │  ← progress 3/5
│      Scan 5 đồ vật            +20⭐│
│                                   │
│  🎮 Trò chơi vui       ✅         │  ← done
│      Hoàn thành 1 game        +20⭐│
│                                   │
│  📖 Người kể chuyện    ▱▱▱▱▱     │
│      Tạo 1 trang chuyện       +20⭐│
└──────────────────────────────────┘
```

#### Data Model
```js
// Key: 'mm_quest'
{
  date: '2026-04-28',
  quests: {
    scan:  { target: 5, current: 3, done: false },
    game:  { target: 1, current: 1, done: true  },
    story: { target: 1, current: 0, done: false }
  },
  bonusGiven: false  // Đã cộng 50⭐ bonus chưa
}
```

#### Logic Reset
```js
function loadDailyQuest() {
  const today = new Date().toISOString().slice(0,10);
  let q = JSON.parse(localStorage.getItem('mm_quest') || '{}');

  if (q.date !== today) {
    q = {
      date: today,
      quests: {
        scan:  { target: 5, current: 0, done: false },
        game:  { target: 1, current: 0, done: false },
        story: { target: 1, current: 0, done: false }
      },
      bonusGiven: false
    };
    localStorage.setItem('mm_quest', JSON.stringify(q));
  }
  return q;
}

function progressQuest(type) {
  const q = loadDailyQuest();
  const quest = q.quests[type];
  if (quest.done) return;

  quest.current++;
  if (quest.current >= quest.target) {
    quest.done = true;
    addScore(20);
    bibiSay('Hoàn thành nhiệm vụ! +20⭐');
  }

  // Bonus all 3
  if (!q.bonusGiven && Object.values(q.quests).every(x => x.done)) {
    q.bonusGiven = true;
    addScore(50);
    bibiSay('Tuyệt vời! Hoàn thành cả 3! +50⭐ BONUS!');
    confetti();
  }

  localStorage.setItem('mm_quest', JSON.stringify(q));
  renderQuests();
}
```

#### Estimate: 0.5 ngày

---

### 🎟️ Feature 3.4 — Sticker Album

#### Vấn đề giải quyết
Bé thích sưu tập (collect mechanic). Mỗi sticker = 1 cú dopamine nhỏ.

#### Bộ sticker khởi đầu (30 cái)
Chia thành 5 chủ đề × 6 sticker:

| Chủ đề | Sticker (emoji) |
|--------|-----------------|
| 🐾 Động vật | 🐰 🐶 🐱 🐠 🦋 🐝 |
| 🍎 Đồ ăn | 🍎 🍌 🍕 🍰 🍦 🥪 |
| 🚗 Phương tiện | 🚗 🚌 ✈️ 🚂 🚀 🚲 |
| 🌳 Thiên nhiên | 🌳 🌸 ☀️ 🌈 🌙 ⭐ |
| 👨‍👩‍👧 Gia đình | 👨 👩 👧 👦 👴 👵 |

#### Cách mở khóa
- Mỗi 5 từ học = 1 sticker random (chưa có)
- Mỗi 7 ngày streak = 1 sticker hiếm (có viền vàng)
- Hoàn thành full chủ đề = 1 huy hiệu chủ đề

#### UI Mockup (Album screen)
```
┌──────────────────────────────────────┐
│  🎟️ Bộ sưu tập của Su (12/30)         │
├──────────────────────────────────────┤
│  🐾 Động vật (3/6)                    │
│  ┌──┐ ┌──┐ ┌──┐ ┌─?─┐ ┌─?─┐ ┌─?─┐    │
│  │🐰│ │🐶│ │🐱│ │ ? │ │ ? │ │ ? │    │
│  └──┘ └──┘ └──┘ └───┘ └───┘ └───┘    │
│                                       │
│  🍎 Đồ ăn (5/6) ⭐⭐⭐⭐⭐                │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌─?─┐      │
│  │🍎│ │🍌│ │🍕│ │🍰│ │🍦│ │ ? │      │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └───┘      │
│  ...                                  │
└──────────────────────────────────────┘
```

#### Khi unlock — animation
```
Card lật ngược (back: ?) → flip 360° → reveal sticker
+ Confetti + Bibi: "Sưu tập mới! Đẹp quá!"
```

#### Data Model
```js
// Key: 'mm_stickers'
{
  unlocked: ['rabbit', 'apple', 'car', ...],  // ID stickers đã mở
  themeBadges: ['food'],                       // Huy hiệu hoàn thành chủ đề
  lastUnlockDate: '2026-04-28'
}

// STICKER_DB (constant trong code)
const STICKER_DB = {
  animals: [
    {id:'rabbit', emoji:'🐰', name:'Thỏ Bibi', rare:false},
    {id:'dog',    emoji:'🐶', name:'Cún cưng', rare:false},
    // ...
  ],
  food:    [/* ... */],
  // ...
};
```

#### Estimate: 1 ngày (UI album + animation flip)

---

## 4. FAMILY & SHARING

### 📊 Feature 4.1 — Parent Dashboard

#### Vấn đề giải quyết
Ba muốn nhanh chóng biết: "Tuần này con học thế nào?"

#### Metrics hiển thị
1. **Tổng từ học tuần này** (so với tuần trước)
2. **Streak hiện tại** + best
3. **Thời gian học** (ước tính từ session count × 5 phút)
4. **Top 3 chủ đề** bé scan nhiều nhất
5. **Gợi ý ôn tập** — Từ học từ 7 ngày trước, chưa nói lại

#### UI Mockup
```
┌────────────────────────────────────┐
│  📊 Tuần của Su (22-28/04)         │
├────────────────────────────────────┤
│                                    │
│   42 từ ↑8 vs tuần trước           │
│   ━━━━━━━━━━━━━━━━━━━━━━           │
│   M  T  W  T  F  S  S              │
│   ▆  ▄  ▇  ▃  ▆  █  ▅              │  ← bar chart
│                                    │
│  🔥 Streak: 5 ngày (best: 12)      │
│  ⏱️ Học khoảng: 1h45m              │
│                                    │
│  🎯 Chủ đề yêu thích:              │
│      1. Đồ ăn   (12 từ)            │
│      2. Đồ chơi (8 từ)             │
│      3. Động vật (7 từ)            │
│                                    │
│  📚 Su nên ôn lại:                 │
│      • cucumber (học 9 ngày trước) │
│      • slipper  (học 8 ngày trước) │
│      • mirror   (học 7 ngày trước) │
│                                    │
│  [Xuất báo cáo PDF] [Chia sẻ]      │
└────────────────────────────────────┘
```

#### Bar Chart bằng SVG (không cần thư viện)
```js
function buildWeekChart(daysData) {
  // daysData = [3, 5, 7, 2, 6, 12, 7]  ← từ học mỗi ngày
  const max = Math.max(...daysData, 1);
  const w = 280, h = 100, gap = 8;
  const barW = (w - gap*6) / 7;

  const bars = daysData.map((v, i) => {
    const barH = (v / max) * h;
    const x = i * (barW + gap);
    const y = h - barH;
    return `<rect x="${x}" y="${y}" width="${barW}" height="${barH}"
             fill="url(#gold-grad)" rx="4"/>
            <text x="${x + barW/2}" y="${h + 14}" text-anchor="middle"
             font-size="10" fill="#fff8">${v}</text>`;
  }).join('');

  return `<svg viewBox="0 0 ${w} ${h+20}" width="100%">
    <defs><linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFD94A"/>
      <stop offset="100%" stop-color="#FFB347"/>
    </linearGradient></defs>
    ${bars}
  </svg>`;
}
```

#### Logic "Gợi ý ôn tập" (Spaced Repetition đơn giản)
```js
function getReviewWords() {
  const hist = JSON.parse(localStorage.getItem('mm_hist') || '[]');
  const now = Date.now();
  const SEVEN_DAYS = 7 * 86400 * 1000;

  return hist
    .filter(w => (now - w.timestamp) > SEVEN_DAYS)
    .filter(w => !w.reviewed)
    .slice(0, 3);
}
```

#### Estimate: 1 ngày

---

### 📱 Feature 4.2 — Share Card (VIRAL FEATURE)

#### Vấn đề giải quyết
Đây là feature **growth chính**. Mỗi share = 1 ad miễn phí.

#### Thiết kế card (1080×1920 — TikTok/Reels portrait)
```
╔══════════════════════════════════╗
║                                  ║
║   ✨ MAGIC MOMENT ✨             ║
║                                  ║
║   Hôm nay Su (3 tuổi) học        ║
║   được 8 từ tiếng Anh            ║
║   với Ba!                        ║
║                                  ║
║      🐰 Bibi cùng vẫy tay 🐰     ║
║                                  ║
║   ┌────────────────────┐         ║
║   │ 🍎 APPLE = quả táo │         ║
║   │ 🐶 DOG   = con chó │         ║
║   │ 🚗 CAR   = ô tô    │         ║
║   │ 🌸 FLOWER= bông hoa│         ║
║   │ +4 từ khác         │         ║
║   └────────────────────┘         ║
║                                  ║
║   🔥 5 ngày liên tục              ║
║                                  ║
║   magicmoment.app                ║
║   #BaConHọcCùngNhau              ║
╚══════════════════════════════════╝
```

#### Implementation: Canvas API
```js
async function buildShareCard(opts = {}) {
  const c = document.createElement('canvas');
  c.width = 1080; c.height = 1920;
  const ctx = c.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
  grad.addColorStop(0, '#0F0A2E');
  grad.addColorStop(1, '#2D1B0E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Title
  ctx.fillStyle = '#FFD94A';
  ctx.font = 'bold 80px "Baloo 2"';
  ctx.textAlign = 'center';
  ctx.fillText('✨ MAGIC MOMENT ✨', 540, 200);

  // Subtitle
  ctx.fillStyle = '#FFF8EC';
  ctx.font = '52px "Nunito"';
  ctx.fillText(`Hôm nay ${opts.kidName} (${opts.age} tuổi)`, 540, 320);
  ctx.fillText(`học được ${opts.wordCount} từ tiếng Anh`, 540, 390);
  ctx.fillText('với Ba!', 540, 460);

  // Bibi mascot (vẽ SVG ra canvas hoặc emoji)
  ctx.font = '180px serif';
  ctx.fillText('🐰', 540, 700);

  // Word list box
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 3;
  roundRect(ctx, 140, 850, 800, 600, 30, true, true);

  ctx.fillStyle = '#FFD94A';
  ctx.font = 'bold 56px "Baloo 2"';
  ctx.textAlign = 'left';
  opts.words.slice(0, 4).forEach((w, i) => {
    const y = 970 + i * 100;
    ctx.fillStyle = '#FFD94A';
    ctx.fillText(`${w.emoji} ${w.en.toUpperCase()}`, 200, y);
    ctx.fillStyle = '#FFF8EC';
    ctx.font = '40px "Caveat"';
    ctx.fillText(`= ${w.vi}`, 600, y);
    ctx.font = 'bold 56px "Baloo 2"';
  });

  if (opts.words.length > 4) {
    ctx.fillStyle = '#FFF8EC99';
    ctx.font = '36px "Nunito"';
    ctx.fillText(`+${opts.words.length - 4} từ khác`, 200, 1380);
  }

  // Streak badge
  if (opts.streak > 0) {
    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 60px "Baloo 2"';
    ctx.textAlign = 'center';
    ctx.fillText(`🔥 ${opts.streak} ngày liên tục`, 540, 1600);
  }

  // Footer
  ctx.fillStyle = '#FFF8EC99';
  ctx.font = '36px "Nunito"';
  ctx.fillText('magicmoment.app  •  #BaConHọcCùngNhau', 540, 1800);

  return c.toDataURL('image/png');
}

// Helper
function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
```

#### Trigger điểm chia sẻ
1. **Cuối session học** (≥5 từ) → "Chia sẻ thành tích hôm nay"
2. **Sau khi đạt streak milestone** (3/7/14...) → "Khoe Bibi với bạn bè"
3. **Sau khi hoàn thành StoryDuo** → "Chia sẻ sách tranh"

#### Web Share API
```js
async function shareCard(dataUrl, caption) {
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], 'magic-moment.png', { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: 'Magic Moment',
      text: caption,
      files: [file]
    });
  } else {
    // Fallback: download
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'magic-moment.png';
    a.click();
  }
}
```

#### Estimate
- **Canvas template:** 4 giờ
- **Web Share + fallback:** 1 giờ
- **3 trigger points:** 1 giờ
- **Total:** 1 ngày

---

### 📖 Feature 4.3 — Story Book PDF

#### Vấn đề giải quyết
Ba kể chuyện → AI tạo sách tranh → **In ra giấy** để con lật trước khi ngủ.

#### 2 phương án

**Phương án A — Print CSS (đơn giản, miễn phí)**
```css
@media print {
  /* Ẩn UI controls */
  .nav, button, .header, .score-badge { display: none !important; }

  /* Mỗi page break */
  .story-page { page-break-after: always; }

  /* Format A4 */
  @page { size: A4; margin: 1cm; }

  body { background: white; color: black; }

  .vocab-badge {
    border: 2px solid black;
    background: none !important;
  }
}
```

User mở book view → bấm Print → "Save as PDF" trong dialog browser.

**Phương án B — jsPDF (proper PDF)**
```js
// CDN: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
async function exportStoryPDF(story) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');

  for (let i = 0; i < story.pages.length; i++) {
    if (i > 0) pdf.addPage();
    const page = story.pages[i];

    // Render page DOM to canvas → image
    const canvas = await html2canvas(document.querySelector(`#page-${i}`));
    const img = canvas.toDataURL('image/jpeg', 0.85);
    pdf.addImage(img, 'JPEG', 10, 10, 190, 0);
  }

  pdf.save(`${story.title}.pdf`);
}
```

#### Khuyến nghị: **Bắt đầu với Phương án A** (zero dependency), upgrade B sau nếu user yêu cầu.

#### Estimate: 0.5 ngày (Phương án A)

---

### 🏆 Feature 4.4 — Family Challenge

#### Vấn đề giải quyết
Tận dụng cảm xúc gia đình — Ba & Mẹ thi đua, không phải Ba vs Con.

#### Cơ chế
- Tạo 2-4 profiles (Ba / Mẹ / Bé / Ông bà)
- Mỗi profile có điểm riêng
- Mỗi tuần, người **dạy** (= ngồi cạnh khi bé học) ghi điểm
- Cuối tuần → người chiến thắng nhận sticker đặc biệt

#### UI Mockup (Profile selector trước session)
```
┌──────────────────────────────┐
│  Ai chơi với Su hôm nay?     │
├──────────────────────────────┤
│  [👨 Ba]   [👩 Mẹ]            │
│  [👴 Ông]  [👵 Bà]            │
└──────────────────────────────┘

┌──────────────────────────────┐
│  🏆 Bảng xếp hạng tuần này   │
├──────────────────────────────┤
│  🥇 👨 Ba    245 ⭐           │
│  🥈 👩 Mẹ    180 ⭐           │
│  🥉 👵 Bà     90 ⭐           │
│      👴 Ông   45 ⭐           │
└──────────────────────────────┘
```

#### Data Model
```js
// Key: 'mm_family'
{
  profiles: [
    { id:'dad', name:'Ba', emoji:'👨', score:245, weekScore:245 },
    { id:'mom', name:'Mẹ', emoji:'👩', score:180, weekScore:180 },
    // ...
  ],
  weekStartDate: '2026-04-22',
  history: [/* tuần trước, ai win */]
}
```

#### Estimate: 1 ngày

---

## 5. ROADMAP 4 TUẦN

### 🗓️ Tuần 1 — Foundation
**Mục tiêu:** Streak + Mascot Bibi + Daily Quest hoạt động cơ bản

| Ngày | Task | Output |
|------|------|--------|
| Day 1 | Streak Calendar — data + tick logic | `tickStreak()` works |
| Day 2 | Streak Calendar — UI badge + milestone screen | Visual feedback |
| Day 3 | Mascot Bibi — SVG + 3 states (idle/happy/celebrate) | Bibi xuất hiện |
| Day 4 | Mascot Bibi — speech bubble + integrate 3 modules | Bibi nói chuyện |
| Day 5 | Daily Quest — data + UI + rewards | Quest hoạt động |
| Day 6-7 | Test + bugfix + commit | v3.1 ready |

**Output cuối tuần:** Magic Moment v3.1 — bé có lý do quay lại app mỗi ngày

---

### 🗓️ Tuần 2 — Viral Engine
**Mục tiêu:** Share Card hoạt động + Bibi states đầy đủ

| Ngày | Task | Output |
|------|------|--------|
| Day 1-2 | Share Card — Canvas template (1080×1920) | Card render đẹp |
| Day 3 | Web Share API + fallback download | Share thực sự |
| Day 4 | 3 trigger points (session/streak/story) | Share xuất hiện đúng lúc |
| Day 5 | Mascot Bibi — thêm thinking/sleeping/wave states | Bibi đa dạng |
| Day 6-7 | Test trên Android + iOS + commit | v3.2 ready |

**Output cuối tuần:** Magic Moment v3.2 — viral loop hoạt động

---

### 🗓️ Tuần 3 — Collection & Insights
**Mục tiêu:** Sticker Album + Parent Dashboard

| Ngày | Task | Output |
|------|------|--------|
| Day 1 | STICKER_DB (30 stickers, 5 chủ đề) | Data ready |
| Day 2 | Album UI + flip animation | Album đẹp |
| Day 3 | Unlock logic + integrate vào streak/words | Bé mở khóa |
| Day 4 | Parent Dashboard — bar chart SVG | Chart works |
| Day 5 | Dashboard — review words + top topics | Insight đầy đủ |
| Day 6-7 | Test + commit | v3.3 ready |

**Output cuối tuần:** Magic Moment v3.3 — parent có data, bé có sticker

---

### 🗓️ Tuần 4 — Family & Polish
**Mục tiêu:** Family Challenge + Story Book PDF + final polish

| Ngày | Task | Output |
|------|------|--------|
| Day 1-2 | Family Challenge — multi-profile + leaderboard | Multi-user works |
| Day 3 | Story Book PDF — Print CSS | In được sách |
| Day 4 | Onboarding — flow giới thiệu Bibi cho user mới | UX mượt |
| Day 5 | Performance — minify, lazy load | App nhanh hơn |
| Day 6-7 | Final test + commit + Vercel deploy | **v3.4 LAUNCH** |

**Output cuối tuần:** Magic Moment v3.4 — Phase 2 complete!

---

### Tổng kết Roadmap

| Tuần | Theme | Features | Version |
|------|-------|----------|---------|
| 1 | Foundation | Streak + Bibi + Quest | v3.1 |
| 2 | Viral | Share Card + Bibi full | v3.2 |
| 3 | Collection | Sticker + Dashboard | v3.3 |
| 4 | Family | Challenge + PDF + Polish | v3.4 |

---

## 6. COST ESTIMATE

### Dev time (1 người, full-time)
- **Total:** ~24 ngày làm việc (~5 tuần lịch nếu part-time)
- **Critical path:** Tuần 1 (Streak + Bibi) — không build cái này thì các thứ khác không có meaning

### Groq API tokens (chỉ tăng nhẹ)
Phase 2 **không thêm** API call mới ngoại trừ:
- Parent Dashboard có thể gọi 1 prompt/tuần để generate "insight" tiếng Việt → ~500 tokens/tuần/user
- Family mode multiply requests theo số profile

**Estimate:** Giữ trong free tier Groq (~14,400 req/ngày) thoải mái.

### Storage
- `mm_streak`: ~5KB
- `mm_quest`: ~500B
- `mm_stickers`: ~1KB
- `mm_family`: ~2KB
- Share cards (KHÔNG lưu, generate on-demand): 0 KB
- **Tổng tăng:** < 10KB → vẫn an toàn limit 5MB

### Asset cost
- Mascot Bibi SVG: tự vẽ inline = **0₫**
- Stickers: emoji có sẵn = **0₫**
- Fonts: Google Fonts đã dùng = **0₫**

**Total cost Phase 2: 0₫** (chỉ tốn thời gian dev) ✅

---

## 7. TECHNICAL APPENDIX

### 7.1 Cấu trúc file mới (vẫn giữ single-file)

```html
<!-- index.html -->
<style>
  /* Existing styles ... */

  /* === PHASE 2 STYLES === */
  .streak-badge { /* ... */ }
  .mascot { /* ... */ }
  .mascot-bubble { /* ... */ }
  .quest-card { /* ... */ }
  .sticker-grid { /* ... */ }
  .dashboard-chart { /* ... */ }
  /* etc. */
</style>

<body>
  <!-- Existing screens ... -->

  <!-- === PHASE 2 SCREENS === -->
  <div id="s-quest" class="screen hidden"> ... </div>
  <div id="s-album" class="screen hidden"> ... </div>
  <div id="s-dashboard" class="screen hidden"> ... </div>
  <div id="s-family" class="screen hidden"> ... </div>
  <div id="s-share" class="screen hidden"> ... </div>

  <!-- Bibi global mascot -->
  <div id="bibi-container">
    <svg id="bibi" class="mascot idle"> ... </svg>
    <div id="bibi-bubble" class="mascot-bubble hidden"></div>
  </div>
</body>

<script>
  // === EXISTING CODE ===
  // ...

  // === PHASE 2 MODULES ===
  // 1. Streak module
  function tickStreak() { /* ... */ }
  function showMilestoneScreen(n) { /* ... */ }

  // 2. Bibi module
  function bibiSay(text, dur) { /* ... */ }
  function bibiSetState(state) { /* ... */ }

  // 3. Quest module
  function loadDailyQuest() { /* ... */ }
  function progressQuest(type) { /* ... */ }

  // 4. Sticker module
  function unlockSticker() { /* ... */ }
  function renderAlbum() { /* ... */ }

  // 5. Dashboard module
  function buildWeekChart(data) { /* ... */ }
  function getReviewWords() { /* ... */ }

  // 6. Share Card module
  async function buildShareCard(opts) { /* ... */ }
  async function shareCard(url, caption) { /* ... */ }

  // 7. Family module
  function switchProfile(id) { /* ... */ }
  function renderLeaderboard() { /* ... */ }
</script>
```

### 7.2 LocalStorage keys mới

| Key | Type | Size | Mô tả |
|-----|------|------|-------|
| `mm_streak` | JSON | ~5KB | Streak data + days array |
| `mm_quest` | JSON | ~500B | Daily quest progress |
| `mm_stickers` | JSON | ~1KB | Unlocked stickers |
| `mm_family` | JSON | ~2KB | Multi-profile + scores |
| `mm_review` | JSON | ~3KB | Words to review (computed) |
| `mm_onboarded` | bool | 5B | Đã xem giới thiệu Bibi chưa |

### 7.3 Migration cho user cũ
```js
// Chạy 1 lần khi load app
function migrateToV3_1() {
  if (localStorage.getItem('mm_migrated_v3_1')) return;

  // Khởi tạo streak từ wordHist nếu có
  const hist = JSON.parse(localStorage.getItem('mm_hist') || '[]');
  if (hist.length > 0) {
    const today = new Date().toISOString().slice(0,10);
    localStorage.setItem('mm_streak', JSON.stringify({
      current: 1,
      best: 1,
      lastDay: today,
      days: [today],
      milestones: []
    }));
  }

  localStorage.setItem('mm_migrated_v3_1', '1');
}
```

### 7.4 Testing checklist từng feature

#### Streak
- [ ] Tick lần 1 → current = 1
- [ ] Tick lần 2 cùng ngày → vẫn 1 (không double)
- [ ] Mock yesterday tick → today tick → current = 2
- [ ] Mock 2 ngày trước tick → today → current = 1 (reset)
- [ ] Đạt 3 ngày → milestone screen xuất hiện 1 lần duy nhất

#### Mascot Bibi
- [ ] Idle blink animation chạy đều
- [ ] Trả lời đúng → state happy 2s → quay về idle
- [ ] Streak milestone → state celebrate
- [ ] Mở app sau 3+ ngày vắng → state sleeping wake up

#### Share Card
- [ ] Render đúng trên 1080×1920
- [ ] Test trên Chrome (download), Android (share sheet), iOS (share sheet)
- [ ] Tên bé > 10 ký tự → không tràn
- [ ] words.length = 0 → không crash

#### Family
- [ ] Tạo profile mới → lưu thành công
- [ ] Switch profile → score khác nhau
- [ ] Tuần mới → reset weekScore (nhưng giữ total score)

### 7.5 Pitfall cần tránh (từ STATUS.md cũ)

```js
// ❌ KHÔNG làm thế này — sẽ break syntax
function showLoad(state) {
  document.getElementById(state).classList.remove('hidden');
  // Quên đóng function...
}

// ✅ LÀM thế này — dùng `node -e` verify
function showLoad(state) {
  const ids = ['ls1', 'ls2', 'ls3'];  // Phải có quotes!
  ids.forEach(id => {
    document.getElementById(id).classList.toggle('active', id === state);
  });
}

// Verify command:
// node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"
```

---

## 🎯 KẾT LUẬN

Phase 2 tập trung vào **2 trụ cột retention + virality** với chi phí 0₫ ngoài thời gian dev. Sau 4 tuần, Magic Moment sẽ chuyển từ "công cụ thử nghiệm" thành "thói quen gia đình".

### Feature đầu tiên cần build (Day 1):
**🥇 Streak Calendar** — Vì:
- Score Easy+Viral+Love cao nhất (7/9)
- Foundation cho Mascot Bibi celebrate
- Dữ liệu bắt đầu được thu thập ngay → tuần sau Dashboard có data hiển thị
- Không phụ thuộc feature nào khác

### Sau khi xong Phase 2:
Đề xuất Phase 3 sẽ tập trung vào **Pronunciation Premium** (ELSA-style) + **Content Library** — hai thứ Magic Moment đang yếu nhất so với đối thủ VN.

---

*Báo cáo này tạo bởi Claude vào 28/04/2026 dựa trên SKILL.md + INSTRUCTIONS.md + STATUS.md của dự án.*
*Sau mỗi sprint, cập nhật STATUS.md với feature đã hoàn thành.*
