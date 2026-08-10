import React from "react";
import { applyFormat } from "@/lib/formatters";

export function Field({ label, name, value, onChange, type = "text", required = false, format }) {
  const handle = format
    ? (e) => onChange({ target: { name: e.target.name, value: applyFormat(format, e.target.value) } })
    : onChange;
  return <label className="block space-y-2"><span className="text-sm font-semibold text-slate-700">{label}{required && <span className="text-blue-700"> *</span>}</span><input name={name} value={value ?? ""} onChange={handle} type={type} required={required} inputMode={format ? "numeric" : undefined} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100" /></label>;
}

export function TextArea({ label, name, value, onChange, rows = 4, required = false }) {
  return <label className="block space-y-2"><span className="text-sm font-semibold text-slate-700">{label}{required && <span className="text-blue-700"> *</span>}</span><textarea name={name} value={value ?? ""} onChange={onChange} rows={rows} required={required} className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 leading-relaxed text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100" /></label>;
}

export function Select({ label, name, value, onChange, options, required = false }) {
  const normalized = options.map(opt => (typeof opt === "string" ? { value: opt, label: opt } : opt));
  return <label className="block space-y-2"><span className="text-sm font-semibold text-slate-700">{label}{required && <span className="text-blue-700"> *</span>}</span><select name={name} value={value ?? ""} onChange={onChange} required={required} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"><option value="" disabled>Selecione...</option>{normalized.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></label>;
}

export function YesNo({ label, name, value, onChange }) {
  return <fieldset><legend className="mb-2 text-sm font-semibold text-slate-700">{label}</legend><div className="flex gap-2">{[true, false].map(option => <label key={String(option)} className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${value === option ? "border-blue-700 bg-blue-50 text-blue-800" : "border-slate-200 bg-white text-slate-600"}`}><input className="sr-only" type="radio" name={name} checked={value === option} onChange={() => onChange(name, option)} />{option ? "Sim" : "Não"}</label>)}</div></fieldset>;
}