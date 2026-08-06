import React from "react";
import { Tag } from "lucide-react";
import { MODELO_PETICAO_OPTIONS } from "@/lib/interviewOptions";

export default function ModeloPeticaoSection({ data, onChange }) {
  return (
    <section className="rounded-2xl border-2 border-blue-700 bg-blue-50/60 p-5 shadow-sm sm:p-7">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
          <Tag className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">Modelo de petição</h2>
          <p className="text-sm text-slate-600">Define qual modelo será usado na geração do documento. Este valor é enviado como identificador no webhook.</p>
        </div>
      </div>
      <label className="block max-w-md space-y-2">
        <span className="text-sm font-semibold text-slate-700">Selecione o modelo aplicável ao caso<span className="text-blue-700"> *</span></span>
        <select
          name="modelo_peticao"
          value={data.modelo_peticao ?? ""}
          onChange={onChange}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
        >
          <option value="" disabled>Selecione...</option>
          {MODELO_PETICAO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
    </section>
  );
}
