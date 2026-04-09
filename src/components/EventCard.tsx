import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { playHoverTick, playClickPop } from "../utils/sounds";
import type { Event } from "../data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

/**
 * Individual event card. Each one handles its own
 * like/share state locally since there's no backend.
 * The staggered entrance animation uses the index prop
 * to offset each card's appearance slightly.
 */
const EventCard = ({ event, index }: EventCardProps) => {
  const [liked, setLiked] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  const copyShareLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard?.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Staggered fade-in from below
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleHover = useCallback(() => playHoverTick(), []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="event-card group"
      onMouseEnter={handleHover}
    >
      {/* Thumbnail area */}
      <Link to={`/event/${event.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* top-left badges */}
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
            {event.isLive && (
              <span className="badge badge-live">
                <span className="h-1.5 w-1.5 rounded-full bg-white inline-block" />
                LIVE
              </span>
            )}
            <span className="badge badge-category">{event.category}</span>
          </div>

          {/* viewer count bottom-right */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {event.viewers >= 1000
              ? `${(event.viewers / 1000).toFixed(1)}K`
              : event.viewers}
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-3.5">
        {/* Host avatar + title */}
        <div className="mb-2.5 flex gap-2.5">
          <img
            src={event.hostAvatar}
            alt={event.host}
            className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <div className="min-w-0">
            <Link to={`/event/${event.id}`}>
              <h3 className="font-display text-[0.9rem] font-semibold leading-snug text-foreground line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                {event.title}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">{event.host}</p>
          </div>
        </div>

        {/* Schedule info */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{event.date}</span>
          <span className="text-border">|</span>
          <span>{event.time}</span>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2">
          <Link
            to={`/event/${event.id}`}
            className="btn-primary flex-1 text-center text-xs py-2"
          >
            {event.isLive ? "▶ Watch Live" : "View Event"}
          </Link>

          <button onClick={toggleLike} className="btn-ghost" aria-label="Like this event">
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? "hsl(8, 85%, 58%)" : "none"}
              stroke={liked ? "hsl(8, 85%, 58%)" : "currentColor"}
              strokeWidth="2"
              whileTap={{ scale: 1.35 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </button>

          <button onClick={copyShareLink} className="btn-ghost relative" aria-label="Copy share link">
            {showCopied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(172, 66%, 50%)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
