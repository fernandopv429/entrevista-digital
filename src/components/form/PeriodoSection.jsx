import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field } from "@/components/form/FormFields";

export default function PeriodoSection({ data, onChange }) {
  return <SectionCard number="3" title="Tempo laborado e remuneração"><div className="space-y-4">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Admissão" name="DATA_ADMISSAO" type="date" value={data.DATA_ADMISSAO} onChange={onChange} />
      <Field label="Rescisão / último dia trabalhado" name="DATA_RESCISAO" type="date" value={data.DATA_RESCISAO} onChange={onChange} />
      <Field label="Salário-base mensal" name="SALARIO" value={data.SALARIO} onChange={onChange} format="currency" />
    </div>
    <p className="text-sm text-slate-600">
      Confira o salário no holerite ou na CTPS. Todo o rol de pedidos é calculado sobre ele — aviso prévio,
      13º, férias, FGTS, multas e hora normal. Se ficar em branco, a minuta sai calculada sobre o piso da
      convenção coletiva e volta marcada para revisão.
    </p>
  </div></SectionCard>;
}
