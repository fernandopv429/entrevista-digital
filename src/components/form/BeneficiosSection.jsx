import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

// Estes dois valores alimentam APENAS os itens "auxílio-alimentação nas folgas"
// e "vale-transporte nas folgas" (mathUtils.js:458 e :464) — as duas condições
// exigem a quantidade de folgas. Sem folgas trabalhadas o valor não é usado em
// nada, por isso a obrigatoriedade acompanha a Seção 8 e não o benefício em si.
export default function BeneficiosSection({ data, onChange, onChoice }) {
  const temAlimentacao = data.vale_alimentacao || data.vale_refeicao;
  const temFolgas = data.folgas_trabalhadas === true;
  return <SectionCard number="6" title="Benefícios"><div className="space-y-6">
    <div className="grid gap-7 sm:grid-cols-3">
      <YesNo label="Vale-refeição" name="vale_refeicao" value={data.vale_refeicao} onChange={onChoice} />
      <YesNo label="Vale-alimentação" name="vale_alimentacao" value={data.vale_alimentacao} onChange={onChoice} />
      <YesNo label="Vale-transporte" name="vale_transporte" value={data.vale_transporte} onChange={onChoice} />
    </div>
    {(temAlimentacao || data.vale_transporte) && (
      <div className="grid gap-5 sm:grid-cols-2">
        {temAlimentacao && <Field label="Valor diário do auxílio-alimentação" name="VALOR_AUX_ALIMENTACAO" value={data.VALOR_AUX_ALIMENTACAO} onChange={onChange} format="currency" placeholder="Ex.: R$ 23,30" required={temFolgas} />}
        {data.vale_transporte && <Field label="Valor diário da condução" name="VAL_CONDUCAO" value={data.VAL_CONDUCAO} onChange={onChange} format="currency" placeholder="Ex.: R$ 10,00" required={temFolgas} />}
      </div>
    )}
    {(temAlimentacao || data.vale_transporte) && (
      <p className="text-sm text-slate-600">
        {temFolgas
          ? "Como houve folgas trabalhadas, estes valores entram no cálculo: são eles que liquidam o auxílio-alimentação e o vale-transporte devidos nos dias de folga. Em branco, o sistema procura o valor na cláusula da convenção coletiva e, se não encontrar, aplica o padrão da categoria — a peça sai com a estimativa e volta marcada para revisão."
          : "Sem folgas trabalhadas (Seção 8), estes valores não entram em nenhum cálculo — preencha apenas se souber, para registro. Eles são usados para liquidar o auxílio-alimentação e o vale-transporte devidos nos dias de folga."}
      </p>
    )}
  </div></SectionCard>;
}
