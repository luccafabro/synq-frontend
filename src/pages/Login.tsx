import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AppHeader } from "@/components/layout/AppHeader.tsx";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Fluxo de login é apenas mock por enquanto – troque pela sua integração JWT real.
    toast({
      title: "Login simulado",
      description: "Substitua este fluxo pela sua API de autenticação JWT.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="glass-card glass-card-hover max-w-md w-full p-8 space-y-6 animate-scale-in"
          aria-describedby="login-description"
        >
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
            <p id="login-description" className="text-sm text-muted-foreground">
              Autentique-se para acessar o dashboard de frequências.
            </p>
          </header>

          <div className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-glass"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input-glass"
              />
            </div>
          </div>

          <Button type="submit" variant="primaryGlass" size="lg" className="btn-primary-glass w-full">
            Continuar
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Ao continuar, você concorda com os termos de uso e política de privacidade da plataforma Synq.
          </p>

          <p className="text-xs text-muted-foreground text-center">
            Não tem acesso ainda? Entre em contato com um administrador ou{' '}
            <Link to="/" className="story-link">
              explore frequências públicas
            </Link>
            .
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
