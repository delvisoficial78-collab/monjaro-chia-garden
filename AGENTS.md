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

<!-- LOVABLE:BEGIN:agent-notes -->
## Project notes

- The "/" funnel (Mounjaro de Chia quiz) is a ported vanilla-DOM engine in
  `src/lib/funnel-engine.ts`, mounted once from `src/routes/index.tsx` via
  useEffect inside `#app`. Why: the original CSS relies on `#app` for mobile
  gutters and vertical alignment; keep funnel edits in the engine's step/config
  data, not in React components.
- Original site styling lives in `public/css/*.css` (linked after the template
  stylesheet in `src/routes/__root.tsx`); funnel media is in `public/funnel/`.
- Debug harness preserved from the original: `/?debug[&step=<id|index>]`
  (auto-fills sample answers), `__funnel.steps()/go()/preencher()` on localhost.
<!-- LOVABLE:END:agent-notes -->
- Meta Pixel 1810716507012315 is injected in `src/routes/__root.tsx` (head,
  agent:'lovable'): PageView on load, one document-level click listener firing
  InitiateCheckout on `a/button[data-checkout]`. The CAPI token is the
  `META_CAPI_ACCESS_TOKEN` secret (unused until server-side events exist). No
  consent banner (builder chose no-banner; regional limits apply).
