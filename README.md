# Dev Portfolio — Next.js

A 5-page software-engineer portfolio (Home, About, Portfolio, Services, Contact)
built with Next.js App Router, Tailwind CSS, and Framer Motion. Code-editor
inspired design: tab-bar header, terminal-style hero, status-bar footer, and a
custom inspector-style cursor (desktop only).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Make it yours

Almost everything on every page is pulled from **one file**:

```
lib/siteConfig.js
```

Edit that file to update:
- your name, role, tagline, bio, location
- email, phone, resume link, social links
- your tech stack list
- experience / timeline entries
- services + deliverables
- projects (title, stack, tags, description, link, year)

You generally won't need to touch component code just to update content.

## Structure

```
app/
  layout.js        → fonts, header, footer, cursor, global wrapper
  page.js           → Home
  about/page.js     → About
  portfolio/page.js → Portfolio (filterable by stack)
  services/page.js  → Services
  contact/page.js   → Contact (form opens the visitor's email client)
components/
  Header.js         → editor-tab-bar nav
  Footer.js         → status-bar footer
  CustomCursor.js   → custom cursor / inspector readout
  TerminalWindow.js → typing hero animation
  ProjectCard.js, Reveal.js, SectionLabel.js, MarqueeStrip.js
lib/
  siteConfig.js     → all your content lives here
```

## Notes

- The custom cursor only activates on devices with a precise pointer
  (mouse/trackpad) — it stays out of the way on touch devices.
- Animations respect `prefers-reduced-motion`.
- The contact form has no backend — it opens a pre-filled email via
  `mailto:`. If you want it to submit without opening an email client,
  wire it up to a service like Formspree, Resend, or a Next.js API route.
- Deploy for free on [Vercel](https://vercel.com/new) — connect the repo
  and it builds automatically.
- Replace `/about` page's photo placeholder with a real `<Image>` from
  `next/image` once you have a headshot.
