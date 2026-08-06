import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { YesNo } from "@/components/form/FormFields";

export default function JornadaSection({ data, onChoice }) {
  return <SectionCard number="5" title="Jornada de trabalho"><YesNo label="Trabalhou em finais de semana e feriados?" name="finais_semana" value={data.finais_semana} onChange={onChoice} /></SectionCard>;
}