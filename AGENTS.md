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
