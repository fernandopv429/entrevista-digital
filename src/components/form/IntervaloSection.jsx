import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function IntervaloSection({ data, onChange, onChoice }) {
  return <SectionCard number="9" title="Intervalo intrajornada"><div className="grid gap-7 sm:grid-cols-2">
    <YesNo label="Horário de almoço suprimido?" name="intervalo_suprimido" value={data.intervalo_suprimido} onChange={onChoice} />
    <Field label="Quanto tempo era gozado, em média" name="INTERVALO_GOZADO" value={data.INTERVALO_GOZADO} onChange={onChange} placeholder="Ex.: 10 a 15 minutos" />
  </div></SectionCard>;
}