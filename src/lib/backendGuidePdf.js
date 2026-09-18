import jsPDF from "jspdf";

// Guia de integração do backend (endpoints, chaves, webhooks) gerado em PDF.
// Documento pensado para ser encaminhado a quem for integrar o sistema externo.

const BASE_URL = "https://formulariofav.base44.app";

const OVERVIEW = [
  "Este documento descreve todas as integrações de backend do formulário de entrevista trabalhista: os endpoints disponíveis, as chaves de autenticação, os payloads de entrada e saída e o webhook de saída.",
  `URL base do app publicado: ${BASE_URL}`,
  "Formato de todas as requisições e respostas: JSON (application/json), codificação UTF-8.",
];

const SECRETS = [
  ["APROVACAO_API_KEY", "Chave que protege os endpoints criarEntrevista e atualizarAprovacaoEntrevista. Enviada no header x-api-key (ou na query ?api_key=)."],
  ["CASA_DOS_DADOS_API_KEY", "Credencial da API Casa dos Dados usada internamente pela função localizarCnpj."],
  ["WEBHOOK_URL", "Destino principal do webhook de saída (entrevista salva)."],
  ["WEBHOOK_URL_2", "Segundo destino do webhook de saída (opcional)."],
  ["WEBHOOK_SECRET", "Segredo enviado no header X-Webhook-Secret do webhook principal."],
  ["WEBHOOK_SECRET_2", "Segredo do segundo webhook. Se não definido, usa WEBHOOK_SECRET."],
];

const ENDPOINTS = [
  {
    num: "3.1",
    title: "Criar entrevista",
    method: "POST",
    url: `${BASE_URL}/functions/criarEntrevista`,
    auth: "Header  x-api-key: <APROVACAO_API_KEY>",
    desc: "Cria uma nova entrevista na base de dados a partir dos dados enviados pelo sistema externo e retorna o ID do registro criado.",
    request: `{
  "RECL_NOME": "João da Silva",
  "RECL_CPF": "123.456.789-00",
  "RECL_NASC": "1990-01-15",
  "SALARIO": "R$ 2.148,22",
  "FUNCAO": "Vigilante",
  "tipo_dispensa": "sem_justa_causa",
  "DATA_ADMISSAO": "2023-01-02",
  "DATA_RESCISAO": "2025-06-30"
}`,
    response: `201 Created
{ "status": "ok", "entrevista_id": "abc123", "data": { ...registro } }

400 Bad Request
{ "error": "RECL_NOME e RECL_CPF são obrigatórios" }

401 Unauthorized
{ "error": "Unauthorized — API key inválida" }`,
    rules: [
      "Método POST com Content-Type: application/json.",
      "Somente RECL_NOME e RECL_CPF são obrigatórios.",
      "Os demais campos seguem o schema da entidade Entrevista (datas em ISO yyyy-mm-dd; SALARIOS_ABERTO_QTD é numérico).",
      "Usa a mesma chave APROVACAO_API_KEY do endpoint de aprovação.",
    ],
  },
  {
    num: "3.2",
    title: "Aprovar / Reprovar entrevista",
    method: "POST",
    url: `${BASE_URL}/functions/atualizarAprovacaoEntrevista`,
    auth: "Header  x-api-key: <APROVACAO_API_KEY>",
    desc: "Atualiza o status de aprovação de uma entrevista já existente, definindo se ela foi aprovada ou reprovada.",
    request: `{
  "entrevista_id": "abc123",
  "status": "aprovado",
  "motivo": "Falta de documentos"
}`,
    response: `200 OK
{ "status": "ok", "entrevista_id": "abc123", "aprovacao_status": "aprovado" }

400 Bad Request
{ "error": "motivo é obrigatório quando status = reprovado" }

401 Unauthorized
{ "error": "Unauthorized — API key inválida" }`,
    rules: [
      "entrevista_id é obrigatório.",
      "status deve ser exatamente 'aprovado' ou 'reprovado'.",
      "Quando status = 'reprovado', o campo 'motivo' é obrigatório e é salvo em aprovacao_motivo.",
      "Quando status = 'aprovado', o campo aprovacao_motivo é limpo.",
      "A chave pode ir no header (x-api-key) ou na query string (?api_key=).",
    ],
  },
  {
    num: "3.3",
    title: "Consultar CNPJ / Razão Social",
    method: "POST",
    url: `${BASE_URL}/functions/localizarCnpj`,
    auth: "Sem autenticação (uso interno pelo app)",
    desc: "Consulta a base da Casa dos Dados para localizar CNPJs por razão social ou por endereço. Retorna candidatos ranqueados por similaridade. Usado pelo painel lateral do formulário para apoiar o preenchimento das reclamadas.",
    request: `{
  "razao_social": "GEAR SEGURANCA",
  "endereco": "Rua das Flores, 123",
  "municipio": "São Paulo",
  "uf": "SP",
  "cep": "01000-000"
}`,
    response: `200 OK
{
  "status": "success",
  "total": 3,
  "ambiguo": false,
  "candidatos": [{
    "cnpj": "12345678000190",
    "cnpj_formatado": "12.345.678/0001-90",
    "razao_social": "GEAR SEGURANCA PRIVADA LTDA",
    "situacao": "ATIVO",
    "endereco_completo": "Rua das Flores, 123 - São Paulo/SP",
    "score_endereco": 0.92
  }]
}

status "empty" quando não há resultados
status "error" em caso de falha`,
    rules: [
      "É preciso informar a razão social OU o endereço (CEP ou cidade/UF).",
      "O sistema faz até 3 tentativas, com intervalo de 1,5s entre cada.",
      "Candidatos ordenados: razão social idêntica primeiro, depois por score de similaridade de endereço.",
      "ambiguo = true quando há 2 ou mais candidatos com score de endereço acima de 0,85.",
      "O resultado é informativo — o preenchimento final dos campos da reclamada é feito pelo consultor.",
    ],
  },
  {
    num: "3.4",
    title: "Webhook — Entrevista salva (saída)",
    method: "POST (saída)",
    url: "Definido nos secrets WEBHOOK_URL e WEBHOOK_URL_2",
    auth: "Header  X-Webhook-Secret: <WEBHOOK_SECRET>",
    desc: "Disparado automaticamente pelo app quando uma entrevista é salva ou reenviada. Envia o payload completo da entrevista para até dois destinos configurados. É o insumo que o sistema externo consome para gerar a peça jurídica.",
    request: `{
  "event": "entrevista.salva",
  "id": "abc123",
  "created_by": "usuario@email.com",
  "timestamp": "2026-09-18T11:24:00-03:00",
  "data": {
    ...todos os campos da entrevista
  }
}`,
    response: `O webhook não devolve resposta ao cliente (fire-and-forget).
Falha no webhook NÃO impede o salvamento da entrevista.
O app tenta os dois destinos em paralelo.`,
    rules: [
      "Disparado após cada salvamento ou reenvio de entrevista.",
      "timestamp sempre em horário de Brasília (America/Sao_Paulo, UTC-3).",
      "created_by = e-mail do usuário logado ou 'anonimo' (formulário público, sem login).",
      "Com o contrato em vigor, o campo fatos_narrados recebe automaticamente a frase padronizada antes do envio.",
      "O segundo destino (WEBHOOK_URL_2) usa WEBHOOK_SECRET_2 se definido; senão, WEBHOOK_SECRET.",
    ],
  },
];

const FLOW = [
  "O sistema externo chama criarEntrevista com os dados coletados e recebe o entrevista_id.",
  "O consultor pode revisar ou editar a entrevista no app.",
  "Ao salvar (ou reenviar), o app dispara o webhook para os destinos configurados.",
  "O sistema externo processa os dados e chama atualizarAprovacaoEntrevista com status 'aprovado' ou 'reprovado'.",
  "O status (e o motivo, quando reprovado) passa a aparecer no app, na lista de entrevistas.",
];

const NOTES = [
  "Todas as chaves são secretas: mantenha-as no servidor do sistema integrador, nunca no navegador ou no cliente.",
  "O formulário do app é público; entrevistas podem chegar sem usuário autenticado (created_by = 'anonimo').",
  "Datas em ISO yyyy-mm-dd; valores monetários podem ser enviados como texto (ex.: 'R$ 2.148,22').",
  "O webhook é fire-and-forget — falhas nele não bloqueiam o salvamento da entrevista.",
];

const MARGIN = 16;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM = PAGE_H - 18;

export function generateBackendGuidePdf() {
  const pdf = new jsPDF("p", "mm", "a4");
  let y = MARGIN;

  const ensure = (h) => {
    if (y + h > BOTTOM) {
      pdf.addPage();
      y = MARGIN;
    }
  };

  const text = (str, opts = {}) => {
    const {
      size = 10,
      style = "normal",
      font = "helvetica",
      color = [30, 41, 59],
      indent = 0,
      gapBefore = 0,
      gapAfter = 2.5,
    } = opts;
    y += gapBefore;
    pdf.setFont(font, style);
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lh = size * 0.3528 * 1.4;
    const lines = pdf.splitTextToSize(String(str), CONTENT_W - indent);
    lines.forEach((line) => {
      ensure(lh);
      pdf.text(line, MARGIN + indent, y + lh * 0.8);
      y += lh;
    });
    y += gapAfter;
  };

  const bullet = (str, size = 10) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(51, 65, 85);
    const lh = size * 0.3528 * 1.4;
    const lines = pdf.splitTextToSize(String(str), CONTENT_W - 8);
    lines.forEach((line, i) => {
      ensure(lh);
      if (i === 0) {
        pdf.setFillColor(234, 88, 12);
        pdf.rect(MARGIN + 1.5, y + lh * 0.35, 1.4, 1.4, "F");
      }
      pdf.text(line, MARGIN + 7, y + lh * 0.8);
      y += lh;
    });
    y += 1.4;
  };

  const code = (str, size = 8) => {
    const lh = size * 0.3528 * 1.35;
    pdf.setFont("courier", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(30, 41, 59);
    y += 1;
    String(str)
      .split("\n")
      .forEach((line) => {
        const wrapped = pdf.splitTextToSize(line || " ", CONTENT_W - 12);
        wrapped.forEach((w) => {
          ensure(lh);
          pdf.text(w, MARGIN + 6, y + lh * 0.8);
          y += lh;
        });
      });
    y += 3;
  };

  const heading = (str, size = 13) => {
    y += 4;
    const h = size * 0.3528 * 1.4 + 4;
    ensure(h);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(size);
    pdf.setTextColor(15, 23, 42);
    pdf.text(str, MARGIN, y + size * 0.3528);
    y += size * 0.3528 + 1.5;
    pdf.setDrawColor(234, 88, 12);
    pdf.setLineWidth(0.6);
    pdf.line(MARGIN, y, MARGIN + 42, y);
    y += 3.5;
  };

  const label = (str, value, mono = false) => {
    text(str, { size: 9, style: "bold", color: [100, 116, 139], gapAfter: 0.5 });
    text(value, { size: 9.5, font: mono ? "courier" : "helvetica", color: [30, 41, 59], gapAfter: 2 });
  };

  // Cabeçalho
  pdf.setFillColor(31, 31, 39);
  pdf.rect(0, 0, PAGE_W, 34, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  pdf.text("Guia de Integração — Backend", MARGIN, 17);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(255, 237, 213);
  pdf.text("Formulário de Entrevista Trabalhista", MARGIN, 25);
  pdf.setFontSize(8.5);
  pdf.setTextColor(203, 213, 225);
  pdf.text(BASE_URL, MARGIN, 30);
  y = 42;

  heading("1. Visão geral");
  OVERVIEW.forEach((p) => text(p));

  heading("2. Autenticação e chaves (secrets)");
  text("As chaves ficam configuradas no app e não devem ser expostas ao cliente. O sistema integrador usa a APROVACAO_API_KEY nos endpoints protegidos.");
  SECRETS.forEach(([name, desc]) => {
    text(name, { size: 9.5, font: "courier", style: "bold", color: [194, 65, 12], gapAfter: 0.5 });
    bullet(desc, 9.5);
  });

  heading("3. Endpoints");
  ENDPOINTS.forEach((ep) => {
    text(`${ep.num}  ${ep.title}`, { size: 11, style: "bold", color: [15, 23, 42], gapBefore: 2, gapAfter: 2 });
    label("Método:", ep.method);
    label("URL:", ep.url, true);
    label("Autenticação:", ep.auth);
    text("Descrição:", { size: 9, style: "bold", color: [100, 116, 139], gapAfter: 0.5 });
    text(ep.desc, { size: 9.5, gapAfter: 2 });
    text("Requisição (payload):", { size: 9, style: "bold", color: [100, 116, 139], gapAfter: 0.5 });
    code(ep.request);
    text("Resposta:", { size: 9, style: "bold", color: [100, 116, 139], gapAfter: 0.5 });
    code(ep.response);
    text("Regras:", { size: 9, style: "bold", color: [100, 116, 139], gapAfter: 1 });
    ep.rules.forEach((r) => bullet(r, 9.5));
  });

  heading("4. Fluxo de integração");
  FLOW.forEach((step, i) => {
    text(`${i + 1}. ${step}`, { size: 9.5 });
  });

  heading("5. Observações importantes");
  NOTES.forEach((n) => bullet(n, 9.5));

  // Rodapé com numeração de páginas
  const total = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Página ${i} de ${total}`, PAGE_W - MARGIN, PAGE_H - 8, { align: "right" });
    pdf.text("Guia de Integração — Backend", MARGIN, PAGE_H - 8);
  }

  pdf.save("guia-integracao-backend.pdf");
}