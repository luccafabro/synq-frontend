import type { MessageDto } from "@/lib/types.ts";

interface MessageBubbleProps {
  message: MessageDto;
  isOwn?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const date = message.createdAt ? new Date(message.createdAt) : undefined;
  const isValidDate = date && !isNaN(date.getTime());

  const timeLabel = isValidDate
    ? date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    : undefined;

  const classes = [
    "glass-bubble",
    isOwn || message.authorId === -1 ? "glass-bubble-own" : "glass-bubble-other",
  ].join(" ");

  return (
    <article className={classes} aria-label={`Mensagem de ${message.authorUsername ?? "usuário"}`}>
      <header className="mb-1 flex items-center justify-between gap-3">
        <span className="text-xs font-medium opacity-80">
          {message.authorUsername ?? "Usuário"}
        </span>
        {timeLabel && (
          <time className="text-[10px] uppercase tracking-wide opacity-60" dateTime={isValidDate ? date.toISOString() : undefined}>
            {timeLabel}
          </time>
        )}
      </header>
      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
    </article>
  );
};
