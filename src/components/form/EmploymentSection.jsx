import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function EmploymentSection({ data, onChange }) {
  return <SectionCard number="2" title="Reclamadas e vínculo"><div className="space-y-7">
    <div><p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-700">1ª Reclamada</p><div className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Razão social" name="reclamada_1" value={data.reclamada_1} onChange={onChange} /></div><Field label="CNPJ" name="cnpj_1" value={data.cnpj_1} onChange={onChange} /><Field label="Cargo" name="cargo" value={data.cargo} onChange={onChange} /><div className="sm:col-span-2"><Field label="Endereço" name="endereco_1" value={data.endereco_1} onChange={onChange} /></div><Field label="Período trabalhado" name="periodo_1" value={data.periodo_1} onChange={onChange} /></div></div>
    <div className="border-t border-slate-100 pt-7"><p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-700">2ª Reclamada</p><div className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Razão social" name="reclamada_2" value={data.reclamada_2} onChange={onChange} /></div><Field label="CNPJ" name="cnpj_2" value={data.cnpj_2} onChange={onChange} /><Field label="Período trabalhado" name="periodo_2" value={data.periodo_2} onChange={onChange} /><div className="sm:col-span-2"><Field label="Endereço" name="endereco_2" value={data.endereco_2} onChange={onChange} /></div><Field label="Escala e horário" name="escala" value={data.escala} onChange={onChange} /></div></div>
  </div></SectionCard>;
}