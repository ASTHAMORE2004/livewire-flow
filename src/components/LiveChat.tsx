import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  user: string;
  text: string;
  color: string;
  time: string;
}

const COLORS = [
  "hsl(4, 90%, 62%)",
  "hsl(165, 80%, 48%)",
  "hsl(45, 90%, 55%)",
  "hsl(200, 80%, 55%)",
  "hsl(280, 70%, 60%)",
  "hsl(30, 85%, 55%)",
];

const NAMES = [
  "PixelNinja", "CodeWizard", "StreamFan42", "NightOwl", "ByteRunner",
  "GlitchQueen", "DevDude", "CyberSage", "StarGazer", "TurboMax",
  "ZenCoder", "FluxMaster", "NeonVibes", "EchoBot", "AstroKid",
];

const MESSAGES = [
  "🔥 This is amazing!", "Let's goooo!", "First time here, loving it!",
  "Can you explain that again?", "😂😂😂", "This is so cool",
  "Hello from India! 🇮🇳", "Great stream!", "W content 🙌",
  "Subscribed!", "The audio is perfect", "Who else is watching at 2AM?",
  "poggg", "Best stream today", "Love the energy!", "GG!", "💯💯",
  "How do you do that?", "Mind = blown 🤯", "Can we get a shoutout?",
];

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initial: ChatMessage[] = [];
    for (let i = 0; i < 8; i++) {
      initial.push({
        id: i,
        user: NAMES[Math.floor(Math.random() * NAMES.length)],
        text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        time: getTime(),
      });
    }
    return initial;
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(100);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        const msg: ChatMessage = {
          id: idRef.current++,
          user: NAMES[Math.floor(Math.random() * NAMES.length)],
          text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          time: getTime(),
        };
        return [...prev.slice(-50), msg];
      });
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        user: "You",
        text: input.trim(),
        color: "hsl(4, 90%, 62%)",
        time: getTime(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="badge badge-live text-[10px]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
          LIVE
        </span>
        <span className="font-display text-sm font-semibold text-foreground">Chat</span>
        <span className="ml-auto text-xs text-muted-foreground">{messages.length} msgs</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <div key={msg.id} className="mb-1.5 animate-fade-in-up" style={{ animationDuration: "0.25s" }}>
            <span className="text-[10px] text-muted-foreground mr-1.5">{msg.time}</span>
            <span className="text-xs font-semibold" style={{ color: msg.color }}>{msg.user}</span>
            <span className="text-xs text-secondary-foreground"> {msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-border p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          className="input-field flex-1 text-sm"
        />
        <button type="submit" className="btn-primary px-3 py-2 text-xs">
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
