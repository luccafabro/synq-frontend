import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export const AppHeader = () => {
  return (
    <header className="glass-header sticky top-0 z-30 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-elevation-2" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Synq Frequencies</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Liquid Glass
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hidden sm:inline story-link ${isActive ? "text-foreground" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hidden sm:inline story-link ${isActive ? "text-foreground" : ""}`
            }
          >
            Login
          </NavLink>
          <Button asChild size="sm" variant="primaryGlass" className="btn-primary-glass ml-1">
            <Link to="/dashboard">Abrir app</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
