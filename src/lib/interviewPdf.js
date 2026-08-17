import { jsPDF } from "jspdf";
import { TIPO_DISPENSA_OPTIONS } from "@/lib/interviewOptions";

const formatDate = (v) => {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const bool = (v) => (v === true ? "Sim" : v === false ? "Não" : "—");
const txt = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));

const dispensaLabel = (v) =>
  TIPO_DISPENSA_OPTIONS.find((o) => o.value === v)?.label || txt(v);

const SECTIONS = [
  {
    title: "Modelo de petição",
    fields: [{ label: "Modelo", get: (d) => txt(d.modelo_peticao) }, { label: "Título", get: (d) => txt(d.titulo) }],
  },
  {
    title: "Identificação do reclamante",
    fields: [
      { label: "Nome", get: (d) => txt(d.RECL_NOME) },
      { label: "Nacionalidade", get: (d) => txt(d.RECL_NACIONALIDADE) },
      { label: "Estado civil", get: (d) => txt(d.RECL_ESTADOCIVIL) },
      { label: "RG", get: (d) => txt(d.RECL_RG) },
      { label: "CPF", get: (d) => txt(d.RECL_CPF) },
      { label: "PIS", get: (d) => txt(d.RECL_PIS) },
      { label: "CTPS", get: (d) => txt(d.RECL_CTPS) },
      { label: "Série", get: (d) => txt(d.RECL_SERIE) },
      { label: "Nascimento", get: (d) => formatDate(d.RECL_NASC) },
      { label: "Filiação", get: (d) => txt(d.RECL_FILIACAO) },
      { label: "Endereço", get: (d) => txt(d.RECL_ENDERECO) },
      { label: "CEP", get: (d) => txt(d.RECL_CEP) },
      { label: "E-mail", get: (d) => txt(d.email) },
      { label: "Telefone", get: (d) => txt(d.telefone) },
      { label: "Função", get: (d) => txt(d.FUNCAO) },
    ],
  },
  {
    title: "Reclamadas",
    fields: [
      { label: "Reclamada 1", get: (d) => txt(d.RECL1_NOME) },
      { label: "CNPJ 1", get: (d) => txt(d.RECL1_CNPJ) },
      { label: "Endereço 1", get: (d) => [d.RECL1_LOGRADOURO, d.RECL1_ENDCOMPL].filter(Boolean).join(", ") || "—" },
      { label: "Reclamada 2", get: (d) => txt(d.RECL2_NOME) },
      { label: "CNPJ 2", get: (d) => txt(d.RECL2_CNPJ) },
      { label: "Endereço 2", get: (d) => [d.RECL2_LOGRADOURO, d.RECL2_ENDCOMPL].filter(Boolean).join(", ") || "—" },
      { label: "Reclamada 3", get: (d) => txt(d.RECL3_NOME) },
      { label: "CNPJ 3", get: (d) => txt(d.RECL3_CNPJ) },
      { label: "Endereço 3", get: (d) => [d.RECL3_LOGRADOURO, d.RECL3_ENDCOMPL].filter(Boolean).join(", ") || "—" },
    ],
  },
  {
    title: "Período e rescisão",
    fields: [
      { label: "Admissão", get: (d) => formatDate(d.DATA_ADMISSAO) },
      { label: "Rescisão", get: (d) => formatDate(d.DATA_RESCISAO) },
      { label: "Salário-base", get: (d) => txt(d.SALARIO) },
      { label: "Tipo de dispensa", get: (d) => dispensaLabel(d.tipo_dispensa) },
    ],
  },
  {
    title: "Jornada",
    fields: [
      { label: "Escala", get: (d) => txt(d.escala) },
      { label: "Horário", get: (d) => txt(d.JORNADA_HORARIO) },
      { label: "Trabalhava finais de semana/feriados", get: (d) => bool(d.finais_semana) },
      { label: "Adicional noturno", get: (d) => bool(d.tem_adic_noturno) },
    ],
  },
  {
    title: "Benefícios",
    fields: [
      { label: "Vale-refeição", get: (d) => bool(d.vale_refeicao) },
      { label: "Vale-alimentação", get: (d) => bool(d.vale_alimentacao) },
      { label: "Valor do auxílio-alimentação", get: (d) => txt(d.VALOR_AUX_ALIMENTACAO) },
      { label: "Vale-transporte", get: (d) => bool(d.vale_transporte) },
      { label: "Valor da condução", get: (d) => txt(d.VAL_CONDUCAO) },
    ],
  },
  {
    title: "Férias",
    fields: [
      { label: "Gozou férias", get: (d) => bool(d.ferias) },
      { label: "Quantidade", get: (d) => txt(d.ferias_quantidade) },
    ],
  },
  {
    title: "Folgas trabalhadas",
    fields: [
      { label: "Trabalhou folgas", get: (d) => bool(d.folgas_trabalhadas) },
      { label: "Quantidade média", get: (d) => txt(d.FT_QTD_MEDIA) },
      { label: "Valor", get: (d) => txt(d.VAL_FT) },
      { label: "Forma de pagamento", get: (d) => txt(d.ft_pagamento) },
      { label: "Possui comprovante", get: (d) => bool(d.ft_comprovante) },
    ],
  },
  {
    title: "Intervalo intrajornada",
    fields: [
      { label: "Intervalo suprimido", get: (d) => bool(d.intervalo_suprimido) },
      { label: "Intervalo gozado", get: (d) => txt(d.INTERVALO_GOZADO) },
    ],
  },
  {
    title: "Horas extras",
    fields: [
      { label: "Realizava horas extras", get: (d) => bool(d.horas_extras) },
      { label: "Média", get: (d) => txt(d.media_horas_extras) },
      { label: "Período antecedente", get: (d) => txt(d.periodo_antecedente) },
      { label: "Período sucedente", get: (d) => txt(d.periodo_sucedente) },
    ],
  },
  {
    title: "Acúmulo/desvio de função",
    fields: [
      { label: "Acumulo de função", get: (d) => bool(d.acumulo_funcao) },
      { label: "Funções acumuladas", get: (d) => txt(d.funcoes_acumuladas) },
    ],
  },
  {
    title: "Condições de trabalho",
    fields: [{ label: "Armamento/colete", get: (d) => bool(d.armamento_colete) }],
  },
  {
    title: "Gratificações",
    fields: [
      { label: "Recebia gratificação", get: (d) => bool(d.gratificacao) },
      { label: "Qual", get: (d) => txt(d.gratificacao_qual) },
      { label: "Prêmio de assiduidade prometido", get: (d) => bool(d.assiduidade) },
      { label: "Valor prometido", get: (d) => txt(d.assiduidade_prometido) },
      { label: "Valor pago", get: (d) => txt(d.assiduidade_pago) },
    ],
  },
  {
    title: "Documentos",
    fields: [
      { label: "Holerites", get: (d) => bool(d.holerites) },
      { label: "Rescisão contratual", get: (d) => bool(d.rescisao_contratual) },
      { label: "Espelho de ponto", get: (d) => bool(d.espelho_ponto) },
    ],
  },
  {
    title: "Descontos",
    fields: [
      { label: "Desconto indevido", get: (d) => bool(d.desconto_indevido) },
      { label: "Qual", get: (d) => txt(d.desconto_qual) },
    ],
  },
  {
    title: "Saúde e segurança",
    fields: [
      { label: "Possui doença", get: (d) => bool(d.tem_doenca) },
      { label: "Insalubridade", get: (d) => bool(d.tem_insalubridade) },
      { label: "Periculosidade", get: (d) => bool(d.tem_periculosidade) },
      { label: "Produtos", get: (d) => txt(d.produtos) },
      { label: "EPI", get: (d) => txt(d.epi) },
    ],
  },
  {
    title: "Testemunha",
    fields: [{ label: "Possui testemunha", get: (d) => txt(d.testemunha) }],
  },
  {
    title: "Fatos narrados",
    fields: [{ label: "Narrativa", get: (d) => txt(d.fatos_narrados) }],
  },
];

export function generateInterviewPdf(data) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 50;
  const contentW = pageW - marginX * 2;
  let y = 50;

  const ensure = (needed) => {
    if (y + needed > pageH - 40) {
      doc.addPage();
      y = 50;
    }
  };

  // Cabeçalho
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("FERNANDO VIEIRA ADVOGADOS", marginX, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text("Entrevista trabalhista — Formulário de atendimento", marginX, y);
  y += 22;
  doc.setDrawColor(226, 232, 240);
  doc.line(marginX, y, pageW - marginX, y);
  y += 18;

  if (data.RECL_NOME || data.modelo_peticao) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`Reclamante: ${data.RECL_NOME || "—"}`, marginX, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Modelo de petição: ${data.modelo_peticao || "—"}`, marginX, y);
    y += 20;
  }

  SECTIONS.forEach((section, idx) => {
    ensure(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(`${idx + 1}. ${section.title}`, marginX, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);

    section.fields.forEach((f) => {
      const value = f.get(data);
      const labelLine = `${f.label}: `;
      const wrapped = doc.splitTextToSize(`${labelLine}${value}`, contentW);
      ensure(wrapped.length * 13 + 4);
      wrapped.forEach((line, i) => {
        if (i === 0) {
          doc.setFont("helvetica", "bold");
          doc.text(f.label + ":", marginX, y);
          doc.setFont("helvetica", "normal");
          const labelW = doc.getTextWidth(labelLine);
          doc.text(value, marginX + labelW, y);
        } else {
          doc.text(line, marginX, y);
        }
        y += 13;
      });
      y += 4;
    });
    y += 6;
  });

  // Rodapé em todas as páginas
  const pages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Gerado em ${new Date().toLocaleString("pt-BR")} · Página ${p}/${pages}`,
      marginX,
      pageH - 20
    );
  }

  const safeName = (data.RECL_NOME || "entrevista")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
  doc.save(`${safeName}.pdf`);
}