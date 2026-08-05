import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function PeriodoSection({ data, onChange }) {
  return <SectionCard number="3" title="Período trabalhado"><div className="grid gap-5 sm:grid-cols-2">
    <Field label="Admissão" name="admissao" type="date" value={data.admissao} onChange={onChange} />
    <Field label="Demissão" name="demissao" type="date" value={data.demissao} onChange={onChange} />
    <div className="sm:col-span-2"><Field label="Salário" name="salario" value={data.salario} onChange={onChange} /></div>
  </div></SectionCard>;
}