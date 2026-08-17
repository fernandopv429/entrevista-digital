import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

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
        <div className="flex items-center">
          <Image src="https://media.base44.com/images/public/6a734d6c72c1f853994b8733/7ed4f9f93_logo_fernando_vieira_laranja1.png" alt="Fernando Vieira Advogados" className="h-9 w-36" fittingType="fit" />
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