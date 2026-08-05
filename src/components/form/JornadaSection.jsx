import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function JornadaSection({ data, onChange, onChoice }) {
  return <SectionCard number="3" title="Jornada de trabalho"><div className="space-y-5">
    <Field label="Horário da jornada" name="jornada" value={data.jornada} onChange={onChange} placeholder="Ex.: 18:30 às 07:30" />
    <YesNo label="Trabalhou em finais de semana e feriados?" name="finais_semana" value={data.finais_semana} onChange={onChoice} />
  </div></SectionCard>;
}