# EVM-OS | The Ultimate Election Learning Assistant

A state-of-the-art, ultra-premium web application designed to educate citizens about the democratic process. Featuring a hyper-realistic Mock EVM Simulator, cinematic 3D animations, and powerful Google Services integrations.

## 🎯 Chosen Vertical
**Civic Engagement & Education**

## ✨ Core Features
*   **Dual-Theme Premium UI**: Seamless Light and Dark mode featuring dynamic glassmorphism and stunning color gradients.
*   **Mock EVM Simulator**: An interactive, tactile Electronic Voting Machine simulator that visually and audibly mimics the real voting process, complete with security locks.
*   **Interactive Election Timeline**: A 3D-perspective animated journey through the phases of an election.
*   **Knowledge Quiz**: An engaging assessment tool featuring progress tracking and a physics-based canvas confetti explosion upon perfect completion.
*   **Animated Statistics**: Beautiful counters showcasing the scale of national elections.
*   **Accessibility First**: Fully navigable via keyboard, ARIA-labeled, screen-reader friendly, and highly legible across all devices.

## 🚀 Google Services Integrations
To maximize functionality and production readiness, EVM-OS leverages several powerful Google APIs:
1.  **Google Maps Embed API**: The *Booth Locator* section features an embedded, styled Google Map allowing voters to visually understand where they might cast their ballot.
2.  **Firebase Firestore**: The *Quiz* section connects to a Firebase backend, allowing users to persist their high scores remotely.

## 🛠️ Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/election-learning-app.git
    cd election-learning-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Environment Variables Setup:
    Create a `.env` file in the root of the project and add your Firebase API keys:
    ```env
    # Firebase Configuration
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=1:your_app_id:web:your_web_id
    ```
4.  Run the Development Server:
    ```bash
    npm run dev
    ```

## 🧪 Testing Instructions
The project utilizes **Vitest** and **React Testing Library** for component validation.

1.  To execute the test suite:
    ```bash
    npm run test
    ```
2.  **Current Test Coverage**:
    *   `App.test.jsx`: Validates that the cinematic Hero component correctly renders core typography.
    *   `Quiz.test.jsx`: Simulates user interaction to verify score calculation and success messaging.
    *   `MockEVM.test.jsx`: Ensures the EVM voting flow correctly captures selection, opens the confirmation modal, and securely locks the interface post-vote.

## 🌐 Deployment Instructions
The application is optimized with Vite and ready for modern edge-deployment platforms like Vercel, Netlify, or Firebase Hosting.

1.  Build the production bundle:
    ```bash
    npm run build
    ```
2.  Preview the production build locally:
    ```bash
    npm run preview
    ```
3.  *For Vercel/Netlify*: Simply connect your GitHub repository and ensure your Environment Variables are mapped in the platform's dashboard.

## ♿ Accessibility Improvements
*   **Semantic Structure**: Replaced redundant `div` tags with `<main>`, `<section>`, `<header>`, and `<footer>` for strict semantic compliance.
*   **Keyboard Navigation**: Added specific `focus-visible:ring` tailwind utilities to ensure all interactive elements (buttons, inputs, accordions) exhibit a clear, high-contrast outline when navigated via the `Tab` key.
*   **ARIA Attributes**: Integrated `aria-label` tags on icon-only buttons (like the theme toggle and chat triggers) to ensure screen-readers properly describe the actions.
*   **Multilingual Support**: Google Translate injection allows immediate native-language conversion.

## 🔮 Future Scope
*   **Real-time Leaderboards**: Expand the Firebase implementation to show global high scores for the Election Quiz.
*   **Voter Roll API Integration**: Connect the Booth Locator to live government APIs (where available) to map exact user voter IDs to precise coordinates.
