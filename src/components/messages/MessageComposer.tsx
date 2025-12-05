import * as React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

interface MessageComposerProps {
  onSubmit: (content: string) => Promise<void> | void;
  disabled?: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({ onSubmit, disabled }) => {
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!value.trim() || disabled) return;

    try {
      setIsSubmitting(true);
      await onSubmit(value.trim());
      setValue("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSendDisabled = disabled || isSubmitting || !value.trim();

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3" aria-label="Enviar mensagem">
      <div className="flex-1">
        <label htmlFor="message" className="sr-only">
          Mensagem
        </label>
        <Textarea
          id="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          className="textarea-glass text-sm"
          placeholder="Escreva uma mensagem para esta frequência…"
        />
      </div>
      <Button
        type="submit"
        variant="primaryGlass"
        size="lg"
        className="btn-primary-glass px-5"
        disabled={isSendDisabled}
        aria-label="Enviar mensagem"
      >
        Enviar
      </Button>
    </form>
  );
};
