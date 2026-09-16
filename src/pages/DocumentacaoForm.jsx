import React, { useRef, useState } from "react";
import { Download, Loader2, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SECTIONS = [
  {
    title: "Seção 1 — Identificação do cliente",
    fields: [
      ["titulo", "Título do caso", "texto", "não", "Ex.: Fernando x Belfort"],
      ["RECL_NOME", "Nome completo", "texto", "sim", ""],
      ["RECL_NACIONALIDADE", "Nacionalidade", "texto", "não", ""],
      ["RECL_ESTADOCIVIL", "Estado civil", "texto", "não", ""],
      ["RECL_RG", "RG", "texto", "não", ""],
      ["RECL_CPF", "CPF", "texto (máscara CPF)", "sim", ""],
      ["RECL_PIS", "PIS", "texto", "não", ""],
      ["RECL_CTPS", "CTPS (número)", "texto", "não", ""],
      ["RECL_SERIE", "CTPS (série)", "texto", "não", ""],
      ["RECL_NASC", "Data de nascimento", "data", "não", ""],
      ["RECL_FILIACAO", "Filiação", "texto", "não", ""],
      ["RECL_ENDERECO", "Endereço (logradouro)", "texto", "não", ""],
      ["RECL_CEP", "CEP", "texto", "não", ""],
      ["email", "E-mail", "e-mail", "não", ""],
      ["telefone", "Telefone", "texto (máscara telefone)", "não", ""],
    ],
  },
  {
    title: "Seção 2 — Reclamadas, função e jornada",
    fields: [
      ["FUNCAO", "Função exercida (cargo)", "texto", "não", ""],
      ["escala", "Escala (geral)", "seleção", "não", "12x36, 5x2, 6x1, 4x2, Plantão 24h, Outra"],
      ["JORNADA_HORARIO", "Horário da jornada (geral)", "texto", "não", "Ex.: das 19h às 07h"],
      ["RECL1_NOME", "1ª Reclamada — Razão social", "texto", "não", ""],
      ["RECL1_CNPJ", "1ª Reclamada — CNPJ", "texto (máscara CNPJ)", "não", ""],
      ["RECL1_CEP", "1ª Reclamada — CEP", "texto (máscara CEP)", "não", ""],
      ["RECL1_LOGRADOURO", "1ª Reclamada — Endereço", "texto", "não", ""],
      ["RECL1_ENDCOMPL", "1ª Reclamada — Complemento (cidade/UF)", "texto", "não", ""],
      ["RECL1_TEMPO_LABORADO", "1ª Reclamada — Tempo laborado", "texto", "não", "Ex.: 02/01/2023 a 30/06/2025"],
      ["RECL1_ESCALA_HORARIO", "1ª Reclamada — Escala / horário", "texto", "não", "Ex.: 12x36 — das 19h às 07h"],
      ["RECL2_NOME", "2ª Reclamada — Razão social", "texto", "não", "Mesma estrutura da 1ª"],
      ["RECL2_CNPJ", "2ª Reclamada — CNPJ", "texto (máscara CNPJ)", "não", ""],
      ["RECL2_CEP", "2ª Reclamada — CEP", "texto (máscara CEP)", "não", ""],
      ["RECL2_LOGRADOURO", "2ª Reclamada — Endereço", "texto", "não", ""],
      ["RECL2_ENDCOMPL", "2ª Reclamada — Complemento", "texto", "não", ""],
      ["RECL2_TEMPO_LABORADO", "2ª Reclamada — Tempo laborado", "texto", "não", ""],
      ["RECL2_ESCALA_HORARIO", "2ª Reclamada — Escala / horário", "texto", "não", ""],
      ["RECL3_NOME", "3ª Reclamada — Razão social", "texto", "não", "Mesma estrutura"],
      ["RECL3_CNPJ", "3ª Reclamada — CNPJ", "texto (máscara CNPJ)", "não", ""],
      ["RECL3_CEP", "3ª Reclamada — CEP", "texto (máscara CEP)", "não", ""],
      ["RECL3_LOGRADOURO", "3ª Reclamada — Endereço", "texto", "não", ""],
      ["RECL3_ENDCOMPL", "3ª Reclamada — Complemento", "texto", "não", ""],
      ["RECL3_TEMPO_LABORADO", "3ª Reclamada — Tempo laborado", "texto", "não", ""],
      ["RECL3_ESCALA_HORARIO", "3ª Reclamada — Escala / horário", "texto", "não", ""],
      ["RECL4_NOME", "4ª Reclamada — Razão social", "texto", "não", "Mesma estrutura"],
      ["RECL4_CNPJ", "4ª Reclamada — CNPJ", "texto (máscara CNPJ)", "não", ""],
      ["RECL4_CEP", "4ª Reclamada — CEP", "texto (máscara CEP)", "não", ""],
      ["RECL4_LOGRADOURO", "4ª Reclamada — Endereço", "texto", "não", ""],
      ["RECL4_ENDCOMPL", "4ª Reclamada — Complemento", "texto", "não", ""],
      ["RECL4_TEMPO_LABORADO", "4ª Reclamada — Tempo laborado", "texto", "não", ""],
      ["RECL4_ESCALA_HORARIO", "4ª Reclamada — Escala / horário", "texto", "não", ""],
    ],
  },
  {
    title: "Seção 3 — Período do contrato e remuneração",
    fields: [
      ["DATA_ADMISSAO", "Admissão", "data", "não", ""],
      ["DATA_RESCISAO", "Rescisão / último dia trabalhado", "data", "não", "Oculto quando contrato em vigor"],
      ["SALARIO", "Salário-base mensal", "texto (máscara moeda)", "não", "Ex.: R$ 2.148,22. Base de todo o cálculo"],
      ["(estado) contrato_em_vigor", "Contrato ainda em vigor?", "Sim/Não", "não", "Não é campo da entidade. Quando Sim, esconde datas de saída e adiciona frase aos fatos narrados"],
    ],
  },
  {
    title: "Seção 4 — Tipo de dispensa e responsável",
    fields: [
      ["tipo_dispensa", "Tipo de dispensa", "seleção", "não", "sem_justa_causa, rescisao_indireta, nulidade_pedido_demissao, reversao_justa_causa"],
      ["ULTIMO_DIA_TRABALHADO", "Último dia trabalhado", "data", "não", "Oculto quando contrato em vigor"],
      ["RESPONSAVEL_HIERARQUICO", "Nome do responsável hierárquico", "texto", "não", "Ex.: Sr. João (supervisor de turno)"],
    ],
  },
  {
    title: "Seção 5 — Jornada de trabalho",
    fields: [
      ["finais_semana", "Trabalhou em finais de semana e feriados?", "Sim/Não", "não", ""],
      ["tem_adic_noturno", "Trabalhava entre 22h e 5h (adicional noturno)?", "Sim/Não", "não", ""],
    ],
  },
  {
    title: "Seção 6 — Benefícios",
    fields: [
      ["vale_refeicao", "Vale-refeição", "Sim/Não", "não", ""],
      ["vale_alimentacao", "Vale-alimentação", "Sim/Não", "não", ""],
      ["vale_transporte", "Vale-transporte", "Sim/Não", "não", ""],
      ["VALOR_VALE_REFEICAO", "Valor diário do vale-refeição (opcional)", "texto (máscara moeda)", "não", "Visível se vale_refeicao = Sim"],
      ["VALOR_AUX_ALIMENTACAO", "Valor diário do auxílio-alimentação (opcional)", "texto (máscara moeda)", "não", "Visível se vale_alimentacao ou vale_refeicao = Sim"],
      ["VAL_CONDUCAO", "Valor diário da condução (opcional)", "texto (máscara moeda)", "não", "Visível se vale_transporte = Sim"],
    ],
  },
  {
    title: "Seção 7 — Férias",
    fields: [
      ["ferias", "Possuiu férias?", "Sim/Não", "não", ""],
      ["ferias_quantidade", "Quantidade", "seleção", "não", "Não possuiu, Proporcional, 1 período integral, 2 períodos, 3 ou mais"],
    ],
  },
  {
    title: "Seção 8 — Folgas trabalhadas (FT)",
    fields: [
      ["folgas_trabalhadas", "Trabalhou folgas?", "Sim/Não", "não", "Campos abaixo visíveis se Sim"],
      ["FT_QTD_MEDIA", "Média de folgas por mês", "seleção", "não", "1 a 2, 3 a 4, 4 a 5, 5 a 6, 5 a 7, Mais de 6"],
      ["VAL_FT", "Valor recebido por FT / diária", "texto (máscara moeda)", "não", "Ex.: R$ 180,00"],
      ["ft_pagamento", "Forma de recebimento", "seleção", "não", "Pix, Dinheiro, Em folha de pagamento, Outra"],
      ["ft_comprovante", "Possui comprovante de pagamento?", "Sim/Não", "não", ""],
      ["folgas_conciliava", "Conciliava jornada?", "Sim/Não", "não", ""],
      ["folgas_periodo_conciliou", "Período que conciliou", "texto", "não", "Visível se folgas_conciliava = Sim"],
      ["SALARIOS_ABERTO", "Salários em aberto — quais meses", "texto", "não", "Ex.: outubro e novembro/2025"],
      ["SALARIOS_ABERTO_QTD", "Salários em aberto — qtd. de meses", "número", "não", "Ex.: 2"],
      ["VALOR_POR_FORA", "Valor 'por fora' por mês", "texto (máscara moeda)", "não", "Ex.: R$ 500,00"],
    ],
  },
  {
    title: "Seção 9 — Intervalo intrajornada",
    fields: [
      ["intervalo_suprimido", "Horário de almoço suprimido?", "Sim/Não", "não", ""],
      ["INTERVALO_USUFRUIDO", "Quanto tempo era usufruído, em média", "texto", "não", "Visível se intervalo_suprimido = Sim. Ex.: 10 a 15 minutos"],
    ],
  },
  {
    title: "Seção 10 — Horas extras",
    fields: [
      ["horas_extras", "Realizava horas extras?", "Sim/Não", "não", "Campos abaixo visíveis se Sim"],
      ["media_horas_extras", "Média de horas extras", "seleção", "não", "15 min, 20 min, 30 min, 40 min, 45 min, 1h, 1h20, 1h30, Até 1h, 1 a 2h, 2 a 3h, Mais de 3h"],
      ["controle_ponto", "Havia controle de ponto?", "Sim/Não", "não", ""],
      ["formato_ponto", "Qual formato do ponto", "texto", "não", "Visível se controle_ponto = Sim"],
      ["periodo_antecedente", "Período antecedente à jornada", "seleção", "não", "0 a 2 horas, passo de 5 min"],
      ["periodo_sucedente", "Período sucedente", "seleção", "não", "Mesmas opções do antecedente"],
    ],
  },
  {
    title: "Seção 11 — Acúmulo/desvio de função",
    fields: [
      ["acumulo_funcao", "Houve acúmulo ou desvio de função?", "Sim/Não", "não", ""],
      ["funcoes_acumuladas", "Quais atividades passou a exercer", "texto longo", "não", "Visível se acumulo_funcao = Sim"],
    ],
  },
  {
    title: "Seção 12 — Condições de trabalho",
    fields: [
      ["armamento_colete", "Utilizava armamento e colete?", "Sim/Não", "não", ""],
    ],
  },
  {
    title: "Seção 13 — Gratificações e prêmios",
    fields: [
      ["gratificacao", "Recebe algum tipo de gratificação?", "Sim/Não", "não", ""],
      ["gratificacao_qual", "Qual", "texto", "não", "Visível se gratificacao = Sim"],
      ["assiduidade", "Havia prêmio de assiduidade?", "Sim/Não", "não", ""],
      ["assiduidade_prometido", "Valor prometido (mensal)", "texto (máscara moeda)", "não", "Visível se assiduidade = Sim"],
      ["assiduidade_pago", "Valor efetivamente pago", "texto (máscara moeda)", "não", "Pedido = diferença entre prometido e pago"],
    ],
  },
  {
    title: "Seção 14 — Documentos",
    fields: [
      ["holerites", "Holerites", "Sim/Não", "não", ""],
      ["rescisao_contratual", "Rescisão contratual", "Sim/Não", "não", ""],
      ["espelho_ponto", "Espelho de ponto", "Sim/Não", "não", ""],
    ],
  },
  {
    title: "Seção 15 — Descontos",
    fields: [
      ["desconto_indevido", "Houve desconto indevido?", "Sim/Não", "não", ""],
      ["desconto_qual", "Qual", "texto", "não", ""],
    ],
  },
  {
    title: "Seção 16 — Saúde e segurança",
    fields: [
      ["tem_doenca", "Doença ou acidente de trabalho?", "Sim/Não", "não", ""],
      ["tem_insalubridade", "Insalubridade?", "Sim/Não", "não", ""],
      ["insalubridade_porcentagem", "Porcentagem (insalubridade)", "texto", "não", "Visível se tem_insalubridade = Sim. Ex.: 20%"],
      ["tem_periculosidade", "Periculosidade?", "Sim/Não", "não", ""],
      ["periculosidade_porcentagem", "Porcentagem (periculosidade)", "texto", "não", "Visível se tem_periculosidade = Sim. Ex.: 30%"],
      ["produtos", "Quais produtos", "texto", "não", ""],
      ["epi", "Utilizava EPI", "texto", "não", ""],
    ],
  },
  {
    title: "Seção 17 — Testemunha",
    fields: [
      ["testemunha", "Testemunha", "seleção", "não", "Sim, Não, Irá verificar"],
    ],
  },
  {
    title: "Seção 18 — Fatos narrados pelo reclamante",
    fields: [
      ["fatos_narrados", "Relato completo", "texto longo", "não", "Contrato em vigor: submit adiciona frase padronizada automaticamente"],
    ],
  },
  {
    title: "Campos do sistema (não editáveis no formulário)",
    fields: [
      ["aprovacao_status", "Status de aprovação", "enum", "—", "pendente (padrão), aprovado, reprovado. Via API externa"],
      ["aprovacao_motivo", "Motivo da reprovação", "texto", "—", "Preenchido quando aprovacao_status = reprovado"],
    ],
  },
  {
    title: "Campos automáticos (gerados pela plataforma)",
    fields: [
      ["id", "Identificador único do registro", "—", "—", ""],
      ["created_date", "Data de criação", "—", "—", ""],
      ["updated_date", "Data da última atualização", "—", "—", ""],
      ["created_by_id", "ID do usuário que criou", "—", "—", ""],
    ],
  },
];

const NOTES = [
  "Máscaras automáticas: CPF, CNPJ, CEP, telefone e moeda são formatados conforme o usuário digita.",
  "Campos dependentes: ao responder 'Não' em um campo Sim/Não com subcampos, os subcampos são automaticamente apagados.",
  "Campos obrigatórios na entidade: apenas RECL_NOME e RECL_CPF são obrigatórios para criar um registro.",
  "Contrato em vigor: não é um campo persistido — é inferido na edição pela ausência de DATA_RESCISAO combinada com a marca 'EM VIGOR' nos fatos narrados.",
];

export default function DocumentacaoForm() {
  const docRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  const baixarPdf = async () => {
    if (!docRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(docRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("documentacao-formulario-entrevista.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-app-bg pb-20 text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <button
            onClick={baixarPdf}
            disabled={generating}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 font-bold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            {generating ? "Gerando PDF..." : "Baixar PDF"}
          </button>
        </div>
      </header>

      <div ref={docRef} className="mx-auto max-w-5xl bg-white px-4 py-8 sm:px-8">
        <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-6">
          <FileText className="h-8 w-8 text-brand" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Documentação do Formulário</h1>
            <p className="mt-1 text-sm text-slate-500">Entrevista Trabalhista — todos os campos e identificações</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">Observações gerais</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {NOTES.map((n, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section, si) => (
            <section key={si}>
              <h2 className="mb-3 text-lg font-bold text-slate-900">{section.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-left">
                      <th className="border border-slate-200 px-3 py-2 font-bold text-slate-700">Campo (key)</th>
                      <th className="border border-slate-200 px-3 py-2 font-bold text-slate-700">Rótulo</th>
                      <th className="border border-slate-200 px-3 py-2 font-bold text-slate-700">Tipo</th>
                      <th className="border border-slate-200 px-3 py-2 font-bold text-slate-700">Obrig.</th>
                      <th className="border border-slate-200 px-3 py-2 font-bold text-slate-700">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.fields.map((f, fi) => (
                      <tr key={fi} className={fi % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="border border-slate-200 px-3 py-2 font-mono text-xs text-brand">{f[0]}</td>
                        <td className="border border-slate-200 px-3 py-2 font-medium text-slate-800">{f[1]}</td>
                        <td className="border border-slate-200 px-3 py-2 text-slate-600">{f[2]}</td>
                        <td className="border border-slate-200 px-3 py-2 text-center">
                          {f[3] === "sim" ? (
                            <span className="font-bold text-brand">Sim</span>
                          ) : f[3] === "não" ? (
                            <span className="text-slate-400">Não</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="border border-slate-200 px-3 py-2 text-xs text-slate-500">{f[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}