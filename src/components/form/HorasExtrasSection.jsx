import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Select, YesNo } from "@/components/form/FormFields";
import { HORAS_EXTRAS_OPTIONS, MINUTOS_OPTIONS } from "@/lib/interviewOptions";

export default function HorasExtrasSection({ data, onChange, onChoice }) {
  return <SectionCard number="7" title="Horas extras"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <YesNo label="Realizava horas extras?" name="horas_extras" value={data.horas_extras} onChange={onChoice} />
    <Select label="Média de horas extras" name="media_horas_extras" value={data.media_horas_extras} options={HORAS_EXTRAS_OPTIONS} onChange={onChange} />
    <Select label="Período antecedente à jornada" name="periodo_antecedente" value={data.periodo_antecedente} options={MINUTOS_OPTIONS} onChange={onChange} />
    <Select label="Período sucedente" name="periodo_sucedente" value={data.periodo_sucedente} options={MINUTOS_OPTIONS} onChange={onChange} />
  </div></SectionCard>;
}