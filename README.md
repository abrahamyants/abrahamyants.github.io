**View (2026-10-29):** [George Abrahamyants — live portfolio](https://abrahamyants.github.io/)

# George Abrahamyants — portfolio

A short introduction to George's work, with three project stories, real product screenshots, writing, and a downloadable résumé.

Static HTML, CSS, and a small vanilla JavaScript file. GitHub Pages publishes the root of `main`. There is no build step, package install, or runtime service. Edit the files, merge to `main`, and Pages redeploys.

## Presentation

- The home-page project picker uses large segmented buttons with an explicit preview label. Screens and named “Open project” buttons lead to the project pages. On phones, the work appears above the longer introduction.
- Each project opens with its name as the main title and a clear return link. A sticky guide keeps the project name visible and marks the current section. On phones it becomes a labeled dropdown; on larger screens it offers section buttons. Down arrows mean scrolling within this page; right arrows open another page. Decision buttons are all visible on phones.
- The background keeps the longer career story behind a native disclosure. The Resume PDF link opens the file directly from every page. Invisible Work, its chart, the paper, and the project copy are preserved.
- JavaScript adds the tabs and image viewer. With JavaScript disabled, every project preview and design decision remains readable.
- Tab controls support arrow keys, Home, and End. Image viewers close with Escape. Motion respects the reader's reduced-motion setting.
- Fonts are served locally. Their licenses are in `fonts/`. Images are the original product captures, presented with CSS; the site uses no generated product images.

## Files

`index.html` is the home page. `bakers-agent.html`, `noisefile.html`, and `wim.html` hold the project stories. `invisible-work.html` holds the research story, chart, and paper links. `style.css` contains the shared design and responsive layouts. `site.js` controls the interactions. `docs/George_Abrahamyants_Resume.pdf` is the résumé.

## Content boundaries

Keep customer names and bakery dollar figures out of public screenshots. Preserve source-backed claims. Bakers Agent's live dashboard requires owner sign-in; its public screenshots and repository remain available. Audit Ledger is private, so its link requests a walkthrough instead of sending a visitor to a private repository.

## Local preview

Run `python3 -m http.server 8000`, then open `http://127.0.0.1:8000/`. The site also works as ordinary static files.
