import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Select, YesNo } from "@/components/form/FormFields";
import { HORAS_EXTRAS_OPTIONS, MINUTOS_OPTIONS } from "@/lib/interviewOptions";

// O gerador só lê média, período antecedente e sucedente DENTRO de
// `if (d.horas_extras)`. Fora disso os campos não têm efeito nenhum — por isso
// aparecem apenas quando a resposta é "Sim".
export default function HorasExtrasSection({ data, onChange, onChoice }) {
  const fazia = data.horas_extras === true;
  return <SectionCard number="10" title="Horas extras"><div className="space-y-6">
    <YesNo label="Realizava horas extras?" name="horas_extras" value={data.horas_extras} onChange={onChoice} />
    {fazia && (
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Select label="Média de horas extras" name="media_horas_extras" value={data.media_horas_extras} options={HORAS_EXTRAS_OPTIONS} onChange={onChange} required />
        <div className="hidden sm:block" />
        <Select label="Período antecedente à jornada" name="periodo_antecedente" value={data.periodo_antecedente} options={MINUTOS_OPTIONS} onChange={onChange} required />
        <Select label="Período sucedente" name="periodo_sucedente" value={data.periodo_sucedente} options={MINUTOS_OPTIONS} onChange={onChange} required />
      </div>
    )}
  </div></SectionCard>;
}
