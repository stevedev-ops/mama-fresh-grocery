# Mama Fresh Groceries Website

This folder contains the standalone website version of the Mama Fresh Groceries MVP.

## Files

- `index.html` - homepage and checkout modals
- `css/app.css` - styling and responsive layout
- `js/app.js` - package flow, custom cart flow, validation, and WhatsApp redirects

## Run Locally

From the project root:

```bash
cd website
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy

This is a static website, so it can be deployed to:

- Netlify
- Vercel static hosting
- GitHub Pages
- Any shared hosting that serves HTML, CSS, and JavaScript

## Important

The WhatsApp business number is configured in `js/app.js`. Keep it in international format with country code and no plus sign.
