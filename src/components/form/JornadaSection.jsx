import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { YesNo } from "@/components/form/FormFields";

export default function JornadaSection({ data, onChoice }) {
  return <SectionCard number="5" title="Jornada de trabalho"><div className="grid gap-7 sm:grid-cols-2">
    <YesNo label="Trabalhou em finais de semana e feriados?" name="finais_semana" value={data.finais_semana} onChange={onChoice} />
    <YesNo label="Trabalhava entre 22h e 5h (adicional noturno)?" name="tem_adic_noturno" value={data.tem_adic_noturno} onChange={onChoice} />
  </div></SectionCard>;
}
