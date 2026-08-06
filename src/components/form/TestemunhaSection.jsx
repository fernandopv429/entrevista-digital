import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Select } from "@/components/form/FormFields";
import { TESTEMUNHA_OPTIONS } from "@/lib/interviewOptions";

export default function TestemunhaSection({ data, onChange }) {
  return <SectionCard number="20" title="Testemunha"><Select label="Testemunha" name="testemunha" value={data.testemunha} options={TESTEMUNHA_OPTIONS} onChange={onChange} /></SectionCard>;
}