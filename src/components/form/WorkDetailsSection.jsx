import React from "react";
import SectionCard from "@/components/form/SectionCard";
import { Field, YesNo } from "@/components/form/FormFields";

export default function WorkDetailsSection({ data, onChange, onChoice }) {
  return <SectionCard number="3" title="Jornada, benefícios e pagamentos"><div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
    <Field label="Tipo de dispensa" name="tipo_dispensa" value={data.tipo_dispensa} onChange={onChange} /><Field label="Último dia trabalhado" name="ultimo_dia" value={data.ultimo_dia} onChange={onChange} type="date" />
    <YesNo label="Recebia vale-refeição?" name="vale_refeicao" value={data.vale_refeicao} onChange={onChoice} /><YesNo label="Recebia vale-alimentação?" name="vale_alimentacao" value={data.vale_alimentacao} onChange={onChoice} /><YesNo label="Recebia vale-transporte?" name="vale_transporte" value={data.vale_transporte} onChange={onChoice} /><YesNo label="Trabalhou em finais de semana e feriados?" name="finais_semana" value={data.finais_semana} onChange={onChoice} />
    <YesNo label="Possuiu férias?" name="ferias" value={data.ferias} onChange={onChoice} /><Field label="Quantidade de férias" name="ferias_quantidade" value={data.ferias_quantidade} onChange={onChange} />
    <YesNo label="Trabalhou folgas?" name="folgas_trabalhadas" value={data.folgas_trabalhadas} onChange={onChoice} /><Field label="Quantidade de folgas" name="ft_quantidade" value={data.ft_quantidade} onChange={onChange} /><Field label="Valor recebido" name="ft_valor" value={data.ft_valor} onChange={onChange} /><Field label="Forma de recebimento" name="ft_pagamento" value={data.ft_pagamento} onChange={onChange} /><YesNo label="Possui comprovante de pagamento?" name="ft_comprovante" value={data.ft_comprovante} onChange={onChoice} />
    <YesNo label="Horário de almoço suprimido?" name="intervalo_suprimido" value={data.intervalo_suprimido} onChange={onChoice} /><Field label="Detalhes do intervalo" name="intervalo_detalhes" value={data.intervalo_detalhes} onChange={onChange} />
    <YesNo label="Realizava horas extras?" name="horas_extras" value={data.horas_extras} onChange={onChoice} /><Field label="Média de horas extras" name="media_horas_extras" value={data.media_horas_extras} onChange={onChange} /><Field label="Período antecedente à jornada" name="periodo_antecedente" value={data.periodo_antecedente} onChange={onChange} /><Field label="Período sucedente" name="periodo_sucedente" value={data.periodo_sucedente} onChange={onChange} />
  </div></SectionCard>;
}