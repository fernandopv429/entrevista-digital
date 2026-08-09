import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function BeneficiosSection({ data, onChange, onChoice }) {
  const temAlimentacao = data.vale_alimentacao || data.vale_refeicao;
  return <SectionCard number="6" title="Benefícios"><div className="space-y-6">
    <div className="grid gap-7 sm:grid-cols-3">
      <YesNo label="Vale-refeição" name="vale_refeicao" value={data.vale_refeicao} onChange={onChoice} />
      <YesNo label="Vale-alimentação" name="vale_alimentacao" value={data.vale_alimentacao} onChange={onChoice} />
      <YesNo label="Vale-transporte" name="vale_transporte" value={data.vale_transporte} onChange={onChoice} />
    </div>
    {(temAlimentacao || data.vale_transporte) && (
      <div className="grid gap-5 sm:grid-cols-2">
        {temAlimentacao && <Field label="Valor diário do auxílio-alimentação" name="VALOR_AUX_ALIMENTACAO" value={data.VALOR_AUX_ALIMENTACAO} onChange={onChange} format="currency" />}
        {data.vale_transporte && <Field label="Valor diário da condução" name="VAL_CONDUCAO" value={data.VAL_CONDUCAO} onChange={onChange} format="currency" />}
      </div>
    )}
    <p className="text-sm text-slate-600">
      Informe os valores diários sempre que souber. Sem eles a minuta recorre ao padrão da convenção
      coletiva e, quando a CCT não traz o número, o campo sai como "[A PREENCHER]" no corpo da peça e no
      rol de pedidos.
    </p>
  </div></SectionCard>;
}
