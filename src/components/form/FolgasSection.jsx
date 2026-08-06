import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function FolgasSection({ data, onChange, onChoice }) {
  return <SectionCard number="8" title="Folgas trabalhadas (FT)"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <YesNo label="Trabalhou folgas?" name="folgas_trabalhadas" value={data.folgas_trabalhadas} onChange={onChoice} />
    <Field label="Quantidade média por mês" name="FT_QTD_MEDIA" value={data.FT_QTD_MEDIA} onChange={onChange} placeholder="Ex.: 5 a 6 por mês" />
    <Field label="Valor recebido por FT" name="VAL_FT" value={data.VAL_FT} onChange={onChange} placeholder="Ex.: R$ 180,00" />
    <Field label="Forma de recebimento" name="ft_pagamento" value={data.ft_pagamento} onChange={onChange} />
    <YesNo label="Possui comprovante de pagamento?" name="ft_comprovante" value={data.ft_comprovante} onChange={onChoice} />
    <Field label="Vale-condução não pago nas folgas" name="VAL_CONDUCAO" value={data.VAL_CONDUCAO} onChange={onChange} placeholder="Ex.: R$ 10,00" />
    <Field label="Vale-alimentação não pago nas folgas" name="VAL_ALIMENTACAO" value={data.VAL_ALIMENTACAO} onChange={onChange} placeholder="Ex.: R$ 39,00" />
  </div></SectionCard>;
}
