import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { TextArea, YesNo } from "@/components/form/FormFields";

export default function AcumuloSection({ data, onChange, onChoice }) {
  return <SectionCard number="8" title="Acúmulo/desvio de função"><div className="space-y-7">
    <YesNo label="Houve acúmulo ou desvio de função?" name="acumulo_funcao" value={data.acumulo_funcao} onChange={onChoice} />
    <TextArea label="Quais funções" name="funcoes_acumuladas" value={data.funcoes_acumuladas} onChange={onChange} rows={3} />
  </div></SectionCard>;
}