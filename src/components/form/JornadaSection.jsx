import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function JornadaSection({ data, onChange, onChoice }) {
  return <SectionCard number="6" title="Jornada de trabalho"><div className="grid gap-5 sm:grid-cols-2">
    <div className="sm:col-span-2"><Field label="Horário da jornada" name="JORNADA_HORARIO" value={data.JORNADA_HORARIO} onChange={onChange} placeholder="Ex.: 18:30 às 07:30" /></div>
    <Field label="Até que horário se estendia (quando extrapolava)" name="JORNADA_EXTRAPOLA" value={data.JORNADA_EXTRAPOLA} onChange={onChange} placeholder="Ex.: 09:00" />
    <Field label="Frequência da extrapolação" name="JORNADA_FREQ_EXTRA" value={data.JORNADA_FREQ_EXTRA} onChange={onChange} placeholder="Ex.: 4 a 6 vezes por mês" />
    <YesNo label="Jornada cruzava horário noturno (22h–05h)?" name="tem_adic_noturno" value={data.tem_adic_noturno} onChange={onChoice} />
  </div></SectionCard>;
}
