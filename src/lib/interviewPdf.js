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

const RECLAMADAS = [
  { n: "1ª RECLAMADA", nome: "RECL1_NOME", cnpj: "RECL1_CNPJ", log: "RECL1_LOGRADOURO", compl: "RECL1_ENDCOMPL" },
  { n: "2ª RECLAMADA", nome: "RECL2_NOME", cnpj: "RECL2_CNPJ", log: "RECL2_LOGRADOURO", compl: "RECL2_ENDCOMPL" },
  { n: "3ª RECLAMADA", nome: "RECL3_NOME", cnpj: "RECL3_CNPJ", log: "RECL3_LOGRADOURO", compl: "RECL3_ENDCOMPL" },
];

const SECTIONS = [
  {
    title: "Identificação do(a) cliente",
    fields: [
      { label: "Nome", get: (d) => txt(d.RECL_NOME) },
      { label: "Nacionalidade", get: (d) => txt(d.RECL_NACIONALIDADE) },
      { label: "Estado civil", get: (d) => txt(d.RECL_ESTADOCIVIL) },
      { label: "Nascimento", get: (d) => formatDate(d.RECL_NASC) },
      { label: "Filiação", get: (d) => txt(d.RECL_FILIACAO) },
      { label: "RG", get: (d) => txt(d.RECL_RG) },
      { label: "CPF", get: (d) => txt(d.RECL_CPF) },
      { label: "PIS", get: (d) => txt(d.RECL_PIS) },
      { label: "CTPS", get: (d) => txt(d.RECL_CTPS) },
      { label: "Série", get: (d) => txt(d.RECL_SERIE) },
      { label: "Endereço", get: (d) => txt(d.RECL_ENDERECO) },
      { label: "CEP", get: (d) => txt(d.RECL_CEP) },
      { label: "E-mail", get: (d) => txt(d.email) },
      { label: "Telefone", get: (d) => txt(d.telefone) },
      { label: "Função", get: (d) => txt(d.FUNCAO) },
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
    title: "Jornada de trabalho",
    fields: [
      { label: "Escala", get: (d) => txt(d.escala) },
      { label: "Horário", get: (d) => txt(d.JORNADA_HORARIO) },
      { label: "Finais de semana/feriados", get: (d) => bool(d.finais_semana) },
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
      { label: "Acúmulo de função", get: (d) => bool(d.acumulo_funcao) },
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
      { label: "Prêmio de assiduidade", get: (d) => bool(d.assiduidade) },
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

const LOGO_URL =
  "https://media.base44.com/images/public/6a734d6c72c1f853994b8733/3d1eb3c60_image.png";

let logoCache = null;
async function loadLogo() {
  if (logoCache) return logoCache;
  try {
    const res = await fetch(LOGO_URL);
    const blob = await res.blob();
    logoCache = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    logoCache = null;
  }
  return logoCache;
}

const BRAND = [255, 79, 24];
const INK = [31, 31, 39];
const MUTED = [107, 114, 128];
const LINE = [228, 228, 228];

export async function generateInterviewPdf(data) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 50;
  const contentW = pageW - marginX * 2;
  let y = 56;

  const ensure = (needed) => {
    if (y + needed > pageH - 44) {
      doc.addPage();
      y = 56;
    }
  };

  // Cabeçalho centralizado
  const logo = await loadLogo();
  if (logo) {
    const logoW = 200;
    const logoH = 46;
    doc.addImage(logo, "PNG", (pageW - logoW) / 2, y, logoW, logoH);
    y += logoH + 10;
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...INK);
    doc.text("FERNANDO VIEIRA ADVOGADOS", pageW / 2, y + 12, { align: "center" });
    y += 30;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Entrevista trabalhista — Formulário de atendimento", pageW / 2, y, { align: "center" });
  y += 14;
  doc.setDrawColor(...LINE);
  doc.line(marginX, y, pageW - marginX, y);
  y += 22;

  // Sumário
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  doc.text(`Reclamante: ${data.RECL_NOME || "—"}`, marginX, y);
  if (data.modelo_peticao) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(`Modelo: ${data.modelo_peticao}`, pageW - marginX, y, { align: "right" });
  }
  y += 22;

  let sectionIndex = 0;

  const renderReclamadas = () => {
    renderSectionTitle("Identificação do(s) reclamado(s)", ++sectionIndex);
    const temReclamada = RECLAMADAS.some((r) => data[r.nome] || data[r.cnpj] || data[r.log]);
    if (!temReclamada) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...MUTED);
      doc.text("Nenhuma reclamada informada.", marginX, y);
      y += 16;
    } else {
      RECLAMADAS.forEach((r) => {
        const hasData = data[r.nome] || data[r.cnpj] || data[r.log];
        if (!hasData) return;
        ensure(60);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...BRAND);
        doc.text(r.n, marginX, y);
        y += 14;
        renderField("Nome", txt(data[r.nome]));
        renderField("CNPJ", txt(data[r.cnpj]));
        renderField("Endereço", [data[r.log], data[r.compl]].filter(Boolean).join(", ") || "—");
        y += 4;
      });
    }
    y += 6;
  };

  const renderField = (label, value, indentX = 0) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    const labelText = `${label}:`;
    const labelW = doc.getTextWidth(labelText);
    const valueX = marginX + indentX + labelW + 4;
    const valueW = marginX + contentW - valueX;
    const valueStr = String(value);
    const wrapped = doc.splitTextToSize(valueStr, Math.max(valueW, 60));
    ensure(wrapped.length * 13 + 6);
    doc.text(labelText, marginX + indentX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    wrapped.forEach((line, i) => {
      doc.text(line, i === 0 ? valueX : marginX + indentX + labelW + 4, y);
      y += 13;
    });
    y += 4;
  };

  const renderSectionTitle = (title, idx) => {
    ensure(30);
    doc.setFillColor(...BRAND);
    doc.rect(marginX, y - 9, 3, 11, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(`${idx}. ${title}`, marginX + 10, y);
    y += 16;
  };

  SECTIONS.forEach((section, idx) => {
    renderSectionTitle(section.title, ++sectionIndex);
    section.fields.forEach((f) => renderField(f.label, f.get(data)));
    y += 8;
    // Após a identificação do cliente, vêm as reclamadas (ordem do modelo .docx)
    if (idx === 0) renderReclamadas();
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
      pageW / 2,
      pageH - 20,
      { align: "center" }
    );
  }

  const safeName = (data.RECL_NOME || "entrevista")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
  doc.save(`${safeName}.pdf`);
}