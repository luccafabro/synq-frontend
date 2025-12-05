import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiClient } from "@/lib/apiClient.ts";
import type { FrequencyDto } from "@/lib/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { AppHeader } from "@/components/layout/AppHeader.tsx";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["frequencies"],
    queryFn: () => apiClient.getAllFrequencies(),
  });

  const frequencies: FrequencyDto[] = data?.data ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-8">
        <section className="max-w-5xl mx-auto space-y-6">
          <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Frequências públicas disponíveis para acompanhar em tempo real.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://docs.lovable.dev/"
                target="_blank"
                rel="noreferrer"
                className="story-link"
              >
                Ver documentação da API
              </a>
            </Button>
          </header>

          <section aria-busy={isLoading} aria-live="polite" className="space-y-4">
            {isLoading && (
              <p className="text-sm text-muted-foreground">Carregando frequências públicas…</p>
            )}

            {isError && !isLoading && (
              <p className="text-sm text-destructive">
                Não foi possível carregar as frequências. Verifique a configuração de API_BASE_URL.
              </p>
            )}

            {!isLoading && !isError && frequencies.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhuma frequência pública encontrada. Crie suas frequências via API Synq.
              </p>
            )}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {frequencies.map((frequency) => (
                <article
                  key={frequency.id}
                  className="glass-card glass-card-hover hover-lift p-4 flex flex-col justify-between"
                >
                  <header className="space-y-1">
                    <h2 className="text-base font-semibold leading-tight line-clamp-2">
                      {frequency.name}
                    </h2>
                    {frequency.description && (
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {frequency.description}
                      </p>
                    )}
                  </header>

                  <footer className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{frequency.slug}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/frequencies/${frequency.slug}`} className="story-link">
                        Abrir frequência
                      </Link>
                    </Button>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
