# HSE Portfolio (Next.js 16 + Prisma 7 + Neon)

Bilingual (Arabic RTL / English) portfolio for an HSE officer, with an admin dashboard that edits everything shown on the site.

## Run it

```bash
npm install
cp .env.example .env        # fill DATABASE_URL, DIRECT_URL (Neon), AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run db:push             # create the tables in Neon
npm run db:seed             # creates the admin + loads the CV content
npm run dev                 # http://localhost:3000  ->  /ar  and /en
```

Dashboard: `/ar/dashboard` or `/en/dashboard` (sign in with ADMIN_EMAIL / ADMIN_PASSWORD).
Deploy: push to Vercel, add the same env vars, build command is already `prisma generate && next build`.

## Folder map (read in this order)

```
prisma/
  schema.prisma            data model (Profile, Experience, Certification, Education, SkillGroup, Message, User)
  seed.ts                  admin + content from the CV
src/
  proxy.ts                 Next 16 "middleware": locale routing + optimistic dashboard redirect
  i18n/                    next-intl: routing, navigation helpers, request config
  messages/                en.json / ar.json (all UI text)
  lib/
    db.ts                  Prisma client with the Neon adapter (singleton)
    session-core.ts        JWT sign/verify (jose), edge-safe
    dal.ts                 requireAdmin(), createSession() - the REAL auth check
    action.ts              ActionState + zod parseForm() used by every Server Action
    format.ts, utils.ts
  features/                one folder per domain: schema.ts (zod) + actions.ts ("use server")
    portfolio/queries.ts   cached public reads (unstable_cache + tag), localised here
  app/
    [locale]/              layout (lang/dir), not-found, error
      (site)/              public pages: /, /journey, /credentials, /practice, /contact
      dashboard/
        (auth)/login
        (panel)/           protected layout + profile, experience, credentials, skills, messages
    sitemap.ts, robots.ts
  components/
    ui/ site/ dashboard/
```

## Techniques used (good things to review)

- App Router, route groups `(site)` `(auth)` `(panel)`, dynamic segments `[id]`, private folders `_components`
- Server Components by default; client components only for forms/nav
- Server Actions + `useActionState` + zod validation, values echoed back on errors
- Caching with a tag, invalidated by `updateTag()` inside Server Actions (edits show instantly)
- Auth: signed httpOnly JWT cookie, checked in the DAL (`requireAdmin`) not only in `proxy.ts`
- `generateStaticParams`, `setRequestLocale`, `generateMetadata`, sitemap with hreflang, robots
- Tailwind v4 tokens in `globals.css`, logical properties (`ms-`, `ps-`, `start-`) so RTL just works
- Type-safe translation keys (`src/global.d.ts`)

## Notes

- Skills/responsibilities are entered one per line; line N in English must match line N in Arabic.
- Certification years are empty because the CV does not list them. Add them in the dashboard if you want them shown.
- The contact form has a honeypot but no rate limiting yet; add one (e.g. Upstash) before heavy traffic.
