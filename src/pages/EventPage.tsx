import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import LiveChat from "../components/LiveChat";
import { events } from "../data/events";

/**
 * Event streaming page — reached when a user clicks on a card.
 * Shows the embedded video alongside a live chat panel.
 * On desktop, chat sits to the right of the video.
 * On mobile/tablet, chat drops below the description.
 */
const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-4 rounded-full bg-secondary p-5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p className="font-display text-xl font-bold text-foreground">Event not found</p>
          <p className="mt-1 text-sm text-muted-foreground">It might have been removed or the link is incorrect.</p>
          <Link to="/" className="btn-primary mt-5">← Back to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-5 sm:py-6">
        {/* Breadcrumb back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground group"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to events
          </Link>
        </motion.div>

        {/* Main layout: video + chat side-by-side on lg+ */}
        <div className="mt-3 flex flex-col gap-5 lg:flex-row">
          {/* Left column — video and info */}
          <div className="min-w-0 flex-1">
            {/* Video embed */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card"
            >
              <iframe
                src={event.videoUrl}
                title={event.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Event meta — title, host, viewers */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5"
            >
              <div className="flex flex-wrap items-start gap-3">
                <img
                  src={event.hostAvatar}
                  alt={event.host}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-border flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-xl font-bold text-foreground leading-tight sm:text-2xl">
                    {event.title}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-medium text-secondary-foreground">{event.host}</span>
                    <span className="hidden sm:inline text-border">·</span>
                    <span className="flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {event.viewers.toLocaleString()} watching
                    </span>
                    <span className="hidden sm:inline text-border">·</span>
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>

                {event.isLive && (
                  <span className="badge badge-live self-start mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white inline-block" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Category tag */}
              <div className="mt-3 flex gap-2">
                <span className="badge badge-category">{event.category}</span>
              </div>
            </motion.div>

            {/* Description panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 rounded-lg border border-border bg-card p-5"
            >
              <h2 className="font-display text-base font-semibold text-foreground mb-3">
                About this event
              </h2>
              <p className="text-sm leading-relaxed text-secondary-foreground">
                {event.description}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary-foreground">
                Thousands of viewers are tuning in from across the globe. Whether you're a beginner 
                or an expert, there's something here for you. Jump into the live chat, connect with 
                fellow attendees, and make the most of this experience. Don't be shy — the community 
                is what makes these events special.
              </p>

              {/* a couple of helpful detail rows */}
              <div className="mt-5 flex flex-wrap gap-4 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {event.viewers.toLocaleString()} viewers
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — Live Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[350px] xl:w-[380px] flex-shrink-0"
          >
            <div className="sticky top-20 h-[420px] sm:h-[480px] lg:h-[calc(100vh-6rem)]">
              <LiveChat />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;
