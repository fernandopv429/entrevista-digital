import React, { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Loader2, AlertTriangle, X, ChevronDown, ChevronUp } from "lucide-react";

function parseMunicipioUf(compl) {
  if (!compl) return {};
  const s = String(compl).trim();
  const porBarra = s.split("/").map(p => p.trim()).filter(Boolean);
  if (porBarra.length >= 2) {
    const uf = porBarra[porBarra.length - 1].substring(0, 2).toUpperCase();
    const municipio = porBarra.slice(0, -1).join("/").trim();
    return { municipio, uf };
  }
  const parts = s.split(/[-,]/).map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const uf = parts[parts.length - 1].substring(0, 2).toUpperCase();
    const municipio = parts.slice(0, -1).join(" ").trim();
    return { municipio, uf };
  }
  return { municipio: s, uf: "" };
}

export default function CnpjSugestao({ prefixo, nome, logradouro, cep, compl, onChange }) {
  const [aberto, setAberto] = useState(false);
  const [status, setStatus] = useState("idle");
  const [candidatos, setCandidatos] = useState([]);
  const [ambiguo, setAmbiguo] = useState(false);
  const [erro, setErro] = useState("");
  const [expandido, setExpandido] = useState(false);
  const timer = useRef(null);
  const ultimoNome = useRef("");

  const buscar = async () => {
    const razao = (nome || "").trim();
    if (razao.length < 4) {
      setStatus("falta"); setAberto(true); return;
    }
    const { municipio, uf } = parseMunicipioUf(compl);
    const cepDig = (cep || "").replace(/\D/g, "");
    if ((!municipio || !uf) && cepDig.length < 8) {
      setStatus("falta"); setAberto(true); return;
    }
    setStatus("loading"); setAberto(true); setCandidatos([]); setAmbiguo(false); setErro(""); setExpandido(false);
    try {
      const res = await base44.functions.invoke("localizarCnpj", {
        razao_social: razao,
        endereco: logradouro || "",
        municipio: municipio || "",
        uf: uf || "",
        cep: cep || ""
      });
      const data = res.data || res;
      if (data.status === "error") {
        setStatus("error"); setErro(data.mensagem || "Falha na consulta"); return;
      }
      const cands = data.candidatos || [];
      if (!cands.length) { setStatus("empty"); return; }
      setCandidatos(cands); setAmbiguo(!!data.ambiguo); setStatus("success");
    } catch (e) {
      setStatus("error"); setErro(e.message || "Erro ao consultar");
    }
  };

  useEffect(() => {
    const razao = (nome || "").trim();
    if (razao.length < 4 || razao === ultimoNome.current) return;
    const { municipio, uf } = parseMunicipioUf(compl);
    const cepDig = (cep || "").replace(/\D/g, "");
    if ((!municipio || !uf) && cepDig.length < 8) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { ultimoNome.current = razao; buscar(); }, 800);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, compl, cep]);

  const usar = (c) => {
    onChange({ target: { name: `${prefixo}_CNPJ`, value: c.cnpj_formatado } });
    if (c.cep) onChange({ target: { name: `${prefixo}_CEP`, value: c.cep } });
    if (c.logradouro) onChange({ target: { name: `${prefixo}_LOGRADOURO`, value: c.logradouro } });
    if (c.complemento) onChange({ target: { name: `${prefixo}_ENDCOMPL`, value: c.complemento } });
    setAberto(false);
  };

  return (
    <div className="relative">
      <button type="button" onClick={buscar} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline">
        <Search className="h-3.5 w-3.5" /> Localizar CNPJ
      </button>

      {aberto && (
        <div className="absolute left-0 top-7 z-50 w-[min(30rem,92vw)] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">CNPJ sugerido</span>
            <button type="button" onClick={() => setAberto(false)} className="text-slate-400 hover:text-slate-700"><X className="h-4 w-4" /></button>
          </div>

          {status === "falta" && (
            <p className="text-sm text-slate-600">Preencha a <b>cidade/UF</b> (campo Complemento) ou o <b>CEP</b> para localizar o CNPJ automaticamente.</p>
          )}
          {status === "loading" && (
            <div className="flex items-center gap-2 text-sm text-slate-600"><Loader2 className="h-4 w-4 animate-spin" /> Buscando CNPJ...</div>
          )}
          {status === "empty" && (
            <p className="text-sm text-slate-600">Nenhum CNPJ encontrado para essa empresa.</p>
          )}
          {status === "error" && (
            <p className="text-sm font-semibold text-rose-700">Falha ao consultar: {erro}</p>
          )}
          {status === "success" && (
            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {ambiguo && (
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-2 text-xs font-semibold text-amber-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> Há mais de uma empresa compatível — confira antes de usar.
                </div>
              )}
              {candidatos.map((c, i) => (
                <div key={c.cnpj} className={`rounded-xl border p-3 text-sm ${i === 0 ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900">
                        {c.cnpj_formatado}
                        {i === 0 && <span className="ml-1.5 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">1º</span>}
                      </p>
                      <p className="text-slate-700">{c.razao_social}</p>
                      <p className="text-xs text-slate-500">{c.matriz_filial} · {c.situacao}</p>
                      <p className="text-xs text-slate-500">CNAE: {c.cnae_principal?.codigo} — {c.cnae_principal?.descricao}</p>
                      {c.endereco_completo && <p className="mt-0.5 text-xs text-slate-400">{c.endereco_completo}</p>}
                      {i === 0 && c.qtd_cnae_secundario > 0 && (
                        <button type="button" onClick={() => setExpandido(v => !v)} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline">
                          {expandido ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          {c.qtd_cnae_secundario} CNAE(s) secundário(s)
                        </button>
                      )}
                      {i === 0 && expandido && c.cnaes_secundarios?.length > 0 && (
                        <ul className="mt-1 space-y-0.5 pl-3 text-xs text-slate-500">
                          {c.cnaes_secundarios.map((s, idx) => <li key={idx}>{s.codigo} — {s.descricao}</li>)}
                        </ul>
                      )}
                    </div>
                    <button type="button" onClick={() => usar(c)} className="shrink-0 rounded-lg bg-brand px-2.5 py-1.5 text-xs font-bold text-white hover:brightness-95">Usar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}