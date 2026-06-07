# Nourhene Ben Othmen Portfolio

Professional multilingual portfolio for Nourhene Ben Othmen, an AI & Data Science engineering student and Full Stack JavaScript developer. The site supports French, English, and Arabic with RTL layout, dark/light mode, animated intro, project cards, education, and leadership activities.

## Technologies Used

- React.js with Vite
- Tailwind CSS through `@tailwindcss/vite`
- Framer Motion
- React Icons
- GitHub Pages deployment with `gh-pages`

## Required Assets

Place or replace assets at these paths:

- `public/cv/Nourhene-Ben-Othmen-CV.pdf`
- `public/images/profile/nourhene-profile.jpg`
- `public/images/hero/hero-bg-ai.jpg`
- `public/images/projects/qraity-cover.jpg`
- `public/images/projects/darstore-cover.jpg`
- `public/images/projects/elearning-cover.jpg`
- `public/images/projects/tomato-cover.jpg`

The previously removed project is not included.

## Run Locally

```bash
npm create vite@latest nourhene-portfolio -- --template react
cd nourhene-portfolio
npm install
npm install tailwindcss @tailwindcss/vite framer-motion react-icons @emailjs/browser
npm install gh-pages --save-dev
npm run dev
```

For this existing project, run:

```bash
npm install
npm run dev
```

## GitHub Pages Deployment

The deployment script is configured:

```bash
npm run build
npm run deploy
```

If the repository name changes, update `base` in `vite.config.js` and `homepage` in `package.json`.

## Replace Project Links

Project data lives in `src/data/projects.js`. Replace the `#` GitHub links for Qraity, DarStore, and E-Learning when their repositories are available. YouTube links currently point to `https://www.youtube.com/@JnounAI`.
