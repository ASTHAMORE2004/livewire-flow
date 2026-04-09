# VickyBytes — Live Event Streaming Platform

A fully responsive, frontend-only live event streaming platform built as a **Frontend Engineering Assignment**. The app lets users browse live and upcoming events, filter by category or search, and navigate into individual event pages featuring embedded video streams, event details, and a simulated real-time chat experience.

> No backend. No Firebase. No shadcn UI. Pure frontend craftsmanship.

---

## Project Overview

This project demonstrates scalable frontend architecture, clean responsive UI design, and production-quality code through two core pages:

### Part 1 — Event Listing Page
- Displays **15 event cards** in a responsive grid layout
- Each card includes: event image, title, ❤️ like toggle, 🔗 share button, view/watch button, schedule date & time, category badge, and viewer count
- **Search bar** with real-time filtering by event name, host, or category
- **Category filter pills** (Technology, Music, Gaming, Design, Business, Wellness, Lifestyle, Entertainment)
- Staggered entrance animations for a polished first impression

### Part 2 — Event Streaming Page
- Click any event card to navigate with a **smooth page transition** (fade + scale + blur)
- **Responsive video container** with embedded YouTube/Twitch livestream
- **Simulated live chat** panel — messages drip in automatically, users can type and send their own messages, with auto-scroll to latest
- **Event description section** with clean typography, host info, viewer count, date/time, and category
- Chat sits beside the video on desktop, stacks below on mobile/tablet

### Bonus Features
- Framer Motion page transitions and micro-interactions
- Spring-based like button animation
- Clipboard-based share functionality
- Mobile hamburger menu with animated open/close
- Custom dark theme with glassmorphism effects

---

## Tech Stack Used

| Technology | Purpose |
|---|---|
| **React 18** | Component architecture and UI rendering |
| **TypeScript** | Type safety across the entire codebase |
| **React Router v6** | Client-side routing and navigation |
| **Tailwind CSS v3** | Utility-first styling and responsive design |
| **Framer Motion** | Page transitions, staggered animations, and micro-interactions |
| **Vite 5** | Lightning-fast dev server and optimized production builds |

---

## Setup Instructions

### Prerequisites

- **Node.js** 18 or higher (or **Bun**)
- **npm**, **yarn**, or **bun** package manager

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/vickybytes-live-events.git
cd vickybytes-live-events
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx            # Top navigation with mobile hamburger menu
│   ├── EventCard.tsx         # Event card with like, share, and view actions
│   ├── SearchAndFilter.tsx   # Search input + category filter pills
│   └── LiveChat.tsx          # Simulated real-time chat panel
├── data/
│   └── events.ts             # Mock data for 15 unique events
├── pages/
│   ├── Index.tsx              # Event listing / landing page
│   ├── EventPage.tsx          # Event streaming page with video + chat
│   └── NotFound.tsx           # 404 fallback page
├── App.tsx                    # Router setup + animated page transitions
├── index.css                  # Design tokens, custom classes, global styles
└── main.tsx                   # Application entry point
```

---

## 📱 Responsiveness

The UI is fully responsive across all device sizes using Tailwind responsive utilities:

- **Mobile** (375px) — Single column cards, stacked video/chat, hamburger nav
- **Tablet** (768px) — Two-column grid, adjusted spacing
- **Desktop** (1280px+) — Four-column grid, side-by-side video and chat

---

## 🌐 Deployment Link

**Live Demo:** [https://livewireflow.vercel.app/](https://livewireflow.vercel.app/)

---

## License

MIT
