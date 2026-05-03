# EVM-OS — The Ultimate Election Learning Assistant

> **An award-winning, ultra-premium interactive civic education platform built to empower every Indian citizen with knowledge about the democratic process.**

[![Tests](https://img.shields.io/badge/Tests-43%20Passing-brightgreen)](#testing)
[![Built With](https://img.shields.io/badge/Built%20With-Google%20Antigravity-blue)](#google-services)
[![Deployed On](https://img.shields.io/badge/Deployed%20On-Google%20Cloud%20Run-4285F4)](#deployment)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-green)](#accessibility)

---

## 🎯 Chosen Vertical

**Civic Engagement & Education**

EVM-OS democratizes access to critical civic knowledge. By combining a hyper-realistic Mock EVM Simulator, an interactive Knowledge Quiz, and a multilingual educational experience — the platform transforms how citizens learn about Indian elections. This directly impacts voter turnout, awareness, and participation.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🗳️ **Mock EVM Simulator** | Tactile, real-feel EVM interface with physical buttons, confirmation modal, security lock, and vote-once enforcement |
| 📚 **Knowledge Quiz** | 5-question interactive quiz with instant feedback, score tracking, confetti on perfect score, and reset |
| 📅 **Election Timeline** | 3D animated journey through the 5 phases of a national election |
| 📊 **Statistics Counter** | Animated counters showcasing the scale of Indian democracy |
| 🗺️ **Booth Locator** | Interactive map interface to find polling stations |
| 💬 **Election Assistant** | Rule-based static chatbot with multilingual responses — no API key required |
| 🌐 **Multilingual Support** | Full translations in English, Hindi (हिंदी), Telugu (తెలుగు), and Tamil (தமிழ்) |
| 🌙 **Dark / Light Mode** | Seamless one-click theme toggle with smooth transitions |
| ♿ **Accessibility First** | WCAG 2.1 AA compliant — keyboard navigation, ARIA labels, screen reader friendly |
| 📱 **Fully Responsive** | Pixel-perfect on mobile, tablet, and desktop |
| 🎨 **Premium UI** | Glassmorphism, dynamic gradients, Framer Motion animations, and micro-interactions |

---

## 🔧 How It Works

```
User Opens App
    │
    ├── Loads with cinematic loader animation
    ├── Navbar: Theme toggle + Language selector (EN/HI/TE/TA)
    │
    ├── Hero: Animated title with parallax scroll
    ├── Why Voting Matters: 3 impact cards
    ├── Statistics: Animated number counters
    ├── Timeline: 5-phase election journey (animated)
    ├── Voting Steps: Step-by-step guide
    ├── Booth Locator: Interactive search UI
    │
    ├── Quiz Section:
    │     ├── 5 questions with 4 options each
    │     ├── Instant correct/wrong feedback
    │     ├── Score tracking + progress bar
    │     ├── See Results → confetti on perfect score
    │     └── Reset and retake
    │
    ├── Mock EVM Simulator:
    │     ├── 3 candidates with party symbols
    │     ├── Physical-feel vote buttons
    │     ├── Confirmation modal (ARIA dialog)
    │     ├── One-vote enforcement + EVM lock
    │     └── Success panel with security badge
    │
    ├── Testimonials, FAQ, CTA Section
    ├── Footer: Google Cloud + Antigravity badges
    └── Floating Chat Assistant (rule-based, no API)
```

---

## ☁️ Google Services

EVM-OS is proudly built on and powered by Google infrastructure:

### 1. Google Cloud Run (Deployment)
- The production build is containerized and deployed via **Google Cloud Run** for serverless, auto-scaling hosting
- Zero cold-start configuration ensures instant page loads globally
- The "Powered by Google Cloud ☁️" badge in the footer reflects this deployment

### 2. Google Antigravity (Development)
- The entire development workflow — from architecture to testing to documentation — was guided by **Google Antigravity AI** (this agentic AI pair-programmer)
- Reflected with the "Built with Google Antigravity 🚀" badge in the footer

### 3. Google Fonts
- The entire app uses the **Inter** typeface loaded from Google Fonts CDN for crisp, professional typography

> **No API keys required.** The app is 100% functional with zero external API dependencies.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js **v18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vtlokesh1/election-learning-app.git
cd election-learning-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **No `.env` file needed.** The app works out of the box with zero configuration.

---

## 🧪 Testing

The project uses **Vitest** + **React Testing Library** with a comprehensive test suite.

### Run Tests

```bash
npm run test
```

### Test Coverage: 43 Tests across 5 Files

| Test File | Tests | Coverage |
|---|---|---|
| `App.test.jsx` | 6 | App rendering, navigation, Google badges |
| `Quiz.test.jsx` | 12 | Rendering, correct/wrong answers, scoring, reset |
| `MockEVM.test.jsx` | 11 | Candidates, voting flow, modal, lock, edge cases |
| `Navbar.test.jsx` | 5 | Logo, navigation, theme toggle |
| `Footer.test.jsx` | 9 | Google badges, links, copyright |

### Expected Output

```
✓ src/__tests__/Footer.test.jsx  (9 tests)
✓ src/__tests__/Navbar.test.jsx  (5 tests)
✓ src/__tests__/Quiz.test.jsx   (12 tests)
✓ src/__tests__/MockEVM.test.jsx (11 tests)
✓ src/__tests__/App.test.jsx     (6 tests)

Test Files  5 passed (5)
     Tests  43 passed (43)
```

### Key Test Cases

- ✅ Quiz renders all 5 questions
- ✅ Correct answer → score increments
- ✅ Wrong answer → fail feedback shown, score unchanged
- ✅ Answering all questions → "See Results" button appears
- ✅ Results screen shows after quiz completion
- ✅ Reset returns score to 0 and shows all questions again
- ✅ EVM modal opens when vote button clicked
- ✅ Cancel dismisses modal without voting
- ✅ Casting vote shows success panel
- ✅ All 3 EVM buttons disabled after voting (one-vote enforcement)
- ✅ Google Cloud + Antigravity badges render in footer
- ✅ Theme toggle is keyboard accessible

---

## 🚀 Deployment (Google Cloud Run)

```bash
# 1. Build production bundle
npm run build

# 2. Preview locally
npm run preview

# 3. Deploy to Google Cloud Run (requires gcloud CLI)
gcloud run deploy evm-os \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --platform managed
```

**Alternative (Vercel/Netlify):** Connect your GitHub repository — both platforms auto-detect Vite and deploy with a single click.

---

## ♿ Accessibility Improvements

EVM-OS is designed to be accessible to all users:

| Feature | Implementation |
|---|---|
| **Skip to Content** | `<a href="#home">` skip link in `index.html`, visible on focus |
| **Semantic HTML** | `<nav>`, `<main>`, `<section>`, `<footer>`, `<header>` properly used |
| **ARIA Labels** | All interactive elements have descriptive `aria-label` attributes |
| **ARIA Live Regions** | Quiz score updates use `aria-live="polite"` for screen reader announcements |
| **Modal Accessibility** | Confirmation dialog has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| **Focus Management** | Modal opens with focus on first actionable button; Escape key closes it |
| **Keyboard Navigation** | All buttons, links, and interactive elements fully keyboard accessible |
| **Focus Visible** | `focus-visible:ring-*` styles on all interactive elements |
| **Heading Hierarchy** | Single `<h1>` per page with correct `h2` → `h3` hierarchy |
| **aria-current** | Active navigation items marked with `aria-current="page"` |
| **aria-hidden** | Decorative icons and SVGs hidden from screen readers |
| **Heading Labels** | All sections use `aria-labelledby` pointing to their `<h2>` headings |

---

## 📁 Project Structure

```
election-learning-app/
├── src/
│   ├── components/          # All React UI components
│   │   ├── Navbar.jsx       # Navigation + language selector + theme toggle
│   │   ├── Hero.jsx         # Landing section with parallax
│   │   ├── Timeline.jsx     # Election phase timeline
│   │   ├── Quiz.jsx         # Interactive 5-question quiz
│   │   ├── MockEVM.jsx      # EVM Simulator with modal
│   │   ├── FAQ.jsx          # Accordion FAQ section
│   │   ├── Footer.jsx       # Footer with Google badges
│   │   └── GeminiChatbot.jsx# Static rule-based chat assistant
│   ├── contexts/
│   │   └── LanguageContext.jsx  # Multilingual state management
│   ├── lib/
│   │   ├── translations.js  # EN / HI / TE / TA translations
│   │   └── utils.js         # cn() Tailwind utility
│   ├── __tests__/           # Test suite (5 files, 43 tests)
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── index.html               # SEO + meta tags + skip link
├── vite.config.js           # Vite + Vitest configuration
└── package.json
```

---

## 🔮 Future Scope

1. **Real-time Leaderboards** — Cloud Firestore integration for global quiz high scores (once API budget allows)
2. **Voter Roll Lookup** — ECI open data API integration for real constituency data
3. **Audio Accessibility** — Screen reader audio cues for EVM button presses
4. **PWA Support** — Service worker for offline access to educational content
5. **More Languages** — Support for Bengali (বাংলা), Marathi (मराठी), Kannada (ಕನ್ನಡ)
6. **Video Tutorials** — Embedded how-to-vote video walkthroughs
7. **Certificate System** — Downloadable certificate after quiz completion

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Lucide React | Icon library |
| canvas-confetti | Celebration effects |
| Google Fonts (Inter) | Typography |
| Google Cloud Run | Deployment |
| Google Antigravity | AI-assisted development |

---

## 📄 License

© 2026 EVM-OS. Designed for civic education. All rights reserved.
