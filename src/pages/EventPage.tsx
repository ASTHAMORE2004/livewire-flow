import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LiveChat from "../components/LiveChat";
import { events } from "../data/events";

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32 text-center">
          <p className="font-display text-2xl font-bold text-foreground">Event not found</p>
          <Link to="/" className="btn-primary mt-4">Back to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">
        {/* Back */}
        <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to events
        </Link>

        {/* Video + Chat Layout */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          {/* Video Column */}
          <div className="flex-1 min-w-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card">
              <iframe
                src={event.videoUrl}
                title={event.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Event Info */}
            <div className="mt-4">
              <div className="flex flex-wrap items-start gap-3">
                <img src={event.hostAvatar} alt={event.host} className="h-10 w-10 rounded-full ring-2 ring-border" />
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-lg font-bold text-foreground sm:text-xl lg:text-2xl leading-tight">
                    {event.title}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{event.host}</span>
                    <span>·</span>
                    <span>{event.viewers.toLocaleString()} watching</span>
                    <span>·</span>
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>
                {event.isLive && (
                  <span className="badge badge-live self-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="mt-3 flex gap-2">
                <span className="badge badge-category">{event.category}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <h2 className="font-display text-base font-semibold text-foreground mb-2">About this event</h2>
              <p className="text-sm leading-relaxed text-secondary-foreground">
                {event.description}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary-foreground">
                Join thousands of viewers from across the globe in this exciting event. Whether you're a beginner or an expert, there's something for everyone. Don't forget to participate in the live chat and connect with fellow attendees!
              </p>
            </div>
          </div>

          {/* Chat Column */}
          <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0">
            <div className="sticky top-20 h-[400px] sm:h-[480px] lg:h-[calc(100vh-6rem)]">
              <LiveChat />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;
