import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function PeriodoSection({ data, onChange }) {
  return <SectionCard number="4" title="Período trabalhado"><div className="grid gap-5 sm:grid-cols-2">
    <Field label="Admissão" name="DATA_ADMISSAO" type="date" value={data.DATA_ADMISSAO} onChange={onChange} />
    <Field label="Rescisão / último dia trabalhado" name="DATA_RESCISAO" type="date" value={data.DATA_RESCISAO} onChange={onChange} />
    <div className="sm:col-span-2"><Field label="Salário" name="SALARIO" value={data.SALARIO} onChange={onChange} format="currency" /></div>
  </div></SectionCard>;
}
