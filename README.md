# Jermaine Pasion — Portfolio

Personal portfolio site: https://jermainepasion.com

Built with React 19, Vite 7, Tailwind CSS 4, Embla Carousel and EmailJS.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint     # ESLint
```

Create a `.env` file for the contact form:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Add the same three variables in the Vercel project settings for production.

## Updating content

Most edits only touch `src/data/`:

| File | What it holds |
| --- | --- |
| `site.js` | Name, title, email, resume file name, Jobs180 link |
| `experience.js` | Experience section entries |
| `skills.jsx` | Skills cards |
| `projects.js` | Projects carousel (images go in `public/projects/` as WebP, ~1200px wide) |
| `techStack.js` | Tech ring in the About section |
| `socials.js` | Footer social links |

The Resume button appears automatically once `public/Jermaine-Pasion-Resume.pdf` exists.
