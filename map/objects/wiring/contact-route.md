---
type: object
cluster: wiring
universe: live
status: verified
verified: 2026-10-06 @ 0ab6594
entity: src/app/api/contact/route.ts
---

# Contact route

The "Connect" page form (`ContactForm`) posts to `POST /api/contact`, which validates the message and relays it to EmailJS's REST API.

## Why this shape

The relay runs server-side so validation and rate-limiting can't be bypassed from the browser. EmailJS avoids running a mail server.

## Shape

- Client: `src/components/contact/ContactForm.tsx:24` (react-hook-form; length limits mirror the server at `:50,82,94`). Type `ContactFormData` at `src/types/index.ts:154-159`.
- Rate limit: 5 per IP per hour, **in memory** (`src/app/api/contact/route.ts:4-19`). It resets on each cold start and isn't shared across instances.
- Validation: required fields, email regex, length caps (`route.ts:44-66`)
- Env: `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` (`route.ts:69-71`). Read server-side despite the `NEXT_PUBLIC_` prefix.
- **If any env var is missing, it returns `{ success: true }` and sends nothing** (`route.ts:73-75`). The visitor sees "sent" and the message is lost.

## Connected to

- **joins:** the EmailJS template, which must accept `name`, `email`, `subject`, `message` (`route.ts:84`)

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
