import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient.ts";
import type { FrequencyDto } from "@/lib/types.ts";
import { useMessages } from "@/hooks/useMessages.ts";
import { AppHeader } from "@/components/layout/AppHeader.tsx";
import { MessageComposer } from "@/components/messages/MessageComposer.tsx";
import { MessageBubble } from "@/components/messages/MessageBubble.tsx";

const FrequencyPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const frequencyQuery = useQuery({
    queryKey: ["frequency", slug],
    queryFn: () => apiClient.getFrequencyBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  const frequency: FrequencyDto | undefined = frequencyQuery.data?.data;

  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, sendMessage } =
    useMessages(frequency?.id);

  const handleSend = async (content: string) => {
    if (!frequency) return;
    await sendMessage({ content });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 px-4 py-6 md:px-8">
        <section className="max-w-5xl mx-auto space-y-4">
          <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.18em] mb-1">
                Frequência pública
              </p>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                {frequency?.name ?? "Carregando frequência…"}
              </h1>
              {frequency?.description && (
                <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                  {frequency.description}
                </p>
              )}
            </div>
            <Link to="/dashboard" className="text-xs text-muted-foreground story-link">
              ← Voltar para o dashboard
            </Link>
          </header>

          {isError && (
            <p className="text-sm text-destructive">
              Não foi possível carregar mensagens desta frequência. Verifique se o slug está correto.
            </p>
          )}

          <section
            aria-label="Mensagens da frequência"
            className="glass-card flex flex-col h-[60vh] md:h-[65vh] p-3 md:p-4"
          >
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {isLoading && (
                <p className="text-sm text-muted-foreground">Carregando mensagens…</p>
              )}

              {!isLoading && messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhuma mensagem ainda. Seja a primeira pessoa a enviar algo nesta frequência.
                </p>
              )}

              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {hasNextPage && (
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="mt-2 text-xs text-primary hover:underline disabled:opacity-50"
                >
                  {isFetchingNextPage ? "Carregando mais…" : "Carregar mensagens anteriores"}
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-border mt-3">
              <MessageComposer onSubmit={handleSend} disabled={!frequency} />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default FrequencyPage;
