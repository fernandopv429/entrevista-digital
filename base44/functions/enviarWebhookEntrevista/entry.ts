import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const webhookUrls = [secrets.get("WEBHOOK_URL"), secrets.get("WEBHOOK_URL_2")].filter(Boolean);
    if (webhookUrls.length === 0) return Response.json({ error: 'Nenhum webhook URL configurado' }, { status: 500 });

    const entrevista = await req.json();
    const webhookSecret = secrets.get("WEBHOOK_SECRET");

    const headers = { "Content-Type": "application/json" };
    if (webhookSecret) headers["X-Webhook-Secret"] = webhookSecret;

    const brasiliaTimestamp = new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo", hour12: false }).replace(" ", "T") + "-03:00";

    const payload = JSON.stringify({
      event: "entrevista.salva",
      id: entrevista.id,
      created_by: user.email,
      timestamp: brasiliaTimestamp,
      data: entrevista
    });

    const results = await Promise.all(webhookUrls.map(async (url) => {
      try {
        const res = await fetch(url, { method: "POST", headers, body: payload });
        return { url, status: res.status, ok: res.ok };
      } catch (err) {
        return { url, status: 0, ok: false, error: err.message };
      }
    }));

    const anyOk = results.some(r => r.ok);
    return Response.json({ success: anyOk, webhooks: results }, { status: anyOk ? 200 : 502 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}