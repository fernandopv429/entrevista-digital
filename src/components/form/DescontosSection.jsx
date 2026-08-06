import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function DescontosSection({ data, onChange, onChoice }) {
  return <SectionCard number="16" title="Descontos"><div className="space-y-7">
    <YesNo label="Houve desconto indevido?" name="desconto_indevido" value={data.desconto_indevido} onChange={onChoice} />
    <Field label="Qual" name="desconto_qual" value={data.desconto_qual} onChange={onChange} />
  </div></SectionCard>;
}