**View (2026-10-29):** [George Abrahamyants — live portfolio](https://abrahamyants.github.io/)

# George Abrahamyants — portfolio

A short introduction to George's work, with three project stories, real product screenshots, writing, and a downloadable résumé.

Static HTML, CSS, and a small vanilla JavaScript file. GitHub Pages publishes the root of `main`. There is no build step, package install, or runtime service. Edit the files, merge to `main`, and Pages redeploys.

## Presentation

- The home-page project tabs preview AI operations, legal software, and speech access. On phones, the work appears above the longer introduction.
- Each project has a quick overview, a workflow, screenshots that open at larger size, selectable design decisions, results, and proof links.
- The background keeps the longer career story behind a native disclosure. The résumé is available from every page.
- JavaScript adds the tabs and image viewer. With JavaScript disabled, every project preview and design decision remains readable.
- Tab controls support arrow keys, Home, and End. Image viewers close with Escape. Motion respects the reader's reduced-motion setting.
- Fonts are served locally. Their licenses are in `fonts/`. Images are the original product captures, presented with CSS; the site uses no generated product images.

## Files

`index.html` is the home page. `bakers-agent.html`, `noisefile.html`, and `wim.html` hold the project stories. `style.css` contains the shared design and responsive layouts. `site.js` controls the interactions. `docs/George_Abrahamyants_Resume.pdf` is the résumé.

## Content boundaries

Keep customer names and bakery dollar figures out of public screenshots. Preserve source-backed claims. Bakers Agent's live dashboard requires owner sign-in; its public screenshots and repository remain available. Audit Ledger is private, so its link requests a walkthrough instead of sending a visitor to a private repository.

## Local preview

Run `python3 -m http.server 8000`, then open `http://127.0.0.1:8000/`. The site also works as ordinary static files.
