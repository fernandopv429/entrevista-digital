export const ESCALA_OPTIONS = ["12x36", "5x2 (8h diárias)", "6x1 (8h diárias)", "4x2 (12h)", "Plantão 24h", "Outra"];
export const TIPO_DISPENSA_OPTIONS = [
  { value: "sem_justa_causa", label: "Sem justa causa" },
  { value: "rescisao_indireta", label: "Rescisão indireta" },
  { value: "nulidade_pedido_demissao", label: "Pedido de demissão (nulidade/coação)" },
  { value: "reversao_justa_causa", label: "Justa causa (a reverter)" },
];
export const GRAU_INSALUBRIDADE_OPTIONS = ["mínimo", "médio", "máximo"];
export const HORAS_EXTRAS_OPTIONS = ["Não realizava", "Até 1 hora", "1 a 2 horas", "2 a 3 horas", "Mais de 3 horas"];
export const MINUTOS_OPTIONS = ["0 minutos", "15 minutos", "30 minutos", "45 minutos", "1 hora"];
export const FERIAS_OPTIONS = ["Não possuiu", "Proporcional", "1 período integral", "2 períodos integrais", "3 ou mais períodos"];
export const FOLGAS_OPTIONS = ["0", "1 a 2", "3 a 4", "5 a 6", "Mais de 6"];
// Quando a resposta e "trabalhou folgas = Sim", "0" e contraditorio e fica fora.
export const FOLGAS_OPTIONS_ATIVO = FOLGAS_OPTIONS.filter((o) => o !== "0");
// O gerador liga a tese de integracao do pagamento "por fora" quando a forma de
// recebimento casa /pix|dinheiro/i (mapearWebhook.js). Texto livre aqui fazia a
// tese depender da grafia do entrevistador.
export const FT_PAGAMENTO_OPTIONS = ["Pix", "Dinheiro", "Em folha de pagamento", "Outra"];
export const TESTEMUNHA_OPTIONS = ["Sim", "Não", "Irá verificar"];