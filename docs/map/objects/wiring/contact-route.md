---
type: object
cluster: wiring
universe: live
status: verified
verified: 2026-10-06 @ working tree (harden pass)
entity: src/app/api/contact/route.ts
---

# Contact route

The "Connect" page form (`ContactForm`) posts to `POST /api/contact`, which validates the message and relays it to EmailJS's REST API.

## Why this shape

The relay runs server-side so validation and rate-limiting can't be bypassed from the browser. EmailJS avoids running a mail server.

## Shape

- Client: `src/components/contact/ContactForm.tsx:39` (react-hook-form; whitespace-only fields fail; length limits mirror the server). It shows the server's `error` text, and for anything but a 400 it adds a LinkedIn link from `social.json`. Input is kept on failure. Type `ContactFormData` at `src/types/index.ts:154-159`.
- Honeypot: a hidden `company` field. If it's filled, the route returns success and sends nothing (`route.ts:65`).
- Rate limit: 5 per IP per hour, **in memory** (`src/app/api/contact/route.ts:12`). It resets on each cold start and isn't shared across instances. Expired entries are pruned past 1,000 keys.
- Validation: malformed or non-object JSON → 400. Then required fields, email regex and length caps (`LIMITS`, `route.ts:10`). Single-line fields have their whitespace collapsed.
- Env: `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` (`route.ts:92`). Read server-side despite the `NEXT_PUBLIC_` prefix, but still inlined at build time, so a change needs a redeploy.
- Missing env → **503** "offline" (`route.ts:99`), logged server-side. EmailJS error → 502. A 10s timeout → 504.

## Connected to

- **joins:** the EmailJS template, which must accept `name`, `email`, `subject`, `message` (`route.ts:110`)

## If you change this

- **Hits:** a new form field needs `ContactForm.tsx` + `route.ts` (sanitize/validate/`template_params`) + the EmailJS template (outside this repo). Env changes must be made in the Vercel project for `tilltech-vercel`, not here.
- **Does not hit:** `social.json`. The social links on `/contact` are separate ([nav-and-social](../content/nav-and-social.md)).

## Surfaces

| Surface | Role |
| --- | --- |
| `/contact` | writes |
| EmailJS (external) | receives |

## See

- Source: `src/app/api/contact/route.ts`
