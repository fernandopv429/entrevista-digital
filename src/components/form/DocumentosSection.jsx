import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { YesNo } from "@/components/form/FormFields";

export default function DocumentosSection({ data, onChoice }) {
  return <SectionCard number="15" title="Documentos"><div className="grid gap-7 sm:grid-cols-3">
    <YesNo label="Holerites" name="holerites" value={data.holerites} onChange={onChoice} />
    <YesNo label="Rescisão contratual" name="rescisao_contratual" value={data.rescisao_contratual} onChange={onChoice} />
    <YesNo label="Espelho de ponto" name="espelho_ponto" value={data.espelho_ponto} onChange={onChoice} />
  </div></SectionCard>;
}