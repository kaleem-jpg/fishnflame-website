# FishnFlame · Phase 1 website

A static landing page for www.fishnflame.in. It is plain HTML, CSS and JS, with no build step.

```
index.html
assets/css/styles.css   brand tokens (colours, fonts) at the top
assets/js/main.js       nav, mobile menu, scroll reveals, 700 counter, closing video
assets/img/             WebP photos
assets/logo/            vector logo variants in brand colours (SVG)
assets/video/           logo animations (wide and vertical)
```

## Deploy (Vercel)
This is a static site with no build step. `vercel.json` sets caching and security headers.
- **Dashboard:** go to vercel.com, choose Add New → Project, import `kaleem-jpg/fishnflame-website`, set Framework Preset to **Other**, leave the build command empty, and deploy. Every push to `main` redeploys.
- **CLI:** run `vercel` in this folder for a preview deploy, or `vercel --prod` for production.

## Before going live
- **Photos:** these are placeholders taken from the brand playbook and communication deck. The playbook's disclaimer says they are not free stock. Replace them with licensed or shot photography, keeping the same file names.
- **Fonts:** Juturu and Hello Radio are not on Google Fonts, so Outfit and Yellowtail stand in for them. To use the brand fonts, add the licensed files and update `--f-display` and `--f-script` in `styles.css`.
- **Promoters:** confirm the names, titles and bios. The bios are placeholder lines. Add headshots in place of the initials.
