/**
 * Portfolio contact form -> Resend.
 *
 * Runtime: Node.js 22.x (arm64). Zero dependencies -- uses global fetch.
 * Trigger: Lambda Function URL, auth type NONE, CORS configured on the URL itself.
 *
 * The Resend API key lives ONLY in this function's environment. The browser
 * posts plain form JSON and never sees a credential.
 *
 * Required environment variables:
 *   RESEND_API_KEY      re_...  (sending-access key, scoped to the verified domain)
 *   CONTACT_FROM_EMAIL  Portfolio Contact <noreply@mail.tommyflinch.com>
 *   CONTACT_TO_EMAIL    inbox that receives submissions
 *   ALLOWED_ORIGIN      comma-separated origins, e.g.
 *                       https://tommyflinch.com,https://www.tommyflinch.com
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 10_000;
const MIN_ELAPSED_MS = 3_000;
const UPSTREAM_TIMEOUT_MS = 8_000;

const {
  RESEND_API_KEY,
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  ALLOWED_ORIGIN = '',
} = process.env;

const allowedOrigins = ALLOWED_ORIGIN.split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Field length bounds. `number` has min 0 -- the phone field is optional.
const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 254 },
  number: { min: 0, max: 30 },
  subject: { min: 1, max: 150 },
  message: { min: 1, max: 5000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

// Submissions are interpolated into an HTML email body. Without this, anyone
// can inject markup or links into mail arriving in your inbox.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

// CORS headers are added by the Function URL's own CORS config, so the handler
// deliberately does not emit them -- duplicated headers get rejected by browsers.
const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

// Bots get a 200. Telling them they were caught just teaches the operator to fix it.
const SILENT_OK = json(200, { ok: true });

export const handler = async (event) => {
  if (event?.requestContext?.http?.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error('Missing required environment variables.');
    return json(500, { error: 'Server misconfigured.' });
  }

  // Defense in depth only. The Function URL's CORS config is what actually stops
  // other browser origins; Origin is trivially spoofed by non-browser clients.
  const origin = event?.headers?.origin ?? '';
  if (!allowedOrigins.includes(origin)) {
    console.warn('Rejected origin:', origin);
    return json(403, { error: 'Forbidden.' });
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body ?? '', 'base64').toString('utf8')
    : event.body ?? '';

  // Checked before parsing so oversized payloads never reach JSON.parse.
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    return json(413, { error: 'Payload too large.' });
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid request.' });
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json(400, { error: 'Invalid request.' });
  }

  // Honeypot: a field hidden from humans, irresistible to form-filling bots.
  if (typeof payload.company === 'string' && payload.company.trim() !== '') {
    console.log('Honeypot triggered.');
    return SILENT_OK;
  }

  // A real client always sends elapsedMs. Its absence means a broken caller, not
  // a bot -- returning a silent 200 there would show the visitor "message sent"
  // while discarding a genuine submission.
  // Strict type check: Number(null) is 0, which would sail through as a
  // "too fast" bot and be silently dropped rather than reported.
  const elapsed = typeof payload.elapsedMs === 'number' ? payload.elapsedMs : NaN;
  if (!Number.isFinite(elapsed)) {
    console.warn('Missing or non-numeric elapsedMs:', payload.elapsedMs);
    return json(400, { error: 'Invalid submission.' });
  }

  // Humans do not complete this form in under three seconds.
  if (elapsed < MIN_ELAPSED_MS) {
    console.log('Timing check failed:', elapsed);
    return SILENT_OK;
  }

  const fields = {};
  for (const [key, { min, max }] of Object.entries(LIMITS)) {
    const value = typeof payload[key] === 'string' ? payload[key].trim() : '';
    if (value.length < min || value.length > max) {
      return json(400, { error: 'Invalid submission.' });
    }
    fields[key] = value;
  }
  if (!EMAIL_RE.test(fields.email)) {
    return json(400, { error: 'Invalid submission.' });
  }

  const safe = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)])
  );
  const subject = fields.subject.replace(/[\r\n]+/g, ' ');

  const html = `
    <h2>New portfolio contact</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Phone:</strong> ${safe.number || '(not provided)'}</p>
    <p><strong>Subject:</strong> ${safe.subject}</p>
    <hr />
    <p>${safe.message.replace(/\n/g, '<br />')}</p>
  `;

  const text = [
    'New portfolio contact',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.number || '(not provided)'}`,
    `Subject: ${fields.subject}`,
    '',
    fields.message,
  ].join('\n');

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        subject: `[Portfolio] ${subject}`,
        html,
        text,
        // Mail must send from the verified domain, but Reply goes to the visitor.
        reply_to: fields.email,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      // Upstream detail stays in CloudWatch; the browser gets a generic message.
      console.error('Resend rejected:', response.status, await response.text().catch(() => ''));
      return json(502, { error: 'Unable to send message right now.' });
    }

    const { id } = await response.json().catch(() => ({}));
    console.log('Sent:', id);
    return json(200, { ok: true });
  } catch (error) {
    console.error('Send failed:', error);
    return json(502, { error: 'Unable to send message right now.' });
  }
};
