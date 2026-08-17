import React from "react";

export default function SectionCard({ number, title, children }) {
  return <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-7"><div className="mb-6 flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{number}</span><h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{title}</h2></div>{children}</section>;
}