import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const webhookUrl = secrets.get("WEBHOOK_URL");
    if (!webhookUrl) return Response.json({ error: 'Webhook URL não configurado' }, { status: 500 });

    const entrevista = await req.json();
    const webhookSecret = secrets.get("WEBHOOK_SECRET");

    const headers = { "Content-Type": "application/json" };
    if (webhookSecret) headers["X-Webhook-Secret"] = webhookSecret;

    const brasiliaTimestamp = new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo", hour12: false }).replace(" ", "T") + "-03:00";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event: "entrevista.salva",
        id: entrevista.id,
        created_by: user.email,
        timestamp: brasiliaTimestamp,
        data: entrevista
      })
    });

    if (!response.ok) {
      return Response.json({ error: 'Falha ao enviar webhook', upstream_status: response.status }, { status: 502 });
    }

    return Response.json({ success: true, webhook_status: response.status });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}