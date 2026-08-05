import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function IdentificationSection({ data, onChange }) {
  return <SectionCard number="1" title="Identificação do cliente"><div className="grid gap-5 sm:grid-cols-2">
    <div className="sm:col-span-2"><Field label="Nome completo" name="nome_cliente" value={data.nome_cliente} onChange={onChange} required /></div>
    <Field label="Nacionalidade" name="nacionalidade" value={data.nacionalidade} onChange={onChange} /><Field label="Estado civil" name="estado_civil" value={data.estado_civil} onChange={onChange} />
    <Field label="RG" name="rg" value={data.rg} onChange={onChange} /><Field label="CPF" name="cpf" value={data.cpf} onChange={onChange} required />
    <Field label="PIS" name="pis" value={data.pis} onChange={onChange} /><Field label="CTPS" name="ctps" value={data.ctps} onChange={onChange} />
    <Field label="Data de nascimento" name="data_nascimento" value={data.data_nascimento} onChange={onChange} type="date" /><Field label="Filiação" name="filiacao" value={data.filiacao} onChange={onChange} />
    <div className="sm:col-span-2"><Field label="Endereço completo" name="endereco_cliente" value={data.endereco_cliente} onChange={onChange} /></div>
    <Field label="E-mail" name="email" value={data.email} onChange={onChange} type="email" /><Field label="Telefone" name="telefone" value={data.telefone} onChange={onChange} />
  </div></SectionCard>;
}