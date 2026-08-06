import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function GratificacoesSection({ data, onChange, onChoice }) {
  return <SectionCard number="15" title="Gratificações"><div className="grid gap-7 sm:grid-cols-2">
    <YesNo label="Recebe algum tipo de gratificação?" name="gratificacao" value={data.gratificacao} onChange={onChoice} />
    <Field label="Qual" name="gratificacao_qual" value={data.gratificacao_qual} onChange={onChange} />
  </div></SectionCard>;
}