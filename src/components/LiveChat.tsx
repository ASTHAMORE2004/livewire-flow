import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Simulated live chat — messages trickle in on a timer
  and the user can type their own messages too.
  Everything stays in local state (no backend needed).
*/

interface Message {
  id: number;
  username: string;
  text: string;
  color: string;
  timestamp: string;
  isOwn?: boolean;
}

// Pool of fake usernames and things they might say
const USERNAMES = [
  "PixelNinja", "CodeWitch", "StreamFan42", "NightOwl_", "ByteRunner",
  "GlitchQueen", "devDoodle", "CyberSage", "xStarGazer", "TurboMax",
  "ZenCoder99", "FluxMaster", "NeonVibes", "EchoBot", "lunar.kid",
];

const CHAT_LINES = [
  "🔥 this is incredible!", "let's gooooo", "first time here, love it!",
  "can you explain that part?", "😂😂😂", "sooo good",
  "hello from Mumbai! 🇮🇳", "amazing stream!", "W content 🙌",
  "just subscribed!", "the audio quality is insane", "anyone else up at 2am? lol",
  "poggg", "best stream today no cap", "love the energy ⚡", "GG!",
  "💯💯💯", "how did you do that?", "mind = blown 🤯", "can I get a shoutout?",
  "this chat is vibing", "hahaha nice one", "saved this for later 🔖",
];

const COLORS = [
  "hsl(8, 85%, 58%)", "hsl(172, 66%, 50%)", "hsl(45, 88%, 55%)",
  "hsl(210, 75%, 60%)", "hsl(280, 65%, 62%)", "hsl(32, 80%, 55%)",
  "hsl(340, 70%, 60%)",
];

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const LiveChat = () => {
  const msgIdRef = useRef(50);

  // seed a few initial messages so the chat doesn't start empty
  const [messages, setMessages] = useState<Message[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      username: pickRandom(USERNAMES),
      text: pickRandom(CHAT_LINES),
      color: pickRandom(COLORS),
      timestamp: formatTime(),
    }))
  );

  const [draft, setDraft] = useState("");
  const scrollAnchor = useRef<HTMLDivElement>(null);

  // keep the chat scrolled to the bottom whenever new messages come in
  const scrollToBottom = useCallback(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  // drip-feed fake messages every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const incoming: Message = {
        id: msgIdRef.current++,
        username: pickRandom(USERNAMES),
        text: pickRandom(CHAT_LINES),
        color: pickRandom(COLORS),
        timestamp: formatTime(),
      };

      setMessages((prev) => [...prev.slice(-60), incoming]);
    }, 2200 + Math.random() * 2500);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: msgIdRef.current++,
        username: "You",
        text,
        color: "hsl(8, 85%, 58%)",
        timestamp: formatTime(),
        isOwn: true,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="glass-panel flex h-full flex-col overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-border/60 px-4 py-2.5">
        <span className="badge badge-live text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-white inline-block" />
          LIVE
        </span>
        <span className="font-display text-sm font-semibold text-foreground">Stream Chat</span>
        <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">
          {messages.length} messages
        </span>
      </div>

      {/* messages area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin" style={{ minHeight: 0 }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.isOwn ? 10 : -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-1"
            >
              <div className={`rounded-md px-2 py-1 text-[13px] leading-relaxed ${msg.isOwn ? "bg-primary/10" : ""}`}>
                <span className="text-[10px] text-muted-foreground mr-1.5 tabular-nums">{msg.timestamp}</span>
                <span className="font-semibold" style={{ color: msg.color }}>{msg.username}</span>
                <span className="text-secondary-foreground ml-1">{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={scrollAnchor} />
      </div>

      {/* input */}
      <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border/60 p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Say something..."
          className="input-field flex-1 text-sm py-2.5"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="btn-primary px-4 py-2.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
