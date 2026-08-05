import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select, YesNo } from "@/components/form/FormFields";
import { FOLGAS_OPTIONS } from "@/lib/interviewOptions";

export default function FolgasSection({ data, onChange, onChoice }) {
  return <SectionCard number="5" title="Folgas trabalhadas (FT)"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <YesNo label="Trabalhou folgas?" name="folgas_trabalhadas" value={data.folgas_trabalhadas} onChange={onChoice} />
    <Select label="Quantidade" name="ft_quantidade" value={data.ft_quantidade} options={FOLGAS_OPTIONS} onChange={onChange} />
    <Field label="Valor recebido" name="ft_valor" value={data.ft_valor} onChange={onChange} />
    <Field label="Forma de recebimento" name="ft_pagamento" value={data.ft_pagamento} onChange={onChange} />
    <YesNo label="Possui comprovante de pagamento?" name="ft_comprovante" value={data.ft_comprovante} onChange={onChoice} />
  </div></SectionCard>;
}