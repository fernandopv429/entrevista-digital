import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, FileText, Loader2, ListChecks, FlaskConical, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { interviewDefaults, interviewExample } from "@/lib/interviewDefaults";
import { generateInterviewPdf } from "@/lib/interviewPdf";
import AvisoEstimativa from "@/components/form/AvisoEstimativa";
import ModeloPeticaoSection from "@/components/form/ModeloPeticaoSection";
import IdentificationSection from "@/components/form/IdentificationSection";
import ReclamadasSection from "@/components/form/ReclamadasSection";
import PeriodoSection from "@/components/form/PeriodoSection";
import DispensaSection from "@/components/form/DispensaSection";
import JornadaSection from "@/components/form/JornadaSection";
import BeneficiosSection from "@/components/form/BeneficiosSection";
import FeriasSection from "@/components/form/FeriasSection";
import FolgasSection from "@/components/form/FolgasSection";
import IntervaloSection from "@/components/form/IntervaloSection";
import HorasExtrasSection from "@/components/form/HorasExtrasSection";
import AcumuloSection from "@/components/form/AcumuloSection";
import CondicoesSection from "@/components/form/CondicoesSection";
import GratificacoesSection from "@/components/form/GratificacoesSection";
import DocumentosSection from "@/components/form/DocumentosSection";
import DescontosSection from "@/components/form/DescontosSection";
import SaudeSection from "@/components/form/SaudeSection";
import TestemunhaSection from "@/components/form/TestemunhaSection";
import FactsSection from "@/components/form/FactsSection";

export default function Home() {
  const [data, setData] = useState(interviewDefaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const change = ({ target }) => { setSaved(false); setData(v => ({ ...v, [target.name]: target.value })); };
  // Dados fictícios para testar o fluxo sem usar o cadastro de um cliente real.
  const carregarExemplo = () => { setSaved(false); setData(interviewExample); };
  // Campos que só existem enquanto a tese está ativa. Ao responder "Não" depois
  // de ter preenchido, o valor precisa ser APAGADO: o payload leva o objeto
  // inteiro, e o gerador ainda leria o resíduo em alguns caminhos (ex.: VAL_FT
  // é lido quando finais_semana=Sim, mesmo com folgas_trabalhadas=Não). É o
  // mesmo problema que a 2ª reclamada tinha ao ser "removida".
  const DEPENDENTES = {
    folgas_trabalhadas: ['FT_QTD_MEDIA', 'VAL_FT', 'ft_pagamento'],
    intervalo_suprimido: ['INTERVALO_GOZADO'],
    horas_extras: ['media_horas_extras', 'periodo_antecedente', 'periodo_sucedente'],
    acumulo_funcao: ['funcoes_acumuladas'],
    gratificacao: ['gratificacao_qual'],
    assiduidade: ['assiduidade_prometido', 'assiduidade_pago'],
    vale_transporte: ['VAL_CONDUCAO'],
  };
  const choice = (name, value) => {
    setSaved(false);
    setData(v => {
      const next = { ...v, [name]: value };
      if (value === false) for (const campo of DEPENDENTES[name] || []) next[campo] = '';
      // O valor do auxílio-alimentação serve a dois booleanos; só zera quando os dois caírem.
      if (!next.vale_alimentacao && !next.vale_refeicao) next.VALOR_AUX_ALIMENTACAO = '';
      return next;
    });
  };
  const submit = async (event) => { event.preventDefault(); setSaving(true); const saved = await base44.entities.Entrevista.create(data); try { await base44.functions.invoke('enviarWebhookEntrevista', saved); } catch (e) { /* webhook failure não impede o salvamento */ } setSaving(false); setSaved(true); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <main className="min-h-screen pb-20 text-slate-950"><header className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><div className="mb-6 flex items-center gap-3"><div className="rounded-xl bg-ink p-2.5 text-white"><FileText className="h-5 w-5" /></div><div><p className="font-bold tracking-[0.18em]">FERNANDO VIEIRA</p><p className="text-xs tracking-[0.35em] text-slate-500">ADVOGADOS</p></div></div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand">Entrevista trabalhista</p><h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Formulário de atendimento ao cliente</h1><p className="mt-3 max-w-2xl text-slate-600">Preencha os dados do atendimento. O salário-base e a existência de tomadora (2ª reclamada) definem, respectivamente, os valores do rol de pedidos e a comarca — confira os dois antes de salvar.</p><div className="mt-5 flex flex-wrap gap-3"><Link to="/entrevistas" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"><ListChecks className="h-4 w-4" />Ver entrevistas salvas</Link><button type="button" onClick={carregarExemplo} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"><FlaskConical className="h-4 w-4" />Carregar exemplo</button></div>{saved && <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-5 w-5" />Entrevista salva com sucesso.</div>}</div></header>
    <form onSubmit={submit} className="mx-auto mt-6 max-w-4xl space-y-5 px-4 sm:px-6">
      <AvisoEstimativa />
      <ModeloPeticaoSection data={data} onChange={change} />
      <IdentificationSection data={data} onChange={change} />
      <ReclamadasSection data={data} onChange={change} />
      <PeriodoSection data={data} onChange={change} />
      <DispensaSection data={data} onChange={change} />
      <JornadaSection data={data} onChoice={choice} />
      <BeneficiosSection data={data} onChange={change} onChoice={choice} />
      <FeriasSection data={data} onChange={change} onChoice={choice} />
      <FolgasSection data={data} onChange={change} onChoice={choice} />
      <IntervaloSection data={data} onChange={change} onChoice={choice} />
      <HorasExtrasSection data={data} onChange={change} onChoice={choice} />
      <AcumuloSection data={data} onChange={change} onChoice={choice} />
      <CondicoesSection data={data} onChoice={choice} />
      <GratificacoesSection data={data} onChange={change} onChoice={choice} />
      <DocumentosSection data={data} onChoice={choice} />
      <DescontosSection data={data} onChange={change} onChoice={choice} />
      <SaudeSection data={data} onChange={change} onChoice={choice} />
      <TestemunhaSection data={data} onChange={change} />
      <FactsSection data={data} onChange={change} />
      <div className="sticky bottom-4 z-10 flex flex-wrap justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur"><button type="button" onClick={() => generateInterviewPdf(data)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"><Download className="h-5 w-5" />Baixar PDF</button><button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}{saving ? "Salvando..." : "Salvar entrevista"}</button></div>
    </form>
  </main>;
}