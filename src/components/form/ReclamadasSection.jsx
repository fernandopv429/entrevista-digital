import React from "react";
import { Plus, Trash2 } from "lucide-react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select } from "@/components/form/FormFields";
import { ESCALA_OPTIONS } from "@/lib/interviewOptions";

const empty = { razao_social: "", cnpj: "", endereco: "", cargo: "", escala: "" };

export default function ReclamadasSection({ reclamadas, onChange, onAdd, onRemove }) {
  return <SectionCard number="2" title="Identificação do(s) reclamado(s)"><div className="space-y-6">
    {reclamadas.map((r, i) => (
      <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Reclamada {i + 1}</span>
          <button type="button" onClick={() => onRemove(i)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50"><Trash2 className="h-4 w-4" />Remover</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Razão social" name="razao_social" value={r.razao_social} onChange={(e) => onChange(i, "razao_social", e.target.value)} /></div>
          <Field label="CNPJ" name="cnpj" value={r.cnpj} onChange={(e) => onChange(i, "cnpj", e.target.value)} />
          <Field label="Cargo" name="cargo" value={r.cargo} onChange={(e) => onChange(i, "cargo", e.target.value)} />
          <div className="sm:col-span-2"><Field label="Endereço" name="endereco" value={r.endereco} onChange={(e) => onChange(i, "endereco", e.target.value)} /></div>
          <Select label="Escala e horário" name="escala" value={r.escala} options={ESCALA_OPTIONS} onChange={(e) => onChange(i, "escala", e.target.value)} />
        </div>
      </div>
    ))}
    <button type="button" onClick={onAdd} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 font-semibold text-slate-600 transition hover:border-blue-700 hover:text-blue-700"><Plus className="h-5 w-5" />Adicionar reclamada</button>
  </div></SectionCard>;
}