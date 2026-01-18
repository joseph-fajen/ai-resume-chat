import { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { cn } from "@/lib/utils";
import { demoResponses, josephProfile } from "@/data/joseph-fajen";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedQuestions = [
  "Tell me about the AI chatbot you built — what was the technical approach?",
  "Is this person technical enough to work directly with engineers?",
  "What's the difference between a technical writer and a documentation lead?",
  "Tell me about a failure and what you learned from it.",
];

// Build profile context string for API - structured to emphasize differentiators
const buildProfileContext = () => {
  const fp = josephProfile.featuredProject;

  return `
NAME: ${josephProfile.name}
POSITIONING: ${josephProfile.positioning}
STATUS: ${josephProfile.status}

FEATURED PROJECT (lead with this - it's a key differentiator):
${fp.name} - ${fp.description}
Role: ${fp.role}
Technical stack: ${fp.technicalStack.join(", ")}
Key accomplishments:
${fp.highlights.map(h => `  • ${h}`).join("\n")}
Why this matters: ${fp.why}

SUMMARY:
${josephProfile.summary}

EXPERIENCE:
${josephProfile.experience
  .map(
    (exp) => `
${exp.company} (${exp.period}): ${exp.role}
Highlights: ${exp.highlights.join("; ")}
Situation: ${exp.aiContext.situation}
Approach: ${exp.aiContext.approach}
Technical work: ${exp.aiContext.technicalWork}
Lessons learned: ${exp.aiContext.lessonsLearned}
`
  )
  .join("")}

SKILLS:
Strong: ${josephProfile.skills.strong.join(", ")}
Moderate: ${josephProfile.skills.moderate.join(", ")}
Gaps (be honest about these): ${josephProfile.skills.gaps.join(", ")}

DOCUMENTED FAILURES (share these honestly when relevant):
${josephProfile.failures.map((f) => `- ${f.year}: ${f.title}
  What happened: ${f.details}
  Lesson: ${f.lessons}`).join("\n")}
`;
};

const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedResponse]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes("chatbot") || q.includes("ai") || q.includes("technical approach")) {
      return demoResponses.aiProject;
    }
    if (q.includes("technical enough") || q.includes("engineer") || q.includes("technical depth")) {
      return demoResponses.technicalDepth;
    }
    if (q.includes("failure") || q.includes("mistake") || q.includes("learned")) {
      return demoResponses.failure;
    }
    if (q.includes("lead") || q.includes("documentation lead") || q.includes("difference")) {
      return demoResponses.leadershipReady;
    }
    return demoResponses.default;
  };

  const typeResponse = (response: string) => {
    setIsTyping(true);
    setDisplayedResponse("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < response.length) {
        setDisplayedResponse(response.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        setDisplayedResponse("");
      }
    }, 8);
  };

  const handleSubmit = async (question: string) => {
    if (!question.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsTyping(true);
    setDisplayedResponse("");

    let fullResponse = "";

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      await fetchEventSource("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          conversation_history: messages,
          profile_context: buildProfileContext(),
        }),
        signal: abortControllerRef.current.signal,
        onmessage(event) {
          if (event.event === "token") {
            const data = JSON.parse(event.data);
            fullResponse += data.content;
            setDisplayedResponse(fullResponse);
          } else if (event.event === "done") {
            setIsTyping(false);
            setMessages((prev) => [...prev, { role: "assistant", content: fullResponse }]);
            setDisplayedResponse("");
          } else if (event.event === "error") {
            console.error("Stream error:", event.data);
            setIsTyping(false);
            // Fallback to demo response
            const fallbackResponse = getResponse(question);
            typeResponse(fallbackResponse);
          }
        },
        onerror(err) {
          console.error("SSE error:", err);
          setIsTyping(false);
          // Fallback to demo response
          const fallbackResponse = getResponse(question);
          typeResponse(fallbackResponse);
          throw err; // Stop retrying
        },
        onclose() {
          // If we get here without a full response, it means connection was closed unexpectedly
          if (fullResponse && !messages.some(m => m.content === fullResponse)) {
            setIsTyping(false);
            setMessages((prev) => [...prev, { role: "assistant", content: fullResponse }]);
            setDisplayedResponse("");
          }
        },
      });
    } catch (error) {
      // AbortError is expected when we abort, don't show fallback
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Chat error:", error);
      setIsTyping(false);
      // Fallback to demo response
      const fallbackResponse = getResponse(question);
      typeResponse(fallbackResponse);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-[80vh] bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-accent-foreground font-serif font-bold">
              J
            </div>
            <div>
              <p className="text-foreground font-medium">Ask AI About Joseph</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Ready to answer your questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isTyping && (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-serif text-foreground mb-2">
                What would you like to know?
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Ask specific questions about Joseph's experience, skills, or fit for your role. Get honest, detailed answers.
              </p>
              <div className="w-full max-w-md space-y-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(q)}
                    className="w-full text-left p-3 bg-secondary rounded-xl text-sm text-foreground hover:bg-muted transition-colors border border-transparent hover:border-accent/30"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                )}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-secondary text-foreground rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {displayedResponse}
                  <span className="inline-block w-2 h-4 bg-accent ml-1 animate-typing-cursor" />
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              disabled={isTyping}
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 bg-accent text-accent-foreground rounded-xl font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
