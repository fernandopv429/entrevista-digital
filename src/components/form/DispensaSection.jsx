import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, Select } from "@/components/form/FormFields";
import { TIPO_DISPENSA_OPTIONS } from "@/lib/interviewOptions";

export default function DispensaSection({ data, onChange }) {
  return <SectionCard number="1" title="Tipo de dispensa"><div className="grid gap-5 sm:grid-cols-2">
    <Select label="Tipo de dispensa" name="tipo_dispensa" value={data.tipo_dispensa} options={TIPO_DISPENSA_OPTIONS} onChange={onChange} />
    <Field label="Último dia trabalhado" name="ultimo_dia" value={data.ultimo_dia} onChange={onChange} type="date" />
  </div></SectionCard>;
}