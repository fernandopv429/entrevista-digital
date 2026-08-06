import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Select } from "@/components/form/FormFields";
import { TIPO_DISPENSA_OPTIONS } from "@/lib/interviewOptions";

export default function DispensaSection({ data, onChange }) {
  return <SectionCard number="4" title="Tipo de dispensa"><div className="grid gap-5 sm:grid-cols-2">
    <Select label="Tipo de dispensa" name="tipo_dispensa" value={data.tipo_dispensa} options={TIPO_DISPENSA_OPTIONS} onChange={onChange} />
  </div></SectionCard>;
}