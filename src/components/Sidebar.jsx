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
    <aside className="sticky top-0 h-screen shrink-0 p-3">
      <nav className="flex h-full w-[72px] flex-col items-center gap-2 rounded-3xl bg-ink py-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
          <Scale className="h-5 w-5 text-brand-ink" />
        </div>
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            title={label}
            className={({ isActive }) =>
              `flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                isActive ? "bg-brand text-white" : "text-brand-ink hover:bg-white/5"
              }`
            }
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}
        <div className="mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            title="Sair"
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-brand-ink transition hover:bg-white/5"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </aside>
  );
}