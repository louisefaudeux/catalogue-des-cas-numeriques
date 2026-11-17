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
