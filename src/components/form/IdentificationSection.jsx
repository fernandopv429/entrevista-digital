import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function IdentificationSection({ data, onChange }) {
  return <SectionCard number="1" title="Documentos do cliente"><div className="grid gap-5 sm:grid-cols-2">
    <div className="sm:col-span-2"><Field label="Nome completo" name="nome_cliente" value={data.nome_cliente} onChange={onChange} required /></div>
    <Field label="RG" name="rg" value={data.rg} onChange={onChange} />
    <Field label="CPF" name="cpf" value={data.cpf} onChange={onChange} required />
    <Field label="PIS" name="pis" value={data.pis} onChange={onChange} />
    <Field label="CTPS" name="ctps" value={data.ctps} onChange={onChange} />
  </div></SectionCard>;
}