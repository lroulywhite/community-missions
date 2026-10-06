// Optional award service (Cloudflare Worker). The static site can't hold secrets, so this is
// where Gainsight credentials live. It receives events from the board and awards points.
//
// STATUS: starting point, not production-ready. Verify the token URL, endpoint paths and
// payloads against Gainsight Customer Communities API docs before use (they are marked TODO).
//
// Env (wrangler secrets / vars):
//   SERVICE_TOKEN        shared bearer token your admin console sends
//   GS_API_BASE          e.g. your region's Customer Communities API base URL   (TODO verify)
//   GS_CLIENT_ID / GS_CLIENT_SECRET   OAuth2 client credentials
//   GS_TOKEN_URL         token endpoint                                          (TODO verify)
//   AWARDS (KV)          idempotency store so retries never double-award
//   ALLOW_ORIGIN         the origin that hosts the board (CORS)

const cors = (env) => ({
  "access-control-allow-origin": env.ALLOW_ORIGIN || "*",
  "access-control-allow-headers": "content-type, authorization",
  "access-control-allow-methods": "POST, OPTIONS",
});

async function gsToken(env) {
  const r = await fetch(env.GS_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.GS_CLIENT_ID,
      client_secret: env.GS_CLIENT_SECRET,
    }),
  });
  if (!r.ok) throw new Error("Gainsight token request failed: " + r.status);
  return (await r.json()).access_token;
}

async function assignPoints(env, userId, points) {
  const token = await gsToken(env);
  // TODO verify path + body against the "assignPoints" operation in the gamification API docs.
  const r = await fetch(`${env.GS_API_BASE}/gamification/points`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ userId, points }),
  });
  if (!r.ok) throw new Error("assignPoints failed: " + r.status + " " + (await r.text()));
}

async function awardBadge(env, userId, badgeId) {
  const token = await gsToken(env);
  // TODO verify path + body against the manual badge award endpoint.
  const r = await fetch(`${env.GS_API_BASE}/gamification/badges/${badgeId}/award`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ userIds: [userId] }),
  });
  if (!r.ok) throw new Error("awardBadge failed: " + r.status);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors(env) });
    if (req.method !== "POST" || url.pathname !== "/events") return new Response("Not found", { status: 404 });
    if (req.headers.get("authorization") !== `Bearer ${env.SERVICE_TOKEN}`)
      return new Response("Unauthorized", { status: 401, headers: cors(env) });

    const evt = await req.json();
    if (evt.type !== "award.granted") return new Response("Ignored", { status: 202, headers: cors(env) });

    // Idempotency: one award per ledger entry id, even if the board retries.
    const key = "award:" + evt.idempotencyKey;
    if (await env.AWARDS.get(key)) return new Response("Already awarded", { status: 200, headers: cors(env) });

    // TODO: map your member id to the Gainsight user id (SSO id or email lookup).
    const userId = evt.member.id;
    await assignPoints(env, userId, evt.entry.points);
    if (evt.mission && evt.mission.badgeId) await awardBadge(env, userId, evt.mission.badgeId);

    await env.AWARDS.put(key, new Date().toISOString());
    return new Response("OK", { status: 200, headers: cors(env) });
  },
};
