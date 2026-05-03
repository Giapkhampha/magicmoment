# THEME PACKS — Design & Build Spec
> Phase 3 · Feature đầu tiên · Magic Moment v4.1
> Mục tiêu: Học từ vựng theo chủ đề, không cần camera/mic, chơi mọi lúc mọi nơi

---

## 1. DATA STRUCTURE

### 1.1 Hardcoded Theme Packs (5 packs MVP)

Đặt trong JS, **không gọi API** → instant load, hoạt động offline.

```js
const THEME_PACKS = [
  {
    id: 'animals',
    title_vi: 'Động vật',
    title_en: 'Animals',
    icon: '🐱',
    color: '#FFB347',         // amber
    color2: '#EF476F',        // gradient end
    level: 1,                 // 1=starter (3-4y), 2=explorer (4-5y), 3=adventurer (5-6y)
    sticker_theme: 'animals', // map vào sticker album hiện có
    words: [
      { en: 'cat',      vi: 'Con mèo',     phonetic: '/kæt/',       emoji: '🐱', sentence: 'The cat says meow!' },
      { en: 'dog',      vi: 'Con chó',     phonetic: '/dɒɡ/',       emoji: '🐶', sentence: 'The dog says woof!' },
      { en: 'fish',     vi: 'Con cá',      phonetic: '/fɪʃ/',       emoji: '🐠', sentence: 'Fish swim in water.' },
      { en: 'bird',     vi: 'Con chim',    phonetic: '/bɜːrd/',     emoji: '🐦', sentence: 'Birds can fly!' },
      { en: 'rabbit',   vi: 'Con thỏ',     phonetic: '/ˈræbɪt/',    emoji: '🐰', sentence: 'Rabbits love carrots.' },
      { en: 'elephant', vi: 'Con voi',     phonetic: '/ˈɛlɪfənt/',  emoji: '🐘', sentence: 'Elephants are big!' },
      { en: 'lion',     vi: 'Con sư tử',   phonetic: '/ˈlaɪən/',    emoji: '🦁', sentence: 'The lion is strong.' },
      { en: 'cow',      vi: 'Con bò',      phonetic: '/kaʊ/',       emoji: '🐄', sentence: 'Cows give us milk.' }
    ]
  },
  {
    id: 'colors',
    title_vi: 'Màu sắc',
    title_en: 'Colors',
    icon: '🌈',
    color: '#A855F7',
    color2: '#3BA7F5',
    level: 1,
    sticker_theme: 'colors',
    words: [
      { en: 'red',    vi: 'Màu đỏ',   phonetic: '/rɛd/',     emoji: '🔴', sentence: 'The apple is red.' },
      { en: 'blue',   vi: 'Màu xanh dương', phonetic: '/bluː/', emoji: '🔵', sentence: 'The sky is blue.' },
      { en: 'green',  vi: 'Màu xanh lá',  phonetic: '/ɡriːn/', emoji: '🟢', sentence: 'The grass is green.' },
      { en: 'yellow', vi: 'Màu vàng', phonetic: '/ˈjɛloʊ/',  emoji: '🟡', sentence: 'The sun is yellow.' },
      { en: 'pink',   vi: 'Màu hồng', phonetic: '/pɪŋk/',    emoji: '🌸', sentence: 'The flower is pink.' },
      { en: 'white',  vi: 'Màu trắng',phonetic: '/waɪt/',    emoji: '⚪', sentence: 'Snow is white.' },
      { en: 'black',  vi: 'Màu đen',  phonetic: '/blæk/',    emoji: '⚫', sentence: 'The night is black.' },
      { en: 'orange', vi: 'Màu cam',  phonetic: '/ˈɔːrɪndʒ/',emoji: '🟠', sentence: 'The pumpkin is orange.' }
    ]
  },
  {
    id: 'food',
    title_vi: 'Thức ăn',
    title_en: 'Food',
    icon: '🍎',
    color: '#FF6B6B',
    color2: '#FFD94A',
    level: 1,
    sticker_theme: 'food',
    words: [
      { en: 'apple',  vi: 'Quả táo',   phonetic: '/ˈæpəl/',   emoji: '🍎', sentence: 'I love apples!' },
      { en: 'banana', vi: 'Quả chuối', phonetic: '/bəˈnænə/', emoji: '🍌', sentence: 'Bananas are yellow.' },
      { en: 'rice',   vi: 'Cơm',       phonetic: '/raɪs/',    emoji: '🍚', sentence: 'I eat rice today.' },
      { en: 'milk',   vi: 'Sữa',       phonetic: '/mɪlk/',    emoji: '🥛', sentence: 'Milk is yummy.' },
      { en: 'egg',    vi: 'Quả trứng', phonetic: '/ɛɡ/',      emoji: '🥚', sentence: 'Eggs are round.' },
      { en: 'bread',  vi: 'Bánh mì',   phonetic: '/brɛd/',    emoji: '🍞', sentence: 'I eat bread.' },
      { en: 'water',  vi: 'Nước',      phonetic: '/ˈwɔːtər/', emoji: '💧', sentence: 'Drink water!' },
      { en: 'cake',   vi: 'Bánh ngọt', phonetic: '/keɪk/',    emoji: '🍰', sentence: 'Cake is sweet!' }
    ]
  },
  {
    id: 'body',
    title_vi: 'Cơ thể',
    title_en: 'Body',
    icon: '👁️',
    color: '#4ECDC4',
    color2: '#22C55E',
    level: 1,
    sticker_theme: 'body',
    words: [
      { en: 'eye',   vi: 'Mắt',  phonetic: '/aɪ/',  emoji: '👁️', sentence: 'I see with my eyes.' },
      { en: 'ear',   vi: 'Tai',  phonetic: '/ɪər/', emoji: '👂', sentence: 'I hear with my ears.' },
      { en: 'nose',  vi: 'Mũi',  phonetic: '/noʊz/',emoji: '👃', sentence: 'I smell with my nose.' },
      { en: 'mouth', vi: 'Miệng',phonetic: '/maʊθ/',emoji: '👄', sentence: 'I eat with my mouth.' },
      { en: 'hand',  vi: 'Tay',  phonetic: '/hænd/',emoji: '✋', sentence: 'I clap my hands.' },
      { en: 'foot',  vi: 'Chân', phonetic: '/fʊt/', emoji: '🦶', sentence: 'I walk with my feet.' },
      { en: 'hair',  vi: 'Tóc',  phonetic: '/hɛər/',emoji: '💇', sentence: 'My hair is long.' },
      { en: 'tooth', vi: 'Răng', phonetic: '/tuːθ/',emoji: '🦷', sentence: 'I brush my tooth.' }
    ]
  },
  {
    id: 'numbers',
    title_vi: 'Số đếm',
    title_en: 'Numbers',
    icon: '1️⃣',
    color: '#3BA7F5',
    color2: '#A855F7',
    level: 1,
    sticker_theme: 'numbers',
    words: [
      { en: 'one',   vi: 'Số 1', phonetic: '/wʌn/',   emoji: '1️⃣', sentence: 'One apple.' },
      { en: 'two',   vi: 'Số 2', phonetic: '/tuː/',   emoji: '2️⃣', sentence: 'Two cats.' },
      { en: 'three', vi: 'Số 3', phonetic: '/θriː/',  emoji: '3️⃣', sentence: 'Three dogs.' },
      { en: 'four',  vi: 'Số 4', phonetic: '/fɔːr/',  emoji: '4️⃣', sentence: 'Four birds.' },
      { en: 'five',  vi: 'Số 5', phonetic: '/faɪv/',  emoji: '5️⃣', sentence: 'Five fingers.' },
      { en: 'six',   vi: 'Số 6', phonetic: '/sɪks/',  emoji: '6️⃣', sentence: 'Six fish.' },
      { en: 'seven', vi: 'Số 7', phonetic: '/ˈsɛvən/',emoji: '7️⃣', sentence: 'Seven stars.' },
      { en: 'eight', vi: 'Số 8', phonetic: '/eɪt/',   emoji: '8️⃣', sentence: 'Eight legs.' }
    ]
  }
];
```

### 1.2 localStorage State

Thêm 1 key mới: `mm_themes`

```js
{
  "animals": {
    completed: false,           // đã học hết tất cả từ chưa
    completedAt: null,          // ISO date khi hoàn thành lần đầu (cho sticker)
    learned: ["cat", "dog"],    // các từ đã "Đã thuộc" trong pack
    timesPlayed: 3,             // số lần mở pack
    bestScore: 80               // best score 1 lần chơi (0-100%)
  },
  "colors": { ... },
  // Pack chưa mở: KHÔNG có trong object (treat as fresh)
}
```

**Migration:** Nếu key chưa tồn tại → khởi tạo `{}` rỗng. Không cần migrate dữ liệu cũ.

---

## 2. UX FLOW

### Screen mới: 3 màn hình

```
[s-home] 
   ↓ tap "📚 Chủ đề"
[s-themes]                    ← danh sách packs
   ↓ tap 1 pack
[s-theme-pack]                ← màn detail + flashcard chính
   ↓ học hết / tap close
[s-theme-complete]            ← celebration + stats + sticker unlock
   ↓ về home
```

### 2.1 Màn `s-themes` (Themes List)

**Layout:**
```
┌─────────────────────────────┐
│ ←  📚 Chủ đề          ⭐ 120 │
├─────────────────────────────┤
│  Hôm nay học gì với bé?    │
│                             │
│  ┌─────┐ ┌─────┐            │
│  │ 🐱  │ │ 🌈  │            │
│  │Động │ │Màu  │            │
│  │vật  │ │sắc  │            │
│  │8 từ │ │8 từ │            │
│  │▓▓▓░░│ │░░░░░│   ← progress
│  └─────┘ └─────┘            │
│                             │
│  ┌─────┐ ┌─────┐            │
│  │ 🍎  │ │ 👁️  │            │
│  │Thức │ │Cơ   │            │
│  │ăn   │ │thể  │            │
│  └─────┘ └─────┘            │
│                             │
│  ┌─────┐                    │
│  │ 1️⃣  │                    │
│  │Số   │                    │
│  │đếm  │                    │
│  └─────┘                    │
└─────────────────────────────┘
```

**Card design:**
- Mỗi card: gradient `color → color2` (từ data)
- Badge nhỏ "✓ Hoàn thành" (góc phải) nếu `completed: true`
- Progress bar dưới: `learned.length / words.length`
- Tap → vào pack

### 2.2 Màn `s-theme-pack` (Flashcard chính)

**Layout (1 thẻ tại 1 thời điểm):**
```
┌─────────────────────────────┐
│ ✕                  3 / 8    │ ← progress
├─────────────────────────────┤
│                             │
│         🐱                  │  ← emoji to (5rem)
│                             │
│       CAT                   │  ← english (Baloo 2, gold, 3rem)
│      /kæt/                  │  ← phonetic (italic, opacity .4)
│                             │
│    Con mèo                  │  ← vietnamese (Caveat 2rem)
│                             │
│  "The cat says meow!"       │  ← sentence (italic, smaller)
│                             │
├─────────────────────────────┤
│   🔊 Nghe lại               │  ← TTS button (full width)
│                             │
│   🎤 Nói thử  (optional)    │
│                             │
│  ┌────────┐  ┌────────┐    │
│  │ 🤔     │  │ ✅     │    │
│  │Chưa rõ │  │Đã thuộc│   │
│  └────────┘  └────────┘    │
└─────────────────────────────┘
```

**Behaviors:**
- Vào pack: auto TTS từ đầu tiên
- "🤔 Chưa rõ" → đẩy từ về cuối hàng đợi (sẽ gặp lại), không cộng điểm
- "✅ Đã thuộc" → +5⭐, thêm vào `learned[]`, swipe sang thẻ kế
- Nếu từ đã trong `learned[]` → vẫn hiện nhưng ẩn nút "Đã thuộc" (chỉ ôn)
- Tap "🔊 Nghe lại" → TTS lại
- Tap "🎤 Nói thử" → mic check → đúng +5⭐ thêm (optional, có thể skip)
- Hết pack (đã qua tất cả từ) → màn complete

**Edge case:**
- Nếu pack đã `completed: true` lần trước → vào lại = "Ôn tập" mode, không cấp sticker lần 2, vẫn tích điểm bình thường.

### 2.3 Màn `s-theme-complete`

```
┌─────────────────────────────┐
│         🎉 ✨               │
│                             │
│    Tuyệt vời!               │
│   Bé đã học xong            │
│   chủ đề Động vật! 🐱       │
│                             │
│   ⭐ +50 (bonus hoàn thành) │
│   📊 8/8 từ đã thuộc        │
│                             │
│   🏆 Sticker mới mở khoá:   │
│   ┌───┐                     │
│   │🐱 │ ← animation flip   │
│   └───┘                     │
│                             │
│  [Học chủ đề khác]          │
│  [Về trang chủ]             │
└─────────────────────────────┘
```

**Behaviors:**
- Confetti tự động khi vào màn
- +50⭐ bonus (chỉ lần đầu hoàn thành pack)
- Trigger Daily Quest "Học xong 1 chủ đề" = ✓
- Unlock sticker theo `sticker_theme` (dùng cơ chế hiện có)
- Update `mm_themes[id].completed = true, completedAt = now`

### 2.4 Tích hợp Home Screen

Thêm 1 tile mới trên home, ngay cạnh Magic Scan / Scene / StoryDuo:

```
┌─────────┬─────────┐
│ 📸 Scan │ 🖼️ Scene│
├─────────┼─────────┤
│ 📖 Story│ 📚 Theme│  ← tile mới
└─────────┴─────────┘
```

Style: gradient amber→rose, icon emoji, label "📚 Chủ đề"

### 2.5 Tích hợp Daily Quest

Hiện đang có 3 quest: scan / game / story. Đề xuất:
- **Giữ nguyên 3 quest cũ** (không phá vỡ)
- **Thay quest "scan"** thành quest dynamic: 50% là scan, 50% là theme. Hoặc:
- **Bonus quest tuần:** "Hoàn thành 3 chủ đề trong 1 tuần" → +100⭐

Để đơn giản, recommend: thêm logic "Học 1 chủ đề bất kỳ" vào quest tracker, mỗi khi hoàn thành 1 pack thì bumped flag.

---

## 3. SCORING

```
Mỗi từ "Đã thuộc":          +5⭐
Bonus mic đọc đúng:         +5⭐ (optional)
Hoàn thành cả pack lần đầu: +50⭐ (1 lần duy nhất)
Ôn lại pack đã hoàn thành:  +5⭐ mỗi từ, KHÔNG bonus
```

---

## 4. TÍCH HỢP VỚI HỆ THỐNG SẴN CÓ

### 4.1 Word History (`mm_hist`)
Mỗi từ "Đã thuộc" lần đầu → push vào `mm_hist` với `source: 'theme:animals'` để Parent Dashboard phân loại được.

```js
wordHist.push({
  english: 'cat',
  vietnamese: 'Con mèo',
  emoji: '🐱',
  timestamp: Date.now(),
  source: 'theme:animals'
});
```

### 4.2 Streak Calendar
Mở pack + học ít nhất 1 từ = đã tick streak hôm nay (giống Magic Scan).

### 4.3 Sticker Album
Hoàn thành pack = unlock sticker theme tương ứng. Dùng cơ chế hiện có, chỉ cần gọi:
```js
unlockStickerByTheme(pack.sticker_theme);
```

### 4.4 Mascot Bibi
- Vào màn pack: state `idle`
- Tap "✅ Đã thuộc": state `happy` (200ms)
- Hoàn thành pack: state `celebrate`
- Pack chưa mở (tap card): state `wave`

---

## 5. SCREENS HTML SKELETON

```html
<!-- Themes List -->
<div id="s-themes" class="screen hidden">
  <div class="topbar">
    <button class="btn-back" onclick="go('s-home')">←</button>
    <h2>📚 Chủ đề</h2>
    <span class="score-pill">⭐ <span id="th-score">0</span></span>
  </div>
  <p class="subtitle">Hôm nay học gì với bé?</p>
  <div class="theme-grid" id="theme-grid"></div>
</div>

<!-- Theme Pack (Flashcard) -->
<div id="s-theme-pack" class="screen hidden">
  <div class="topbar">
    <button class="btn-close" onclick="exitPack()">✕</button>
    <span class="pack-progress"><span id="pp-cur">1</span> / <span id="pp-total">8</span></span>
  </div>
  <div class="flashcard" id="flashcard">
    <!-- emoji, en, phonetic, vi, sentence -->
  </div>
  <div class="card-actions">
    <button class="btn-tts" onclick="ttsCurrent()">🔊 Nghe lại</button>
    <button class="btn-mic" onclick="micCurrent()">🎤 Nói thử</button>
    <div class="action-row">
      <button class="btn-unsure" onclick="markUnsure()">🤔 Chưa rõ</button>
      <button class="btn-known"  onclick="markKnown()">✅ Đã thuộc</button>
    </div>
  </div>
</div>

<!-- Theme Complete -->
<div id="s-theme-complete" class="screen hidden">
  <div class="celebrate-container">
    <div class="celebrate-emoji">🎉</div>
    <h1>Tuyệt vời!</h1>
    <p>Bé đã học xong chủ đề <span id="tc-name"></span>! <span id="tc-icon"></span></p>
    <div class="bonus-row">⭐ +50 bonus hoàn thành</div>
    <div class="stats-row">📊 <span id="tc-learned">8</span>/<span id="tc-total">8</span> từ đã thuộc</div>
    <div class="sticker-unlock" id="tc-sticker"></div>
    <button class="btn-primary" onclick="go('s-themes')">Học chủ đề khác</button>
    <button class="btn-secondary" onclick="go('s-home')">Về trang chủ</button>
  </div>
</div>
```

---

## 6. PROMPT CHO CLAUDE CODE

```
Tôi đang phát triển app Magic Moment (web học tiếng Anh cho trẻ 3-6 tuổi). 
Hiện tại đã có v4.0 production. Đọc STATUS.md và SKILL.md trong project trước.

NHIỆM VỤ: Build feature "Theme Packs" (Phase 3, feature đầu tiên) vào file index.html hiện có.

ĐÂY LÀ FILE THEME_PACKS_DESIGN.md đính kèm — chứa toàn bộ data structure, UX flow, 
HTML skeleton, scoring rules. Đọc kỹ và implement đúng theo spec.

YÊU CẦU CỤ THỂ:
1. THÊM constant THEME_PACKS (5 packs hardcoded trong design doc) vào script.
2. THÊM 3 screens mới: s-themes, s-theme-pack, s-theme-complete (HTML skeleton có sẵn).
3. THÊM tile "📚 Chủ đề" vào home screen, layout 2x2 grid (Scan, Scene, Story, Theme).
4. THÊM CSS styles cho 3 screens mới — theo design system hiện tại 
   (CSS vars: --gold, --coral, --mint, --amber, --rose; fonts Baloo 2 / Caveat / Nunito).
5. THÊM logic JS:
   - openTheme(packId): load pack, reset queue, show first card
   - markKnown() / markUnsure(): theo flow trong design
   - completeTheme(): hiện màn complete + confetti + +50⭐ + unlock sticker
   - Quản lý state mm_themes trong localStorage
6. TÍCH HỢP với hệ thống có sẵn:
   - Push vào wordHist với source: 'theme:packId'
   - Tick streak hôm nay
   - Trigger sticker unlock theo sticker_theme
   - Update Daily Quest nếu có quest "học chủ đề"
   - Mascot Bibi states
7. TTS dùng hàm speakWord() có sẵn. Mic optional dùng SpeechRecognition vi-VN có sẵn.

RÀNG BUỘC:
- KHÔNG phá vỡ feature cũ. Test lại Magic Scan, Scene, StoryDuo vẫn chạy.
- KHÔNG dùng external CSS/JS. Single-file HTML.
- KHÔNG gọi API cho theme packs (dùng data hardcoded).
- Validate JS sau khi sửa: 
  node -e "new Function(require('fs').readFileSync('index.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1])"
- Mọi text user-facing: tiếng Việt.
- Mobile-first, max-width 480px, safe area.
- Confetti khi hoàn thành pack (dùng hàm confetti() có sẵn).

ACCEPTANCE TEST:
1. Mở app → home thấy tile "📚 Chủ đề" → tap → vào s-themes → thấy 5 packs
2. Tap pack Animals → flashcard cat → nghe TTS "cat" → tap "Đã thuộc" → sang dog
3. Học hết 8 từ → màn complete → confetti + +50⭐ + sticker animals unlock
4. Quay lại pack đã hoàn thành → vào ôn tập → KHÔNG cộng +50 lần 2
5. Reload trang → state mm_themes vẫn còn, progress bar trên card đúng
6. Sau khi học → Parent Dashboard có thể filter từ source 'theme:*'

Bắt đầu bằng việc đọc index.html hiện có để hiểu structure, rồi mới sửa.
Output: file index.html duy nhất đã update.
```

---

## 7. SAU KHI SHIP — UPDATE DOC

### `STATUS.md` thêm vào "Đã hoàn thành":
```
#### Phase 3 — Curriculum Foundation  
- **Theme Packs** — 5 chủ đề starter (Animals, Colors, Food, Body, Numbers)
- 8 từ × 5 pack = 40 từ vựng có cấu trúc
- Flashcard UI: emoji + EN + IPA + VI + sentence + TTS + mic
- Auto unlock sticker khi complete pack
- localStorage key mới: mm_themes
```

### `SKILL.md` thêm section mới:
```
## 9. THEME PACKS PATTERN

### Hardcoded Curriculum (offline-first)
- Constant THEME_PACKS = [...]
- Mỗi pack: id, title, icon, color, words[]
- Không gọi API → instant load

### Flashcard Queue
- queue = [...words] (clone, không mutate gốc)
- markKnown: pop, push vào learned[], next
- markUnsure: pop, push lại cuối queue → gặp lại
- Hết queue = complete

### Pack Completion Logic
- completed=true CHỈ set lần đầu
- Bonus +50⭐ CHỈ trao lần đầu
- Sticker unlock CHỈ lần đầu
- Lần 2+: ôn tập, vẫn +5⭐/từ
```

---

## ƯỚC TÍNH

| Hạng mục | Effort |
|----------|--------|
| Data hardcoded (5 packs) | 30 phút |
| 3 screens HTML + CSS | 2-3h |
| Logic JS (queue, scoring, integration) | 2-3h |
| Test + fix bugs | 1h |
| **Tổng** | **~6-7h** với Claude Code |

---

*Document version 1.0 — 29/04/2026*
*Spec này đủ chi tiết để Claude Code build trong 1 session.*
