// ────────────────────────────────────────────────────────────
// PERSONAL SITE CONFIG
// Domain: builtbysaurav.in
// SEO Optimized Content for Top Rankings
// ────────────────────────────────────────────────────────────

const getExperience = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();

  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);

  return `${years}+`;
};

export const siteConfig = {
  siteUrl: "https://builtbysaurav.in",
  name: "Built by Saurav",
  handle: "@builtbysaurav",
  role: "Digital Studio – Shopify, Frontend & Graphic Design",
  roleShort: "Full‑Service Dev",
  location: "Delhi, India",
  tagline:
    "We build high‑converting Shopify stores, modern React / Next.js apps, stunning graphic designs, and robust Java backends. Fast, reliable, and SEO‑friendly – all under one roof.",

  // ── Bio (third‑person, brand‑focused) ──
  bio: [
    `Built by Saurav is a Delhi‑based digital studio with ${getExperience("2022-09-01")} years of hands‑on experience. We specialise in Shopify theme development, React & Next.js apps, WordPress sites, and graphic design (logos, banners, social posts, video editing).`,
    "Our team blends technical expertise with creative flair. We optimise Core Web Vitals, craft pixel‑perfect UIs, and design scroll‑stopping visuals. Whether you need a complete eCommerce store, a custom app, or daily social media graphics – we deliver.",
    "We’ve helped 50+ businesses boost conversions and stand out online. Located in Delhi, we work with clients worldwide. Let’s create something amazing together.",
  ],

  email: "sauravprajapati144063@gmail.com",
  phone: "+91 9868464518",
  resumeUrl: "/saurav.pdf",
  socials: [
    {
      label: "Email",
      href: "mailto:sauravprajapati144063@gmail.com",
      visit: "Email",
    },
    {
      label: "GitHub",
      href: "https://github.com/saurav-prajapati/",
      visit: "GitHub",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saurav-parjapati-bv191102",
      visit: "LinkedIn",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/saurav_p01",
      visit: "Instagram",
    },
  ],

  policies: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
    {
      label: "Disclaimer",
      href: "/disclaimer",
    },
    {
      label: "Cookie Policy",
      href: "/cookie-policy",
    },
  ],

  stack: [
    // Web Development
    { name: "Shopify", tag: "Liquid Development" },
    { name: "React.js", tag: "Frontend" },
    { name: "Next.js", tag: "Full Stack" },
    { name: "TypeScript", tag: "Type Safe" },
    { name: "JavaScript", tag: "ES6+" },
    { name: "Node.js", tag: "Backend" },
    { name: "Express.js", tag: "REST APIs" },
    { name: "MongoDB", tag: "Database" },
    { name: "Tailwind CSS", tag: "UI Development" },
    { name: "GraphQL", tag: "Shopify APIs" },
    { name: "REST APIs", tag: "Integration" },
    { name: "Shopify Polaris", tag: "App Development" },
    { name: "Shopify CLI", tag: "Development" },
    { name: "Git & GitHub", tag: "Version Control" },
    { name: "WordPress", tag: "Custom Development" },
    // Graphic Design
    { name: "Figma", tag: "UI/UX & Social Design" },
    { name: "Adobe Photoshop", tag: "Image Editing & Banners" },
    { name: "Adobe Illustrator", tag: "Vector & Logo Design" },
    { name: "Adobe Premiere Pro", tag: "Video Editing" },
    { name: "Adobe After Effects", tag: "Motion Graphics" },
    { name: "Canva", tag: "Quick Social Graphics" },
    // Java
    // { name: "Java", tag: "Backend Development" },
    // { name: "Spring Boot", tag: "REST APIs & Microservices" },
    // { name: "Hibernate", tag: "ORM" },
    // { name: "MySQL / PostgreSQL", tag: "Relational DB" },
  ],
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "20+", label: "Shopify Stores" },
    { value: `${getExperience("2022-09-01")}`, label: "Experience" },
    { value: "5+", label: "Design Services" },
  ],

  experience: [
    {
      role: "Shopify & Frontend Developer",
      org: "Eglogics Softech Pvt. Ltd.",
      period: "Apr 2024 — Present",

      points: [
        "Developed and customized Shopify themes using Liquid, JSON templates, Online Store 2.0 sections, metafields, and schema architecture.",
        "Built high-performance storefronts with custom product pages, AJAX cart functionality, promotional features, and responsive UI components.",
        "Integrated third-party Shopify apps, payment gateways, review systems, GraphQL APIs, and custom storefront functionality.",
        "Optimized Core Web Vitals, improved Lighthouse scores, fixed frontend issues, and enhanced conversion-focused user experiences.",
      ],
    },

    {
      role: "Web Developer",
      org: "Lemniscate Technologies",
      period: "Oct 2023 — Apr 2024",

      points: [
        "Built responsive Shopify and WordPress websites for multiple client projects.",
        "Converted Figma designs into pixel-perfect frontend interfaces using HTML, CSS, JavaScript, Bootstrap, and Tailwind CSS.",
        "Developed reusable frontend components and collaborated with designers and backend developers for production deployments.",
      ],
    },

    {
      role: "Junior Web Developer",
      org: "Epic Web Techno",
      period: "Sep 2022 — Oct 2023",

      points: [
        "Developed responsive business websites using WordPress, HTML, CSS, JavaScript, and Bootstrap.",
        "Customized themes, resolved client issues, maintained production websites, and implemented new frontend features.",
        "Worked closely with clients to deliver websites according to business requirements and deadlines.",
      ],
    },
  ],

  differentiators: [
    {
      id: 1,
      number: 50,
      suffix: "+",
      label: "Projects Delivered",
      description:
        "From Shopify stores to Java backends, we’ve shipped real, production‑grade work for clients worldwide.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: 2,
      number: 3,
      suffix: "+",
      label: "Years Experience",
      description:
        "Deep expertise in Shopify, React, Next.js, and more. We know the pitfalls and the best practices.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 12l4-4" />
        </svg>
      ),
    },
    {
      id: 3,
      number: 6,
      suffix: "",
      label: "Core Services",
      description:
        "Shopify, React, WordPress, Graphic Design, Video Editing, Photography. A full creative & tech stack.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 4,
      number: 90,
      suffix: "+",
      label: "Avg. PageSpeed Score",
      description:
        "We obsess over Core Web Vitals. Your store or app will load fast and convert even faster.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 5,
      number: 24,
      suffix: "h",
      label: "Response Time",
      description:
        "No waiting for days. You’ll hear back within a day, often the same day.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: 6,
      number: 100,
      suffix: "%",
      label: "Client Satisfaction",
      description:
        "We don’t stop until you’re thrilled. Our repeat clients speak for themselves.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ],

  services: [
    {
      title: "Shopify Store Development",
      code: "shopify.store",
      description:
        "Custom Shopify theme development, Online Store 2.0 sections, performance optimization, app integration, and end‑to‑end eCommerce solutions.",
      deliverables: [
        "Custom Shopify Themes",
        "Liquid Development",
        "AJAX Cart & Checkout",
        "Speed Optimization",
      ],
      slug: "shopify-development",
    },
    {
      title: "React & Next.js Development",
      code: "react.next",
      description:
        "Modern frontend apps, dashboards, SSR/SSG sites, API integration, and scalable architectures using React, Next.js, TypeScript, and Tailwind.",
      deliverables: [
        "React SPA & Components",
        "Next.js App Router",
        "Authentication Flows",
        "Performance Tuning",
      ],
      slug: "react-nextjs-development",
    },
    {
      title: "WordPress Development",
      code: "wordpress.cms",
      description:
        "Fast, SEO‑friendly WordPress sites with custom themes, Elementor, WooCommerce, and ongoing maintenance.",
      deliverables: [
        "Custom Themes",
        "WooCommerce Setup",
        "SEO Optimization",
        "Website Maintenance",
      ],
      slug: "wordpress-development",
    },
    {
      title: "Graphic Design",
      code: "graphic.design",
      description:
        "Professional graphic design services for businesses, startups, and personal brands. We create custom logos, brand identity, social media creatives, business brochures, flyers, posters, packaging, banners, and marketing materials that help your brand stand out and increase customer engagement.",
      deliverables: [
        "Custom Logo Design",
        "Brand Identity & Style Guide",
        "Social Media Post Design",
        "Flyers, Posters & Brochures",
        "Business Cards & Stationery",
        "Packaging & Label Design",
        "Web Banners & Ad Creatives",
        "Product Image Editing",
      ],
      slug: "graphic-design",
    },
    {
      title: "Video Editing",
      code: "video.editing",
      description:
        "Professional video editing services for YouTube, Instagram Reels, TikTok, Facebook, and business promotions. We create engaging videos with cinematic cuts, motion graphics, subtitles, color grading, sound design, and visual effects to maximize audience retention and brand visibility.",
      deliverables: [
        "YouTube Video Editing",
        "Instagram Reels Editing",
        "TikTok & Shorts Editing",
        "Promotional & Ad Videos",
        "Corporate Video Editing",
        "Motion Graphics & Animation",
        "Color Correction & Grading",
        "Subtitles & Captions",
        "Audio Cleanup & Sound Design",
        "Thumbnail Design",
      ],
      slug: "video-editing",
    },
  ],
  serviceinner: [
    {
      title: "Shopify Store Development",
      code: "shopify.store",
      slug: "shopify-development",
      image: "/services/shopify-development.webp",
      description:
        "Custom Shopify theme development, Online Store 2.0 sections, performance optimization, app integration, and complete eCommerce solutions for brands looking to sell more online.",
      longDescription:
        "We build high‑converting Shopify stores that are fast, scalable, and tailored to your brand. From custom Liquid sections and AJAX carts to full store setups, we handle everything. Our stores score 90+ on Lighthouse and drive real sales. As a Delhi‑based Shopify developer, we bring 3+ years of experience crafting stores for international and local brands. Whether you need a brand‑new store, a theme migration, or performance fixes, we deliver clean, SEO‑friendly code that keeps your customers coming back. Our expertise includes Shopify Plus, headless commerce with Hydrogen, and integration with third‑party tools like Klaviyo, Yotpo, and Recharge.",
      deliverables: [
        "Custom Shopify Theme",
        "Liquid / JSON Templates",
        "Online Store 2.0 Sections",
        "AJAX Cart & Checkout",
        "Metafields & Custom Data",
        "Speed Optimization (90+ PageSpeed)",
        "Third‑party App Integrations",
        "Ongoing Maintenance",
      ],
      process: [
        {
          title: "Discovery",
          description:
            "We start by understanding your brand, target audience, product catalog, and business goals. This phase includes competitor analysis and a detailed project roadmap.",
        },
        {
          title: "Design",
          description:
            "Our team creates high‑fidelity mockups in Figma, aligning every pixel with your brand identity. You’ll see exactly how your store will look before we write a line of code.",
        },
        {
          title: "Development",
          description:
            "We build a fully custom Shopify theme using Liquid, JSON templates, and Online Store 2.0 sections. Every component is modular, reusable, and optimised for speed.",
        },
        {
          title: "Testing",
          description:
            "Rigorous cross‑browser, mobile responsiveness, and performance testing. We ensure your store loads in under 2 seconds and passes Core Web Vitals.",
        },
        {
          title: "Launch & Support",
          description:
            "After final approval, we handle the launch process, domain configuration, and post‑launch monitoring. We also offer maintenance packages to keep your store updated and secure.",
        },
      ],
      faqs: [
        {
          question: "Do you work with existing themes?",
          answer:
            "Yes, we can customize any existing Shopify theme or completely rebuild it to match your new requirements. We optimize the codebase for performance and maintainability.",
        },
        {
          question: "How long does a complete Shopify store take?",
          answer:
            "A standard custom store takes 3–5 weeks, depending on the number of custom sections and integrations. We provide a detailed timeline after the discovery call.",
        },
        {
          question: "Do you offer ongoing maintenance and support?",
          answer:
            "Absolutely. We offer monthly maintenance packages that include theme updates, app updates, performance monitoring, and emergency bug fixes.",
        },
        {
          question: "Can you integrate my store with third‑party apps?",
          answer:
            "Yes, we have extensive experience integrating Shopify with apps like Klaviyo, Yotpo, Recharge, Bold, and custom API solutions. We can also build private Shopify apps for unique business logic.",
        },
        {
          question: "Is your code SEO‑friendly?",
          answer:
            "Yes, we follow Shopify’s best practices for SEO: semantic HTML, proper heading hierarchy, structured data (JSON‑LD), fast loading times, and mobile‑first design. All our stores are built with search engines in mind.",
        },
      ],
    },
    {
      title: "React & Next.js Development",
      code: "react.next",
      slug: "react-nextjs-development",
      image: "/services/react-nextjs-development.webp",
      description:
        "Modern frontend apps, dashboards, SSR/SSG sites, API integration, and scalable architectures using React, Next.js, TypeScript, and Tailwind. Delivered from Delhi, India.",
      longDescription:
        "We build blazing‑fast web applications with React and Next.js. Whether you need a dynamic dashboard, a headless Shopify storefront, a fully static marketing site, or an enterprise‑grade SaaS product, we deliver clean, maintainable code that scales. Using Next.js App Router, Server Components, and TypeScript, we create SEO‑friendly apps that load instantly and provide stellar user experiences. Our team specialises in headless commerce (Shopify + Next.js), real‑time dashboards, authentication systems, and API‑driven interfaces. With a strong focus on Core Web Vitals and accessibility, every project we ship is optimised for performance and usability.",
      deliverables: [
        "React SPA / Components",
        "Next.js App Router Setup",
        "Server‑Side Rendering (SSR)",
        "Static Site Generation (SSG)",
        "TypeScript Integration",
        "Tailwind CSS Styling",
        "REST / GraphQL API Integration",
        "Deployment on Vercel / Netlify",
      ],
      process: [
        {
          title: "Architecture Planning",
          description:
            "We design the component tree, data flow, and routing structure. For headless commerce, we map out the integration with Shopify’s Storefront API and plan for optimal caching strategies.",
        },
        {
          title: "UI Development",
          description:
            "Pixel‑perfect, responsive components are built using React, TypeScript, and Tailwind CSS. We ensure a consistent design system and smooth animations with Framer Motion.",
        },
        {
          title: "API Integration",
          description:
            "We connect your frontend to REST or GraphQL endpoints, handling authentication, state management (React Query / Zustand), and error handling for a seamless user experience.",
        },
        {
          title: "Performance Optimization",
          description:
            "Bundle analysis, code splitting, lazy loading, image optimization, and server‑side rendering tweaks to achieve 90+ Lighthouse scores. We also implement SEO best practices like metadata generation and sitemaps.",
        },
        {
          title: "Launch & CI/CD",
          description:
            "We set up continuous deployment pipelines (GitHub Actions / Vercel) and handle production deployment, environment variables, and domain configuration. Post‑launch support is available.",
        },
      ],
      faqs: [
        {
          question: "Do you build headless Shopify stores with Next.js?",
          answer:
            "Yes, we specialise in headless Shopify builds. We use the Shopify Storefront API with Next.js to create ultra‑fast, custom storefronts that give you full control over design and UX.",
        },
        {
          question: "Can you migrate my existing React app to Next.js?",
          answer:
            "Absolutely. We handle the migration smoothly, preserving existing functionality while adding SSR/SSG benefits, improved SEO, and better performance.",
        },
        {
          question: "What kind of apps have you built?",
          answer:
            "We’ve built dashboards, e‑commerce storefronts, portfolio sites, SaaS products, inventory management systems, and internal tools. Our stack of React, Next.js, TypeScript, and Tailwind CSS is versatile enough for almost any project.",
        },
        {
          question: "Do you provide post‑launch support?",
          answer:
            "Yes, we offer maintenance and feature‑enhancement packages. We monitor performance, apply security patches, and can add new features as your business grows.",
        },
        {
          question: "How do you handle state management?",
          answer:
            "We use React Query (TanStack Query) for server state, Zustand or Context API for client state, and follow best practices to keep the codebase clean and predictable.",
        },
      ],
    },
    {
      title: "WordPress Development",
      code: "wordpress.cms",
      slug: "wordpress-development",
      image: "/services/wordpress-development.webp",
      description:
        "Fast, SEO‑friendly WordPress websites with custom themes, Elementor, WooCommerce, and performance improvements. Affordable and reliable development from Delhi.",
      longDescription:
        "We create WordPress websites that are easy to manage yet powerful. From custom themes and plugin development to WooCommerce stores, we focus on speed, security, and SEO. As an experienced WordPress developer, we’ve built everything from simple business sites to complex multilingual portals. We use the latest tools like Elementor, Gutenberg, and Advanced Custom Fields to give you complete control over your content. All our sites are optimised for Core Web Vitals, mobile responsiveness, and search engine visibility. Whether you need a redesign, a migration, or a brand‑new site, we deliver within budget and timeline.",
      deliverables: [
        "Custom WordPress Theme",
        "Elementor / Gutenberg Blocks",
        "WooCommerce Store Setup",
        "SEO Plugin Configuration (Yoast/Rank Math)",
        "Speed Optimization (Caching, CDN, Image Compression)",
        "Security Hardening (Firewall, Malware Scanning)",
        "Maintenance & Support",
      ],
      process: [
        {
          title: "Planning & Strategy",
          description:
            "We map out your site structure, content strategy, and choose the right plugins. We also define SEO goals and performance benchmarks upfront.",
        },
        {
          title: "Design",
          description:
            "High‑fidelity mockups in Figma, focusing on user experience and conversion. You’ll approve the design before development begins.",
        },
        {
          title: "Development",
          description:
            "Custom theme coding, custom post types, advanced fields, and WooCommerce setup. We write clean, well‑documented PHP, HTML, CSS, and JavaScript.",
        },
        {
          title: "Testing & Optimization",
          description:
            "We test across browsers and devices, optimize images, enable caching, and configure a CDN. We aim for a 90+ PageSpeed score on both desktop and mobile.",
        },
        {
          title: "Handover & Training",
          description:
            "We provide training videos/documentation so you can manage the site yourself. Ongoing maintenance and support packages are available for peace of mind.",
        },
      ],
      faqs: [
        {
          question:
            "Can you redesign my existing WordPress site without losing content?",
          answer:
            "Yes, we can overhaul the design and theme while preserving all existing content, SEO rankings, and settings. We work on a staging environment to avoid downtime.",
        },
        {
          question: "Do you optimise for Core Web Vitals?",
          answer:
            "Absolutely. We implement performance best practices: lightweight themes, caching, lazy loading, image optimization, and CDN integration to achieve 90+ scores.",
        },
        {
          question: "Can you build a multilingual site?",
          answer:
            "Yes, we have experience with WPML and Polylang for creating multilingual WordPress sites that are SEO‑friendly and easy to manage.",
        },
        {
          question: "Do you handle security and backups?",
          answer:
            "We harden WordPress installations, set up firewalls, malware scanning, and automated daily backups. Our maintenance plans include security monitoring and updates.",
        },
        {
          question: "How long does a typical WordPress website take?",
          answer:
            "A standard business website takes 2–4 weeks, while a complex WooCommerce store may take 4–6 weeks. Timelines depend on the number of pages and custom features.",
        },
      ],
    },
    {
      title: "Graphic Design",
      code: "graphic.design",
      slug: "graphic-design",
      image: "/services/graphic-design.webp",
      description:
        "Branding, banners, social media posts, logo design, packaging, and print materials – everything to make your brand stand out. Creative design services based in Delhi.",
      longDescription:
        "We offer comprehensive graphic design services that cover every visual touchpoint of your brand. From a memorable logo and brand identity to eye‑catching social media graphics and packaging that sells, our designs are rooted in strategy and creativity. Our Delhi‑based design studio has worked with startups, e‑commerce brands, and established businesses to create visual identities that resonate with their audience. We specialise in logo design, packaging, social media templates, brochures, banners, and custom illustrations. Every project is approached with a deep understanding of colour theory, typography, and composition. We use industry‑standard tools like Adobe Photoshop, Illustrator, InDesign, and Figma to deliver print‑ready and digital‑optimised files.",
      deliverables: [
        "Logo & Brand Identity",
        "Social Media Posts & Stories",
        "Banners & Posters",
        "Packaging & Labels",
        "Brochures & Flyers",
        "Business Cards & Stationery",
        "Custom Illustrations",
      ],
      process: [
        {
          title: "Brief",
          description:
            "We dive deep into your brand, target audience, competitors, and project goals. The more we know, the more targeted and effective the designs will be.",
        },
        {
          title: "Research & Moodboard",
          description:
            "We create mood boards and gather inspiration to establish a visual direction. This includes typography exploration, colour palettes, and style references.",
        },
        {
          title: "Concept Development",
          description:
            "We present multiple design directions for your feedback. These concepts are refined until we have a clear winner that aligns with your brand.",
        },
        {
          title: "Refinement",
          description:
            "Based on your feedback, we fine‑tune the chosen concept. We typically offer 2‑3 rounds of revisions to ensure you’re 100% satisfied.",
        },
        {
          title: "Final Delivery",
          description:
            "You receive all final files in the required formats (AI, PSD, PNG, JPG, PDF). We also provide guidelines on how to use your new assets effectively.",
        },
      ],
      faqs: [
        {
          question: "How many revisions do you offer?",
          answer:
            "We include 2–3 rounds of revisions in our standard packages. Additional revision rounds can be added if needed.",
        },
        {
          question: "Do you design for print?",
          answer:
            "Yes, we specialise in print design and provide CMYK, 300dpi files with bleed and crop marks as required. We’ve designed packaging, brochures, banners, and business cards.",
        },
        {
          question: "Can you work with my existing brand guidelines?",
          answer:
            "Absolutely. We can create new designs that strictly follow your existing brand guidelines, ensuring consistency across all materials.",
        },
        {
          question: "What software do you use?",
          answer:
            "We use Adobe Creative Cloud (Photoshop, Illustrator, InDesign) and Figma. We can deliver source files if you need them.",
        },
        {
          question: "How long does a logo design take?",
          answer:
            "A typical logo design project takes 1–2 weeks, depending on the number of concepts and revisions. More extensive branding packages may take 3–4 weeks.",
        },
      ],
    },
    {
      title: "Video Editing",
      code: "video.edit",
      slug: "video-editing",
      image: "/services/video-editing.webp",
      description:
        "Professional video editing for YouTube, Instagram Reels, ads, corporate videos, and motion graphics. Engaging edits that drive views and conversions.",
      longDescription:
        "Transform your raw footage into captivating stories. We offer professional video editing services for content creators, brands, and businesses. From colour grading and sound design to animated intros and subtitles, our edits are polished and optimised for each platform (YouTube, Instagram, Facebook, LinkedIn). We specialise in short‑form content (Reels, Shorts, TikTok) as well as longer formats like explainer videos, product demos, and corporate presentations. Using Adobe Premiere Pro, After Effects, and DaVinci Resolve, we deliver broadcast‑quality videos that engage your audience and drive results. Whether you need a single video or ongoing editing support, we’ve got you covered.",
      deliverables: [
        "Trim & Sequence Editing",
        "Colour Correction & Grading",
        "Audio Sync & Noise Reduction",
        "Transitions & Effects",
        "Text Overlays & Subtitles (Burned‑in or SRT)",
        "Motion Graphics & Intros",
        "Export in Multiple Formats (MP4, MOV, etc.)",
      ],
      process: [
        {
          title: "Brief & Footage Review",
          description:
            "We discuss the video’s purpose, target platform, length, and style. You share the raw footage, and we evaluate it for editing possibilities.",
        },
        {
          title: "Ingest & Organization",
          description:
            "We organise all clips, audio files, and assets into a structured project. This ensures a smooth editing workflow and easy revisions later.",
        },
        {
          title: "Rough Cut",
          description:
            "We assemble the footage into a timeline, focusing on pacing and narrative flow. The rough cut gives you a clear idea of the final video’s structure.",
        },
        {
          title: "Fine Cut & Post‑Production",
          description:
            "Colour grading, audio sweetening, motion graphics, transitions, and effects are applied. We also add subtitles and any required text overlays.",
        },
        {
          title: "Delivery",
          description:
            "After your approval, we render the final video in your desired resolution and format. We can also provide project files if needed.",
        },
      ],
      faqs: [
        {
          question: "Do you add subtitles?",
          answer:
            "Yes, we can add burned‑in subtitles (always visible) or provide an SRT file for platforms that support closed captions.",
        },
        {
          question: "What video formats do you accept?",
          answer:
            "We accept all common formats: MP4, MOV, AVI, and even raw footage from cameras. We can also work with smartphone footage.",
        },
        {
          question: "Can you do motion graphics and animations?",
          answer:
            "Yes, we create animated intros, lower thirds, explainer animations, and kinetic typography using After Effects. Let us know your requirements.",
        },
        {
          question: "How long does editing take?",
          answer:
            "A typical social media video (1‑2 minutes) takes 2–3 days. Longer videos (10+ minutes) may take 5–7 days. Rush delivery is available.",
        },
        {
          question: "Do you offer revisions?",
          answer:
            "Yes, we include 2 rounds of revisions in our standard package to ensure you’re happy with the final output.",
        },
      ],
    },
    {
      title: "Photography",
      code: "photography",
      slug: "photography",
      image: "/services/photography.webp",
      description:
        "Professional product photography, brand shoots, event coverage, and retouching for eCommerce and marketing. High‑quality images that sell.",
      longDescription:
        "Elevate your brand with stunning photography. We offer studio and on‑location shoots specialising in product photography for e‑commerce (white‑background and lifestyle), brand lookbooks, corporate headshots, and event coverage. Our Delhi‑based photography services are trusted by Shopify stores, fashion brands, and local businesses to create compelling visual content. Every image goes through professional retouching to ensure flawless results. We provide web‑optimised images that load fast without compromising quality, as well as high‑resolution files for print. Whether you need 10 products shot or a full‑day brand campaign, we bring the expertise, lighting, and creativity to make your products shine.",
      deliverables: [
        "Product Photography (White Background & Lifestyle)",
        "Brand & Lookbook Shoots",
        "Event Coverage",
        "Professional Retouching (Skin, Color, Background)",
        "Color Correction",
        "Web‑Optimized Images (Compressed for Fast Loading)",
        "Raw Files Available on Request",
      ],
      process: [
        {
          title: "Consultation",
          description:
            "We discuss your vision, style preferences, shot list, and how the images will be used (web, print, social media). We also plan logistics like location and props.",
        },
        {
          title: "Photoshoot",
          description:
            "Using professional lighting and equipment, we capture the shots according to the agreed plan. For product shoots, we can set up white backgrounds or styled scenes.",
        },
        {
          title: "Selection & Culling",
          description:
            "We shortlist the best images from the shoot. You can review and select your favourites, or we can choose based on our expertise.",
        },
        {
          title: "Retouching & Editing",
          description:
            "Selected images undergo advanced retouching: exposure correction, colour balance, background cleanup, skin retouching (for people), and cropping to required aspect ratios.",
        },
        {
          title: "Delivery",
          description:
            "You receive high‑resolution files for print and web‑optimised versions for your online store. Delivery is via a secure cloud link, typically within 5–7 business days.",
        },
      ],
      faqs: [
        {
          question: "Do you travel outside Delhi for shoots?",
          answer:
            "Yes, we cover Delhi NCR and can travel to other cities. Travel costs may apply depending on distance and duration.",
        },
        {
          question: "How many photos will I get?",
          answer:
            "It depends on the package. A half‑day product shoot typically yields 20–30 fully edited images. We can discuss exact numbers during the consultation.",
        },
        {
          question: "Can you do lifestyle/product‑in‑use shots?",
          answer:
            "Absolutely. We love creating lifestyle images that tell a story and help customers visualise using your products.",
        },
        {
          question: "Do you provide raw files?",
          answer:
            "Yes, raw files can be provided upon request, usually for an additional fee. We recommend our edited images as they represent our professional quality.",
        },
        {
          question: "How long until I receive my edited images?",
          answer:
            "Standard turnaround is 5–7 business days. Rush delivery is available for an extra charge if you need them sooner.",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Ciwete",
      image: "/projects/ciwete.webp",
      fullImage: "/projects/ciwete-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://ciwete.com",
      year: "2026",
    },
    {
      title: "Idiya",
      image: "/projects/idiya.webp",
      fullImage: "/projects/idiya-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://idiya.co.nz",
      year: "2026",
    },
    {
      title: "Zibaa",
      image: "/projects/zibaa.webp",
      fullImage: "/projects/zibaa-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://zibaa.in",
      year: "2026",
    },
    {
      title: "Sports Frames Europe",
      image: "/projects/sports-frames-europe.webp",
      fullImage: "/projects/sports-frames-europe-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A custom Shopify store for premium sports eyewear with a modern, responsive shopping experience.",
      link: "https://sportsframeseurope.com/",
      year: "2026",
    },
    {
      title: "BH Simple Wishlist",
      image: "/projects/bh-simple-wishlist.webp",
      stack: "React",
      tags: ["React", "Polaris", "Node.js", "Shopify"],
      description:
        "Built Shopify applications using React, Polaris, GraphQL APIs, and App Bridge to extend store functionality and automate merchant workflows.",
      link: "#",
      year: "2026",
    },
    {
      title: "The Juice Smith",
      image: "/projects/the-juice-smith.webp",
      fullImage: "/projects/the-juice-smith-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A premium Shopify store for cold-pressed juices and wellness products with a fresh, modern layout.",
      link: "https://www.thejuicesmith.com/",
      year: "2024",
    },
    {
      title: "BH Global Cart",
      image: "/projects/bhglobalcart.webp",
      stack: "React",
      tags: ["React", "Polaris", "Node.js", "Shopify"],
      description:
        "Built Shopify applications using React, Polaris, GraphQL APIs, and App Bridge to extend store functionality and automate merchant workflows.",
      link: "#",
      year: "2025",
    },
    {
      title: "Dried",
      image: "/projects/dried.webp",
      fullImage: "/projects/dried-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://dried.co.uk",
      year: "2025",
    },
    {
      title: "Vivarti",
      image: "/projects/vivarti.webp",
      fullImage: "/projects/vivarti-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "An elegant Shopify store for lifestyle and home products featuring a clean and user-friendly design.",
      link: "https://www.vivarti.co.uk/",
      year: "2026",
    },
    {
      title: "Tayyib Naturals",
      image: "/projects/tayyib-naturals.webp",
      fullImage: "/projects/tayyib-naturals-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "An eCommerce website for natural and organic wellness products built with a responsive Shopify theme.",
      link: "https://www.tayyibnaturals.com/",
      year: "2024",
    },
    {
      title: "Clever Casa",
      image: "/projects/clever-casa.webp",
      fullImage: "/projects/clever-casa-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A modern Shopify store offering stylish home and kitchen essentials with optimized product pages.",
      link: "https://www.clever-casa.co.uk/",
      year: "2024",
    },
    {
      title: "BrightKare",
      image: "/projects/brightkare.webp",
      fullImage: "/projects/brightkare-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A responsive Shopify store for healthcare and wellness products with a clean shopping interface.",
      link: "https://brightkare.in/",
      year: "2025",
    },
    {
      title: "Marleys Sweets",
      image: "/projects/marleys-sweets.webp",
      fullImage: "/projects/marleys-sweets-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "An online candy store built on Shopify with vibrant visuals and an engaging shopping experience.",
      link: "https://marleyssweets.com/",
      year: "2025",
    },
    {
      title: "La Petite Box",
      image: "/projects/la-petite-box.webp",
      fullImage: "/projects/la-petite-box-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A subscription-based Shopify store with a clean and minimal shopping experience.",
      link: "https://lapetitebox.no/",
      year: "2024",
    },
    {
      title: "Vita Thrive",
      image: "/projects/vita-thrive.webp",
      fullImage: "/projects/vita-thrive-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A Shopify wellness store showcasing health supplements with responsive custom sections.",
      link: "https://www.vitathrive.co.uk/",
      year: "2025",
    },
    {
      title: "Moustache",
      image: "/projects/moustache.webp",
      fullImage: "/projects/moustache-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A modern Shopify fashion store with a sleek design and optimized shopping experience.",
      link: "https://moustache.co.nz/",
      year: "2024",
    },
    {
      title: "En-Joy",
      image: "/projects/en-joy.webp",
      fullImage: "/projects/en-joy-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A beautifully designed Shopify store focused on lifestyle and wellness products.",
      link: "https://www.en-joy.co.uk/",
      year: "2024",
    },
    {
      title: "Nuria Nunom",
      image: "/projects/nuria-nunom.webp",
      fullImage: "/projects/nuria-nunom-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A custom-designed Shopify password page with a premium coming-soon experience.",
      link: "https://nurianunom.com/",
      year: "2024",
    },
    {
      title: "Curly At Hart",
      image: "/projects/curly-at-hart.webp",
      fullImage: "/projects/curly-at-hart-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A Shopify beauty store featuring responsive layouts and custom theme enhancements.",
      link: "https://curlyathart.com/",
      year: "2024",
    },
    {
      title: "Herron Apparel",
      image: "/projects/herron-apparel.webp",
      fullImage: "/projects/herron-apparel-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A modern apparel eCommerce website with custom Shopify theme development.",
      link: "https://herronapparel.com/",
      year: "2024",
    },
    {
      title: "Max Cleavage",
      image: "/projects/max-cleavage.webp",
      fullImage: "/projects/max-cleavage-full.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A fashion-focused Shopify store with responsive design and optimized product pages.",
      link: "https://www.maxcleavage.com/",
      year: "2024",
    },
    {
      title: "Kinobody",
      image: "/projects/kinobody.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A fitness and nutrition Shopify store with custom sections and performance-focused UI.",
      link: "https://kinobody.com/",
      year: "2024",
    },
    {
      title: "It Just Works Wellness",
      image: "/projects/it-just-works-wellness.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A wellness-focused Shopify store with responsive layouts and customized theme features.",
      link: "https://www.itjustworkswellness.com/",
      year: "2024",
    },
    {
      title: "Accelerator365",
      image: "/projects/accelerator365.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A professional Shopify website with custom sections and a polished business-oriented design.",
      link: "https://accelerator365.com/",
      year: "2024",
    },
    {
      title: "Jade Pearl Official",
      image: "/projects/jade-pearl-official.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      description:
        "A premium jewelry Shopify store featuring elegant UI and optimized shopping experience.",
      link: "https://www.jadepearlofficial.com/",
      year: "2024",
    },
    {
      title: "Velzatech Solutions",
      image: "/projects/velzatechsolutions.webp",
      fullImage: "/projects/velzatechsolutions-full.webp",
      stack: "Wordpress",
      tags: ["WordPress"],
      description:
        "Designed and developed an education platform with modern UI, SEO optimization, responsive layouts, animations, and lead generation features.",
      link: "https://velzatechsolutions.com/",
      year: "2026",
    },
    {
      title: "Elite Sport Soccer",
      image: "/projects/elite-sport-soccer.webp",
      fullImage: "/projects/elite-sport-soccer-full.webp",
      stack: "Wordpress",
      tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
      description:
        "A modern WordPress website for a soccer academy featuring training programs, club information, and a responsive user experience.",
      link: "https://www.elitesport.soccer/",
      year: "2023",
    },
    {
      title: "Travees India",
      image: "/projects/travees-india.webp",
      fullImage: "/projects/travees-india-full.webp",
      stack: "Wordpress",
      tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
      description:
        "A professional WordPress business website showcasing security solutions, compliance services, and company expertise with a responsive design.",
      link: "https://traveesindia.com/",
      year: "2023",
    },
    {
      title: "Systempkg",
      image: "/projects/systempkg.webp",
      fullImage: "/projects/systempkg-full.webp",
      stack: "Wordpress",
      tags: ["WordPress"],
      description:
        "Designed and developed an education platform with modern UI, SEO optimization, responsive layouts, animations, and lead generation features.",
      link: "https://systempkg.com/",
      year: "2023",
    },
    {
      title: "Epic Web Techno",
      image: "/projects/epicwebtechno.webp",
      stack: "Next.js",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      description:
        "Personal portfolio showcasing Shopify, React, WordPress, and frontend development projects with a premium UI, smooth animations, and SEO-focused architecture.",
      link: "https://www.epicwebtechno.com/",
      year: "2023",
    },
    {
      title: "Pltdaddy",
      image: "/projects/pltdaddy.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://pltdaddy.com",
      year: "2024",
    },
    {
      title: "Hootyballoo",
      image: "/projects/hootyballoo.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://www.clubgreen.com/",
      year: "2023",
    },
    {
      title: "Italiving",
      image: "/projects/italiving.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://italiving.de/",
      year: "2023",
    },
    {
      title: "8000kicks",
      image: "/projects/8000kick.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://www.8000kicks.com/",
      year: "2023",
    },
    {
      title: "Rouki",
      image: "/projects/rouki.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://rouki.ca/",
      year: "2023",
    },
    {
      title: "Manonsimard",
      image: "/projects/manonsimard.webp",
      stack: "Shopify",
      tags: ["Shopify", "Liquid", "GraphQL", "Performance"],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://manonsimard-boutique.com/",
      year: "2023",
    },
    {
      title: "Modern Aluminum & Glass",
      image: "/projects/modern-aluminum-glass.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A modern landing page for an aluminum and glass solutions company showcasing products, services, and contact information.",
      link: "https://www.modernaluminumglass.shop/",
      year: "2026",
    },
    {
      title: "New Aradhya Hospitals",
      image: "/projects/new-aradhya-hospital.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A responsive 5-page hospital website featuring healthcare services, doctors, departments, about, and contact pages.",
      link: "https://www.newaradhyahospitals.in/",
      year: "2026",
    },
    {
      title: "A One Sofa Repair",
      image: "/projects/aone-sofa-repair.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A service website for professional sofa repair and upholstery solutions with service details and enquiry section.",
      link: "https://www.aonesofarepair.shop/",
      year: "2026",
    },
    {
      title: "Primero Solutions",
      image: "/projects/primero-solutions.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A clean business landing page highlighting company services, expertise, and customer engagement.",
      link: "https://www.primerosolutions.shop/",
      year: "2026",
    },
    {
      title: "BS Chick Maker",
      image: "/projects/bs-chick-maker.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A responsive website for a poultry equipment manufacturer showcasing products, features, and business information.",
      link: "https://www.bschickmaker.shop/",
      year: "2025",
    },
    {
      title: "RK Craft",
      image: "/projects/rk-craft.webp",
      stack: "HTML/CSS/JS",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A portfolio-style business website presenting handcrafted products with an elegant and modern design.",
      link: "https://www.rkcraft.co.in/",
      year: "2025",
    },
    {
      title: "T7 Test‑on Ayurvedic Formula – Packaging",
      image: "/projects/graphic-1.webp",
      stack: "Graphic Design",
      tags: ["Packaging", "Label", "Ayurveda", "Print"],
      description:
        "Designed a clean, modern supplement box for Neuherbs' T7 Test‑on Ayurvedic Formula, highlighting natural ingredients with premium finishes and regulatory clarity.",
      link: "#",
      year: "2026",
    },
    {
      title: "Omega Fish Oil – Packaging Design",
      image: "/projects/graphic-2.webp",
      stack: "Graphic Design",
      tags: ["Packaging", "Supplement", "Label"],
      description:
        "Eye‑catching packaging for an Omega‑3 fish oil supplement, combining oceanic blue gradients, bold typography, and a clean layout for drugstore shelves.",
      link: "#",
      year: "2026",
    },
    {
      title: "Instagram Post & Story Templates – Fashion",
      image: "/projects/graphic-3.webp",
      stack: "Graphic Design",
      tags: ["Social Media", "Instagram", "Post", "Story"],
      description:
        "A cohesive set of 15+ Instagram posts and story templates for a clothing brand, featuring consistent colour palettes, grid layouts, and on‑brand product highlights.",
      link: "#",
      year: "2025",
    },
    {
      title: "NutriFleX Sports – Logo Design",
      image: "/projects/graphic-4.webp",
      stack: "Graphic Design",
      tags: ["Logo", "Branding", "Sports", "Vector"],
      description:
        "A bold, dynamic logo for a sports nutrition brand, combining movement shapes with a modern sans‑serif wordmark to convey energy and performance.",
      link: "#",
      year: "2026",
    },
    {
      title: "Viherbs Green Coffee – Packaging Design",
      image: "/projects/graphic-5.webp",
      stack: "Graphic Design",
      tags: ["Packaging", "Coffee", "Label"],
      description:
        "Earthy, organic packaging for Viherbs green coffee beans, using natural colour tones, hand‑drawn plant motifs, and a resealable pouch mockup.",
      link: "#",
      year: "2025",
    },
    {
      title: "Touch to Begin – Logo Design",
      image: "/projects/graphic-6.webp",
      stack: "Graphic Design",
      tags: ["Logo", "Branding", "Minimalist"],
      description:
        "A minimalist, touch‑inspired logo for a UI/UX design studio, merging a fingerprint symbol with a sleek sans‑serif typeface for a modern tech feel.",
      link: "#",
      year: "2025",
    },
    {
      title: "RouseFit – Fitness App UI Design",
      image: "/projects/graphic-7.webp",
      stack: "Graphic Design",
      tags: ["App Design", "Figma", "Prototype", "UI/UX"],
      description:
        "Complete mobile app design for RouseFit, including wireframes, interactive prototype, onboarding screens, workout tracking dashboard, and dark/light mode variants.",
      link: "#",
      year: "2026",
    },
    {
      title: "NatureFuel Creatine – Packaging Design",
      image: "/projects/graphic-8.webp",
      stack: "Graphic Design",
      tags: ["Packaging", "Supplement", "Label"],
      description:
        "Aggressive yet premium packaging for a creatine supplement, featuring metallic textures, bold contrast, and clear nutrition call‑outs for gym‑goers.",
      link: "#",
      year: "2025",
    },
    {
      title: "Tripway – Travel Logo Design",
      image: "/projects/graphic-9.webp",
      stack: "Graphic Design",
      tags: ["Logo", "Branding", "Travel"],
      description:
        "A wanderlust‑inspired logo for a travel booking platform, combining a compass icon with a playful script and a vibrant blue‑orange palette.",
      link: "#",
      year: "2026",
    },
  ],
};
