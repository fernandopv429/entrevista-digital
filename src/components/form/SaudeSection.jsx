import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select, TextArea, YesNo } from "@/components/form/FormFields";
import { GRAU_INSALUBRIDADE_OPTIONS } from "@/lib/interviewOptions";

export default function SaudeSection({ data, onChange, onChoice }) {
  return <SectionCard number="17" title="Saúde e segurança"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <YesNo label="Doença ou acidente de trabalho?" name="tem_doenca" value={data.tem_doenca} onChange={onChoice} />
    <YesNo label="Insalubridade?" name="tem_insalubridade" value={data.tem_insalubridade} onChange={onChoice} />
    <Select label="Grau de insalubridade" name="GRAU_INSALUBRIDADE" value={data.GRAU_INSALUBRIDADE} options={GRAU_INSALUBRIDADE_OPTIONS} onChange={onChange} />
    <YesNo label="Periculosidade?" name="tem_periculosidade" value={data.tem_periculosidade} onChange={onChoice} />
    <div className="sm:col-span-2"><TextArea label="Fatos que fundamentam a insalubridade" name="INSALUBRIDADE_FATOS" value={data.INSALUBRIDADE_FATOS} onChange={onChange} rows={3} /></div>
    <Field label="Quais produtos" name="produtos" value={data.produtos} onChange={onChange} />
    <Field label="Utilizava EPI" name="epi" value={data.epi} onChange={onChange} />
  </div></SectionCard>;
}
