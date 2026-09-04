import React from "react";
import CnpjSugestao from "@/components/form/CnpjSugestao";

// Painel lateral: só aparece quando há razão social digitada. Exibe os
// dados de CNPJ encontrados para cada reclamada, sem preencher automaticamente.
export default function CnpjPainel({ data }) {
  const reclamadas = [
    { prefixo: "RECL1", nome: data.RECL1_NOME, logradouro: data.RECL1_LOGRADOURO, cep: data.RECL1_CEP, compl: data.RECL1_ENDCOMPL },
    { prefixo: "RECL2", nome: data.RECL2_NOME, logradouro: data.RECL2_LOGRADOURO, cep: data.RECL2_CEP, compl: data.RECL2_ENDCOMPL },
    { prefixo: "RECL3", nome: data.RECL3_NOME, logradouro: data.RECL3_LOGRADOURO, cep: data.RECL3_CEP, compl: data.RECL3_ENDCOMPL },
    { prefixo: "RECL4", nome: data.RECL4_NOME, logradouro: data.RECL4_LOGRADOURO, cep: data.RECL4_CEP, compl: data.RECL4_ENDCOMPL },
  ].filter(r => (r.nome || "").trim().length >= 4);

  if (reclamadas.length === 0) return null;

  return (
    <aside className="space-y-3">
      {reclamadas.map(r => (
        <CnpjSugestao key={r.prefixo} prefixo={r.prefixo} nome={r.nome} logradouro={r.logradouro} cep={r.cep} compl={r.compl} />
      ))}
    </aside>
  );
}