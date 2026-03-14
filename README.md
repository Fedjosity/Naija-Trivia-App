# 📱 Daily Naija Trivia - Mobile App

The consumer-facing mobile application for the Daily Naija Trivia platform. Built with a focus on **offline-first performance**, **premium UX**, and **Nigerian cultural richness**.

---

## 🚀 Tech Stack

- **Core**: [Expo SDK 54](https://expo.dev/) / React Native
- **Routing**: [Expo Router v6](https://docs.expo.dev/router/introduction/) (Link-based, File-system routing)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Persistence**: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) (Ultra-fast synchronous storage)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **File System**: [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/) (For managing downloaded trivia packs)

---

## 🛠️ Project Structure

```text
apps/mobile-app/
├── app/                # Expo Router directory (screens & layouts)
│   ├── _layout.tsx     # Root layout & providers
│   ├── index.tsx       # Landing / Home screen
│   ├── game/           # In-game screens (Daily Challenge)
│   └── packs/          # Library of offline-available packs
├── assets/             # App icons, splash screens, and illustrations
├── global.css          # Tailwind/NativeWind global styles
├── tailwind.config.js  # Tailwind configuration (Brand palette)
└── app.json            # Expo configuration
```

---

## 📂 Key Features

### 1. Offline-First Architecture
The app is designed to work without an internet connection. It synchronizes approved trivia packs from the backend/admin dashboard and stores them locally using **MMKV** and the **Expo FileSystem**.

### 2. Premium Design System
Leverages a custom brand palette defined in `tailwind.config.js`:
- **Primary (Naija Green)**: `#004D40`
- **Secondary (Victory Gold)**: `#FFD700`
- **Background**: Glassmorphic and dark-mode first depth.

### 3. Shared Logic
Uses workspace packages for data integrity:
- `@antigravity/content-schema`: Shared Zod schemas for trivia questions.
- `@antigravity/utils`: Shared helper functions.

---

## 🏃 Getting Started

### Prerequisites
- Node.js & pnpm
- Expo Go (on your physical device)

### Installation
From the **root** of the monorepo:
```bash
pnpm install
```

### Android Studio & Emulator
1.  **Install Android Studio**: Ensure you have the latest version of [Android Studio](https://developer.android.com/studio) installed.
2.  **Configure SDK**: In Android Studio, go to `Settings > Languages & Frameworks > Android SDK`. Install the latest SDK Platform and Build Tools.
3.  **Environment Variables**: Ensure `ANDROID_HOME` is set in your system environment variables and `platform-tools` is in your `PATH`.
4.  **Launch Emulator**: Open `Device Manager` in Android Studio and start a Virtual Device (Pixel 6 or higher recommended).
5.  **Run with Android**:
    ```bash
    pnpm android --filter mobile-app
    ```

---

## 💎 Design Vision
For detailed UI/UX specifications and "million-dollar budget" design prompts, see the [Design Guide](../../brain/be58074c-513a-4374-9466-3261b1772d59/design_prompt.md) in the project artifacts.
