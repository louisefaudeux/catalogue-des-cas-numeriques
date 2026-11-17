<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All case/taxonomy/editorial content lives in `src/data/*.ts`; components hold no content. Why: contributors' texts must be swappable without touching UI.
- Library filters are stored in URL search params on `/bibliotheque`. Why: filtered views must be shareable and back-button safe.
- Case PDFs are rendered client-side from the same `OnePager` component as the preview (html2canvas-pro + jsPDF). Why: preview and PDF must match.
- Fonts are self-hosted: Plus Jakarta Sans via `@fontsource-variable/plus-jakarta-sans` (body + headings), Horizon via `@font-face` from `public/fonts/horizon.otf` (deliverable title only). Why: no third-party calls (no trackers); tokens `--font-display`/`--font-heading`/`--font-body` live in `src/styles.css`.
- Brand logos live in `public/brand/` and are used through `src/components/site/Logo.tsx` (color/white/mono variants; mono for the PDF header). Why: single swap point when the charter is finalized.
- `/comment-lire` is a redirect route to `/` (page and lexicon removed in lot 1). Why: preserve the old URL without keeping the page.
- Lessons and the « Ouverture » live on the landing (`#enseignements`, `#l-3-x`, `#ouverture`); `/enseignements` is a redirect route to those anchors (lot 1d). Why: the list read as an accordion but sent users to another page.
- Editorial texts mirror the Word « Edito – Bibliothèque Cas Digit Catalogues » word for word; edit the Word first, then `src/data/editorial.ts` / `lessons.ts`. Light markup `**bold**` / `*italic*` in those strings is rendered by `src/components/site/RichText.tsx`. Why: the Word is the reference validated by the working group.
- Lessons are grouped by `LESSON_STEPS` (Donnée, Création & expérience, Activation, Mesure & optimisation) through their `family` field; display numbers are computed (1 to 7). Why: the order is set by the working group (récurrence last).
- Page background `#efefe7`, accent gradient `--accent-gradient` (violet → mauve) and the `accent-bar` / `text-gradient` utilities are in `src/styles.css`. Why: harmonised with the other Alliance Digitale publications (Panorama In-Store).
- Header navigation: two reading links (Bibliothèque, Enseignements) plus « Proposer un cas » as a filled button (lot 1e). Why: the contribution call is an action, not a reading section.
- Library filters come from `LIBRARY_FILTERS` (facets with `filterable: true`); catalogue format and data sources are tags only, not filters (17/11). Why: the working group judged them not useful as entry points; they still show on case pages and weigh in similar cases.
- Case card classification tags use `FacetTag` (`src/components/site/ui-bits.tsx`): one icon and style per facet (Store = type de PDV, MapPin = échelle, Repeat = fréquence), reused in front of the matching filter legends. Why: the three tags are different filters and must be told apart without relying on colour.
- Library grid is 2 columns with titles clamped to 4 lines. Why: at 3 columns (218 px cards) every title was cut.
- Real cases come from the working group's Excel workbook, converted by hand into `src/data/cases.ts`; never commit the workbook (it holds an internal tab with unvalidated names). Only cases the contributor left unnamed are anonymised (today: Azerion): they store `brand: "Enseigne anonymisée"` and neutral slugs, and their real names must not appear anywhere in the repo. Named cases use the brand as slug. Why: the working group names every brand the contributor named (17/11).
- Contributors' wording is kept as written (typos and abbreviations fixed only); the case title (`challenge`) may be reworded. Why: requested by the working group for the Nanotera case and the « trafic en dépôts » wording (17/11).
- Creative boards supplied as one image use `ratio: "auto"` (full width, natural proportions, link to full size). Why: they gather several formats and must not be cropped.
- `src/lib/filters.test.ts` checks case data integrity (valid tag ids, unique slugs, no real names on anonymised cases, key figure = first result). Why: hand-converted data must fail loudly rather than break filters silently.
- Case page: back link to the library at the top, then the title; the main column opens with `CaseSynthesis` (`src/components/site/CaseHeader.tsx`, anchor `#synthese`, first entry of the table of contents): brand and case contributor side by side, other partners and period, then all tags. It is laid out as a spec sheet (gradient rule, hairlines, no card) with white chips. The right column (table of contents, PDF button) starts level with it. Why: working group feedback of 17/11 (actors told apart, tags visible first, white boxes judged heavy).
- No key figure on the case page nor in the PDF; `keyFigure` is only shown on library tiles (its note is shown under the results). Why: a single highlighted figure read as ambiguous at the top of a case (17/11).
- Logos only for the brand and the case contributor (other partners stay as text: name and role), declared in `src/data/logos.ts` (key = name as typed in `cases.ts`; files in `public/logos/`, transparent background). On the case synthesis they sit directly on the page background, no white box (48 px high, up to 160 px wide); also in the PDF and, for the brand, on library tiles. Without an entry the name is shown in text. Why: working group choice of 17/11 (seamless look; partner logos only if requested later).
- `/cas/$slug/fiche` (one-page preview and print) is no longer linked from the case page but kept as a route. Why: preview and print buttons were judged useless; the PDF download covers both.
- Levers: one `levers` entry per LEVIER column of the workbook, in the same order, never merged even when columns repeat the same data, KPI and text; `title` is the LEVIER cell (when that cell is a long description, a short title in its own words and the full text in `format`); empty cells stay empty (no « Fonctionnement » heading without content). Lever environment badges map the channel to the taxonomy: Meta → Social Ads; Display, YouTube, Demand Gen → Display / Programmatique; CTV → CTV; Google Performance Max → Search; agrégateurs → Agrégateur catalogue; webpush → Autre. Why: three Mobsuccess levers had been merged into one (17/11); `filters.test.ts` now checks lever counts and that lever badges are tagged on the case.
