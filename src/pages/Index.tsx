import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { AppHeader } from "@/components/layout/AppHeader.tsx";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <section className="max-w-4xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center animate-fade-in">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Plataforma de Frequências
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Mensagens em tempo real com um design{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                liquid glass
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Explore frequências públicas, acompanhe conversas em tempo real e ofereça uma experiência
              premium inspirada no ecossistema Apple.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primaryGlass"
                size="lg"
                className="btn-primary-glass"
                onClick={() => navigate("/dashboard")}
              >
                Entrar nas frequências
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login" className="story-link">
                  Fazer login
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card glass-card-hover p-6 md:p-8">
              <p className="text-sm font-medium text-muted-foreground mb-3">Ao vivo agora</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Frequência "Sincronia Criativa"</p>
                    <p className="text-xs text-muted-foreground">128 membros • 4 mensagens por min</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                    ● Online
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="glass-bubble glass-bubble-other max-w-full">
                    Hoje vamos testar padrões de mensagem em tempo real com a nova API.
                  </p>
                  <p className="glass-bubble glass-bubble-own max-w-full">
                    Perfeito. Vou abrir a frequência pública e acompanhar pelo dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
