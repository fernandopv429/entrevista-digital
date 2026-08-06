import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { YesNo } from "@/components/form/FormFields";

export default function BeneficiosSection({ data, onChoice }) {
  return <SectionCard number="6" title="Benefícios"><div className="grid gap-7 sm:grid-cols-3">
    <YesNo label="Vale-refeição" name="vale_refeicao" value={data.vale_refeicao} onChange={onChoice} />
    <YesNo label="Vale-alimentação" name="vale_alimentacao" value={data.vale_alimentacao} onChange={onChoice} />
    <YesNo label="Vale-transporte" name="vale_transporte" value={data.vale_transporte} onChange={onChoice} />
  </div></SectionCard>;
}