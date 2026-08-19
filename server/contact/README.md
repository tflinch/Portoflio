# Contact form Lambda

Single-file, zero-dependency handler that proxies the portfolio contact form to Resend.
The Resend API key lives only in this function's environment — never in the browser bundle.

## Function config

| Setting             | Value                     |
|---------------------|---------------------------|
| Name                | `portfolio-contact-form`  |
| Runtime             | Node.js 22.x              |
| Architecture        | arm64                     |
| Handler             | `index.handler`           |
| Timeout             | 10 sec                    |
| Memory              | 256 MB                    |
| Reserved concurrency| 5                         |
| URL auth type       | NONE                      |

## Environment variables

    RESEND_API_KEY      re_...
    CONTACT_FROM_EMAIL  Portfolio Contact <noreply@mail.tommyflinch.com>
    CONTACT_TO_EMAIL    your inbox
    ALLOWED_ORIGIN      https://tommyflinch.com,https://www.tommyflinch.com

`CONTACT_FROM_EMAIL` must be on the Resend-verified domain (`mail.tommyflinch.com`).
Using the apex or the `send.` return-path subdomain returns a 403 that looks like a bad key.

## Deploy

Console: Lambda -> portfolio-contact-form -> Code tab -> paste `index.mjs` -> Deploy.

CLI:

    cd server/contact && zip -j function.zip index.mjs
    aws lambda update-function-code \
      --function-name portfolio-contact-form \
      --zip-file fileb://function.zip

## Request contract

    POST <function-url>
    content-type: application/json
    origin: https://tommyflinch.com

    { "name", "email", "number", "subject", "message", "company", "elapsedMs" }

`company` is the honeypot (must be empty). `elapsedMs` is time since form mount
(must be >= 3000). Both failures return 200 with no email sent, on purpose.

Responses: 200 `{ok:true}` | 400 invalid | 403 origin | 405 method | 413 too large
| 500 misconfigured | 502 upstream failure. Upstream detail goes to CloudWatch only.

## Protections

- Origin allowlist (defense in depth; CORS on the Function URL is the real browser control)
- 10 KB body cap, checked before JSON.parse
- Per-field length bounds, email format check
- HTML escaping of every field before interpolation into the email body
- Honeypot + submission timing
- Reserved concurrency 5 as an abuse ceiling

No per-IP rate limiting — Function URLs have none. Add API Gateway HTTP API in front
if that becomes necessary.
