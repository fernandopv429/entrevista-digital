import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function SaudeSection({ data, onChange, onChoice }) {
  return <SectionCard number="13" title="Saúde e segurança"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <YesNo label="Doença ou acidente de trabalho?" name="doenca_acidente" value={data.doenca_acidente} onChange={onChoice} />
    <YesNo label="Insalubridade?" name="insalubridade" value={data.insalubridade} onChange={onChoice} />
    <YesNo label="Periculosidade?" name="periculosidade" value={data.periculosidade} onChange={onChoice} />
    <Field label="Quais produtos" name="produtos" value={data.produtos} onChange={onChange} />
    <Field label="Utilizava EPI" name="epi" value={data.epi} onChange={onChange} />
  </div></SectionCard>;
}