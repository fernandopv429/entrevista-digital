// Estado inicial do formulário. Começa VAZIO de propósito.
//
// Antes daqui saíam os dados reais de um cliente (nome, CPF, RG, PIS, CTPS,
// filiação, endereço, telefones) e de duas empresas. Como o formulário é
// público e este arquivo vai para o navegador, esses dados ficavam expostos;
// pior, quem não apagasse os campos herdados mandava a 2ª reclamada daquele
// caso para a peça de outro cliente — e o gerador tira o local de prestação
// (e daí a comarca) justamente do endereço da 2ª reclamada.
//
// Campos de texto ficam como string vazia porque os inputs são controlados.
// Os booleanos ficam SEM valor: "não respondido" não é a mesma coisa que
// "Não", e um "Não" presumido derruba a tese silenciosamente.

export const interviewDefaults = {
  modelo_peticao: "",
  titulo: "",

  RECL_NOME: "",
  RECL_NACIONALIDADE: "brasileiro",
  RECL_ESTADOCIVIL: "",
  RECL_RG: "",
  RECL_CPF: "",
  RECL_PIS: "",
  RECL_CTPS: "",
  RECL_SERIE: "",
  RECL_NASC: "",
  RECL_FILIACAO: "",
  RECL_ENDERECO: "",
  RECL_CEP: "",
  email: "",
  telefone: "",

  RECL1_NOME: "", RECL1_CNPJ: "", RECL1_LOGRADOURO: "", RECL1_ENDCOMPL: "",
  RECL2_NOME: "", RECL2_CNPJ: "", RECL2_LOGRADOURO: "", RECL2_ENDCOMPL: "",
  RECL3_NOME: "", RECL3_CNPJ: "", RECL3_LOGRADOURO: "", RECL3_ENDCOMPL: "",

  FUNCAO: "",
  escala: "",
  JORNADA_HORARIO: "",

  DATA_ADMISSAO: "",
  DATA_RESCISAO: "",
  SALARIO: "",

  tipo_dispensa: "",

  vale_refeicao: undefined, vale_alimentacao: undefined, vale_transporte: undefined,
  VALOR_AUX_ALIMENTACAO: "", VAL_CONDUCAO: "",

  finais_semana: undefined, tem_adic_noturno: undefined,

  ferias: undefined, ferias_quantidade: "",

  folgas_trabalhadas: undefined, FT_QTD_MEDIA: "", VAL_FT: "", ft_pagamento: "", ft_comprovante: undefined,

  intervalo_suprimido: undefined, INTERVALO_GOZADO: "",

  horas_extras: undefined, media_horas_extras: "", periodo_antecedente: "", periodo_sucedente: "",

  acumulo_funcao: undefined, funcoes_acumuladas: "",

  armamento_colete: undefined,

  gratificacao: undefined, gratificacao_qual: "",

  assiduidade: undefined, assiduidade_prometido: "", assiduidade_pago: "",

  holerites: undefined, rescisao_contratual: undefined, espelho_ponto: undefined,

  desconto_indevido: undefined, desconto_qual: "",

  tem_doenca: undefined, tem_insalubridade: undefined, tem_periculosidade: undefined, produtos: "", epi: "",

  testemunha: "",

  fatos_narrados: "",
};

// Exemplo FICTÍCIO para testar o fluxo ponta a ponta sem usar dados de cliente.
// Carregado só pelo botão "Carregar exemplo" — nunca é o estado inicial.
// Os CNPJs abaixo são inválidos de propósito (não passam no dígito verificador).
export const interviewExample = {
  ...interviewDefaults,
  modelo_peticao: "",
  titulo: "EXEMPLO — não protocolar",

  RECL_NOME: "JOÃO EXEMPLO DA SILVA",
  RECL_NACIONALIDADE: "brasileiro",
  RECL_ESTADOCIVIL: "solteiro",
  RECL_RG: "00.000.000-0",
  RECL_CPF: "000.000.000-00",
  RECL_PIS: "000.00000.00-0",
  RECL_CTPS: "000000",
  RECL_SERIE: "0000",
  RECL_NASC: "1990-01-01",
  RECL_FILIACAO: "Pai Exemplo e Mãe Exemplo",
  RECL_ENDERECO: "Rua Exemplo, nº 100, Centro, São Paulo/SP",
  RECL_CEP: "01000-000",
  email: "exemplo@exemplo.com",
  telefone: "(11) 90000-0000",

  RECL1_NOME: "EMPRESA EXEMPLO SEGURANÇA LTDA",
  RECL1_CNPJ: "00.000.000/0001-00",
  RECL1_LOGRADOURO: "Av. Exemplo, 1000, Centro",
  RECL1_ENDCOMPL: "São Paulo/SP, CEP 01000-000",

  FUNCAO: "Vigilante",
  escala: "12x36",
  JORNADA_HORARIO: "das 19h às 07h",

  DATA_ADMISSAO: "2023-01-02",
  DATA_RESCISAO: "2025-06-30",
  SALARIO: "R$ 2.148,22",

  tipo_dispensa: "sem_justa_causa",

  vale_refeicao: true, vale_alimentacao: true, vale_transporte: true,
  VALOR_AUX_ALIMENTACAO: "R$ 23,30", VAL_CONDUCAO: "R$ 10,00",
  finais_semana: true, tem_adic_noturno: true,
  ferias: true, ferias_quantidade: "Proporcional",
  // FT_QTD_MEDIA e ft_pagamento agora sao <select>: os valores precisam bater
  // exatamente com FOLGAS_OPTIONS_ATIVO e FT_PAGAMENTO_OPTIONS.
  folgas_trabalhadas: true, FT_QTD_MEDIA: "5 a 6", VAL_FT: "R$ 180,00", ft_pagamento: "Pix", ft_comprovante: false,
  intervalo_suprimido: true, INTERVALO_GOZADO: "15 minutos",
  horas_extras: true, media_horas_extras: "Até 1 hora", periodo_antecedente: "30 minutos", periodo_sucedente: "30 minutos",
  acumulo_funcao: false, funcoes_acumuladas: "",
  armamento_colete: false,
  gratificacao: false, gratificacao_qual: "",
  assiduidade: true, assiduidade_prometido: "R$ 300,00", assiduidade_pago: "R$ 100,00",
  holerites: true, rescisao_contratual: false, espelho_ponto: false,
  desconto_indevido: false, desconto_qual: "",
  tem_doenca: false, tem_insalubridade: false, tem_periculosidade: true, produtos: "", epi: "",
  testemunha: "Irá verificar",

  fatos_narrados: "Caso fictício usado apenas para testar a geração da minuta.",
};
