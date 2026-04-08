import { useState } from "react";
import { Link } from "react-router-dom";
import type { Event } from "../data/events";

interface Props {
  event: Event;
  index: number;
}

const EventCard = ({ event, index }: Props) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(`${window.location.origin}/event/${event.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      className="glass-card group overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {event.isLive && (
            <span className="badge badge-live">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
              LIVE
            </span>
          )}
          <span className="badge badge-category">{event.category}</span>
        </div>

        {/* Viewers */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          {event.viewers.toLocaleString()}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="mb-2 flex items-start gap-3">
          <img src={event.hostAvatar} alt={event.host} className="mt-0.5 h-8 w-8 rounded-full object-cover ring-2 ring-border" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-sm font-semibold leading-snug text-foreground line-clamp-2">
              {event.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{event.host}</p>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {event.date} · {event.time}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to={`/event/${event.id}`} className="btn-primary flex-1 text-center text-xs">
            {event.isLive ? "Watch Live" : "View Event"}
          </Link>

          <button
            onClick={handleLike}
            className="btn-ghost"
            aria-label="Like"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? "hsl(4, 90%, 62%)" : "none"}
              stroke={liked ? "hsl(4, 90%, 62%)" : "currentColor"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="btn-ghost relative"
            aria-label="Share"
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(165, 80%, 48%)" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
