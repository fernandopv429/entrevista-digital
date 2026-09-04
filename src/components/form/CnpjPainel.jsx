import React from "react";
import { Search } from "lucide-react";
import CnpjSugestao from "@/components/form/CnpjSugestao";

// Painel lateral fixo: mostra os dados de CNPJ encontrados para cada
// reclamada enquanto o consultor preenche o formulário. Não preenche nada
// automaticamente — o consultor confere e digita manualmente.
export default function CnpjPainel({ data }) {
  const reclamadas = [
    { prefixo: "RECL1", nome: data.RECL1_NOME, logradouro: data.RECL1_LOGRADOURO, cep: data.RECL1_CEP, compl: data.RECL1_ENDCOMPL },
    { prefixo: "RECL2", nome: data.RECL2_NOME, logradouro: data.RECL2_LOGRADOURO, cep: data.RECL2_CEP, compl: data.RECL2_ENDCOMPL },
    { prefixo: "RECL3", nome: data.RECL3_NOME, logradouro: data.RECL3_LOGRADOURO, cep: data.RECL3_CEP, compl: data.RECL3_ENDCOMPL },
    { prefixo: "RECL4", nome: data.RECL4_NOME, logradouro: data.RECL4_LOGRADOURO, cep: data.RECL4_CEP, compl: data.RECL4_ENDCOMPL },
  ].filter(r => (r.nome || "").trim().length >= 4);

  return (
    <aside className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Search className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Localizador de CNPJ</h3>
      </div>
      {reclamadas.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm leading-relaxed text-slate-500">
          Digite a razão social da reclamada para localizar o CNPJ automaticamente. Os dados aparecem aqui para confirmação.
        </p>
      ) : (
        reclamadas.map(r => (
          <CnpjSugestao key={r.prefixo} prefixo={r.prefixo} nome={r.nome} logradouro={r.logradouro} cep={r.cep} compl={r.compl} />
        ))
      )}
    </aside>
  );
}