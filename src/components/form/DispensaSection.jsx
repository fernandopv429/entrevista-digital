import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select } from "@/components/form/FormFields";
import { TIPO_DISPENSA_OPTIONS } from "@/lib/interviewOptions";
import { hasEmpty } from "@/lib/sectionCompleteness";

const FIELDS = ["tipo_dispensa","ULTIMO_DIA_TRABALHADO","RESPONSAVEL_HIERARQUICO"];

export default function DispensaSection({ data, onChange }) {
  return <SectionCard number="4" title="Tipo de dispensa e responsável" incomplete={hasEmpty(data, FIELDS)}><div className="space-y-6">
    <div className="grid gap-5 sm:grid-cols-2">
      <Select label="Tipo de dispensa" name="tipo_dispensa" value={data.tipo_dispensa} options={TIPO_DISPENSA_OPTIONS} onChange={onChange} />
      <Field label="Último dia trabalhado" name="ULTIMO_DIA_TRABALHADO" value={data.ULTIMO_DIA_TRABALHADO} onChange={onChange} type="date" />
      <div className="sm:col-span-2"><Field label="Nome do responsável hierárquico" name="RESPONSAVEL_HIERARQUICO" value={data.RESPONSAVEL_HIERARQUICO} onChange={onChange} placeholder="Ex.: Sr. João (supervisor de turno)" /></div>
    </div>
  </div></SectionCard>;
}