/**
 * Skeleton loader for event cards — shown while
 * the grid "loads" for a brief moment on page entry.
 * Mimics the exact layout of EventCard so there's
 * zero layout shift when real cards replace them.
 */

const EventCardSkeleton = () => (
  <div className="event-card animate-pulse">
    {/* Thumbnail placeholder */}
    <div className="aspect-[16/9] bg-secondary" />

    {/* Body */}
    <div className="p-3.5">
      {/* Avatar + title block */}
      <div className="mb-2.5 flex gap-2.5">
        <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-secondary" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-4/5 rounded bg-secondary" />
          <div className="h-3 w-2/5 rounded bg-secondary" />
        </div>
      </div>

      {/* Date row */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-secondary" />
        <div className="h-3 w-24 rounded bg-secondary" />
        <div className="h-3 w-16 rounded bg-secondary" />
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2">
        <div className="h-9 flex-1 rounded-xl bg-secondary" />
        <div className="h-9 w-9 rounded-lg bg-secondary" />
        <div className="h-9 w-9 rounded-lg bg-secondary" />
      </div>
    </div>
  </div>
);

export default EventCardSkeleton;
