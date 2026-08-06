import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function PeriodoSection({ data, onChange }) {
  return <SectionCard number="3" title="Tempo laborado"><div className="grid gap-5 sm:grid-cols-2">
    <Field label="Admissão" name="DATA_ADMISSAO" type="date" value={data.DATA_ADMISSAO} onChange={onChange} />
    <Field label="Rescisão / último dia trabalhado" name="DATA_RESCISAO" type="date" value={data.DATA_RESCISAO} onChange={onChange} />
  </div></SectionCard>;
}