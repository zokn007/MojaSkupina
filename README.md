# BandHub – aplikacija za glasbeno skupino

React + TypeScript + Vite. Vključeni so repertoar, akordi, transpozicija, setliste, nastopni način, koledar, člani, finance, inventar, evidenca dokumentov, varnostne kopije in temni način. Aplikacija je PWA: po prvem uspešnem obisku je osnovni vmesnik lahko na voljo tudi brez povezave (odvisno od predpomnilnika brskalnika).

## Zagon

```bash
npm install
npm run dev
```

## Objava na GitHub Pages

1. V nov repozitorij naloži **vsebino** te mape (ne nadrejene mape).
2. Pod Settings → Pages izberi **GitHub Actions**.
3. Potisni na vejo `main`; workflow `.github/workflows/deploy.yml` zgradi `dist` in ga objavi.

Vite uporablja relativno osnovno pot `./`, zato aplikacija deluje tudi na `username.github.io/ime-repozitorija/`.

## Trenutno stanje in omejitve

- Podatki se hranijo **samo lokalno v brskalniku** (localStorage). Uporabi Nastavitve → Izvozi JSON za varnostne kopije.
- PWA omogoča predpomnjenje vmesnika, **ne pa** samodejne sinhronizacije med napravami.
- **Ni še** prijave uporabnikov, skupne podatkovne baze, realtime sinhronizacije tablic, dejanskega nalaganja datotek ali potrjevanja udeležbe.
- Za večuporabniško delovanje je potreben strežniški sistem (npr. Supabase) in ustrezna avtorizacija; GitHub Pages je samo statično gostovanje.
- Demo pesmi so izmišljene.

## Preverjanje

`npm run build` mora ustvariti mapo `dist`. Pri namestitvi odvisnosti je potreben dostop do registra npm.

## Supabase cloud setup
1. Create a Supabase project and execute `supabase.sql` in SQL Editor.
2. In Supabase Authentication, enable email login. For local development copy `.env.example` to `.env` and fill the project URL and public anon key (never use the service-role key).
3. For GitHub Pages, add repository **Settings > Secrets and variables > Actions > Variables** named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Push to `main`; the workflow builds and deploys the static site.
5. Sign up / confirm your email and log in. Cloud storage and live song navigation are scoped to the signed-in account. For multiple musicians, they must use the **same account** in this version; separate member accounts and roles are not yet implemented. This is not recommended for production use; use individual accounts and a membership schema before sharing sensitive data.

The app still works locally without Supabase variables. The live performance broadcast requires internet; the offline cache is best-effort only.
