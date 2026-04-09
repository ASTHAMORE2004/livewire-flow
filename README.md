# VickyBytes — Live Event Streaming Platform

A responsive, frontend-only live event streaming platform built as part of a frontend engineering assignment. Users can browse upcoming and live events, search and filter by category, and jump into an event page with an embedded video player and a simulated live chat.

---

## Features

- **Event Listing Page** — 15 event cards displayed in a responsive grid with images, like/share/view buttons, schedule info, and category badges.
- **Search & Filter** — Real-time search by title, host, or category. One-click category filters to narrow results.
- **Event Streaming Page** — Full video embed (YouTube/Twitch), event metadata, host info, and a description panel.
- **Simulated Live Chat** — Messages drip in automatically to mimic a real chat experience. Users can type and send their own messages with auto-scroll.
- **Smooth Page Transitions** — Framer Motion–powered fade/scale/blur transitions between listing and event pages.
- **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop using Tailwind responsive utilities.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | Component architecture & UI rendering |
| React Router v6 | Client-side routing between pages |
| Tailwind CSS v3 | Utility-first styling and responsive layout |
| Framer Motion | Page transitions and micro-animations |
| TypeScript | Type safety across the codebase |
| Vite | Dev server and production build tooling |

> **No backend, no Firebase, no shadcn UI** — everything runs client-side with mock data.

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- npm, yarn, or bun

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/vickybytes-live-events.git
cd vickybytes-live-events

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── EventCard.tsx       # Individual event card with like/share
│   ├── SearchAndFilter.tsx # Search input + category filter pills
│   └── LiveChat.tsx        # Simulated live chat panel
├── data/
│   └── events.ts           # Mock event data (15 events)
├── pages/
│   ├── Index.tsx            # Event listing / landing page
│   ├── EventPage.tsx        # Event streaming page
│   └── NotFound.tsx         # 404 fallback
├── App.tsx                  # Router + animated page transitions
├── index.css                # Design tokens + global styles
└── main.tsx                 # App entry point
```

## Deployment

Deployed on **Lovable** — [Live Demo](https://livewire-flow.lovable.app)

## License

MIT
