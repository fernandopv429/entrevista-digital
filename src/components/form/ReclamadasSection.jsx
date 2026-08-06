import React, { useState } from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select } from "@/components/form/FormFields";
import { ESCALA_OPTIONS } from "@/lib/interviewOptions";

export default function ReclamadasSection({ data, onChange }) {
  const [show2, setShow2] = useState(!!data.RECL2_NOME);
  const [show3, setShow3] = useState(!!data.RECL3_NOME);

  return <SectionCard number="2" title="Reclamadas, função e posto de trabalho"><div className="space-y-6">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Função exercida" name="FUNCAO" value={data.FUNCAO} onChange={onChange} />
      <Select label="Escala e horário" name="escala" value={data.escala} options={ESCALA_OPTIONS} onChange={onChange} />
      <div className="sm:col-span-2"><Field label="Local de prestação de serviços (posto/cliente)" name="LOCAL_PRESTACAO" value={data.LOCAL_PRESTACAO} onChange={onChange} /></div>
      <div className="sm:col-span-2"><Field label="Endereço completo do posto" name="LOCAL_PRESTACAO_COMPL" value={data.LOCAL_PRESTACAO_COMPL} onChange={onChange} /></div>
    </div>

    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-blue-700">1ª Reclamada (empregadora)</span>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><Field label="Razão social" name="RECL1_NOME" value={data.RECL1_NOME} onChange={onChange} /></div>
        <Field label="CNPJ" name="RECL1_CNPJ" value={data.RECL1_CNPJ} onChange={onChange} format="cnpj" />
        <div className="sm:col-span-2"><Field label="Logradouro" name="RECL1_LOGRADOURO" value={data.RECL1_LOGRADOURO} onChange={onChange} /></div>
        <div className="sm:col-span-2"><Field label="Complemento (cidade/UF/CEP)" name="RECL1_ENDCOMPL" value={data.RECL1_ENDCOMPL} onChange={onChange} /></div>
      </div>
    </div>

    {show2 && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">2ª Reclamada (tomadora)</span>
          <button type="button" onClick={() => setShow2(false)} className="text-sm font-medium text-red-600 hover:underline">Remover</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Razão social" name="RECL2_NOME" value={data.RECL2_NOME} onChange={onChange} /></div>
          <Field label="CNPJ" name="RECL2_CNPJ" value={data.RECL2_CNPJ} onChange={onChange} format="cnpj" />
          <div className="sm:col-span-2"><Field label="Logradouro" name="RECL2_LOGRADOURO" value={data.RECL2_LOGRADOURO} onChange={onChange} /></div>
          <div className="sm:col-span-2"><Field label="Complemento (cidade/UF/CEP)" name="RECL2_ENDCOMPL" value={data.RECL2_ENDCOMPL} onChange={onChange} /></div>
        </div>
      </div>
    )}
    {!show2 && (
      <button type="button" onClick={() => setShow2(true)} className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 font-semibold text-slate-600 transition hover:border-blue-700 hover:text-blue-700">+ Adicionar 2ª reclamada</button>
    )}

    {show2 && show3 && (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">3ª Reclamada (tomadora)</span>
          <button type="button" onClick={() => setShow3(false)} className="text-sm font-medium text-red-600 hover:underline">Remover</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Razão social" name="RECL3_NOME" value={data.RECL3_NOME} onChange={onChange} /></div>
          <Field label="CNPJ" name="RECL3_CNPJ" value={data.RECL3_CNPJ} onChange={onChange} format="cnpj" />
          <div className="sm:col-span-2"><Field label="Logradouro" name="RECL3_LOGRADOURO" value={data.RECL3_LOGRADOURO} onChange={onChange} /></div>
          <div className="sm:col-span-2"><Field label="Complemento (cidade/UF/CEP)" name="RECL3_ENDCOMPL" value={data.RECL3_ENDCOMPL} onChange={onChange} /></div>
        </div>
      </div>
    )}
    {show2 && !show3 && (
      <button type="button" onClick={() => setShow3(true)} className="w-full rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 font-semibold text-slate-600 transition hover:border-blue-700 hover:text-blue-700">+ Adicionar 3ª reclamada</button>
    )}
  </div></SectionCard>;
}
