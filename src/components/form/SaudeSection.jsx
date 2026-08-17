import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function SaudeSection({ data, onChange, onChoice }) {
  return <SectionCard number="16" title="Saúde e segurança"><div className="space-y-6">
    <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      <YesNo label="Doença ou acidente de trabalho?" name="tem_doenca" value={data.tem_doenca} onChange={onChoice} />
      <YesNo label="Insalubridade?" name="tem_insalubridade" value={data.tem_insalubridade} onChange={onChoice} />
      {data.tem_insalubridade === true && (
        <Field label="Porcentagem (insalubridade)" name="insalubridade_porcentagem" value={data.insalubridade_porcentagem} onChange={onChange} placeholder="Ex.: 20%" />
      )}
      <YesNo label="Periculosidade?" name="tem_periculosidade" value={data.tem_periculosidade} onChange={onChoice} />
      {data.tem_periculosidade === true && (
        <Field label="Porcentagem (periculosidade)" name="periculosidade_porcentagem" value={data.periculosidade_porcentagem} onChange={onChange} placeholder="Ex.: 30%" />
      )}
    </div>
    <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      <Field label="Quais produtos" name="produtos" value={data.produtos} onChange={onChange} />
      <Field label="Utilizava EPI" name="epi" value={data.epi} onChange={onChange} />
    </div>
  </div></SectionCard>;
}