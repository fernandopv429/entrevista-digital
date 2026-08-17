import React from "react";
import { NavLink } from "react-router-dom";
import { Scale, Home, FileText, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";

const items = [
  { to: "/", icon: Home, label: "Nova entrevista" },
  { to: "/entrevistas", icon: FileText, label: "Entrevistas salvas" },
];

export default function Sidebar() {
  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <header className="sticky top-0 z-20 px-3 pt-3">
      <nav className="flex items-center gap-4 rounded-2xl bg-ink px-4 py-3 text-white sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
            <Scale className="h-5 w-5 text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-[0.14em]">FERNANDO VIEIRA</p>
            <p className="text-[10px] tracking-[0.3em] text-brand-ink">ADVOGADOS</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {items.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-brand text-white" : "text-brand-ink hover:bg-white/5"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            title="Sair"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-ink transition hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}