# Jad Chebly — portfolio

A static portfolio site. No build step, no dependencies, no server code.

```
index.html                 home: hero, filterable project grid, about, contact
projects/*.html            one page per project
assets/css/style.css       all styling, design tokens at the top
assets/js/main.js          sticky header, scroll reveals, project filter
assets/img/*.jpg           screenshots and figures
```

## Preview it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly with `file://` also works, though the relative
links behave better over HTTP.

## Deploy

The whole folder is the site. Any static host will serve it as-is.

- **Cloudflare Pages / Netlify / Vercel** — connect the repository, leave the
  build command empty, set the output directory to the project root.
- **GitHub Pages** — push to a repository, then Settings → Pages → deploy from
  branch, root folder.

## Adding a project

1. Copy any file in `projects/` and edit the content.
2. Drop its screenshots into `assets/img/`.
3. Add a card to the grid in `index.html`. The `data-tags` attribute on the card
   controls which filters it appears under — the values are `ml`, `fullstack`,
   `cloud` and `client`.
4. Update the `.pager` links at the bottom of the neighbouring project pages so
   the previous/next chain stays unbroken.

## Design notes

- Colours, spacing and type are CSS custom properties in `:root`. Change them
  there and the whole site follows.
- The accent is `--accent` (`#34d399`). It marks one thing per screen.
- Everything respects `prefers-reduced-motion`.
- Images are JPEG at 1500px wide, lazily loaded, with explicit dimensions so the
  layout does not shift as they arrive.

## Where the screenshots came from

Every screenshot is of the real thing.

- **Atlantis Car Rental** and the **Grade & What-If Tracker** were run locally and captured. The
  tracker's screenshots show its actual database.
- **IEstagram** was stood up end to end: its schema was rebuilt from the backend's own SQL usage,
  run against local PostgreSQL, and populated with demo accounts through the app's own signup,
  post, follow, like and comment endpoints. The captures are of the real UI after a real login.
- **OpenData at Kurrant** is the real internal platform, running locally. Third-party provider
  names and account emails are redacted; nothing else is altered.
- **Student Dropout Prediction** figures are plots from the project notebook.
- **TikTok Recommender** was run end to end: the Python recommender service serving a trained
  artifact bundle, the Node gateway in front of it, and a real video from the project's own corpus
  put through the pipeline. The Supabase project that backs login is paused, so the login gate was
  short-circuited locally to reach the app; that edit was reverted and is not in the repository.
- **Lumatron** is live at lumatron.qa and was captured directly from the deployed site. The
  photographs further down the page are the client's own installation photography.
