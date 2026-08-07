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

  return `${years}+ years`;
};

export const siteConfig = {
  siteUrl: "https://builtbysaurav.in",
  name: "Built by Saurav",                    // brand name, not personal
  handle: "@builtbysaurav",
  role: "Digital Studio – Shopify, Frontend & Graphic Design",
  roleShort: "Full‑Service Dev",
  location: "Delhi, India",
  tagline:
    "We build high‑converting Shopify stores, modern React / Next.js apps, stunning graphic designs, and robust Java backends. Fast, reliable, and SEO‑friendly – all under one roof.",

  // ── Bio (third‑person, brand‑focused) ──
  bio: [
    `Built by Saurav is a Delhi‑based digital studio with ${getExperience("2022-09-01")} of hands‑on experience. We specialise in Shopify theme development, React & Next.js apps, WordPress sites, graphic design (logos, banners, social posts, video editing), and Java backend development.`,
    "Our team blends technical expertise with creative flair. We optimise Core Web Vitals, craft pixel‑perfect UIs, design scroll‑stopping visuals, and build scalable Java APIs. Whether you need a complete eCommerce store, a custom app, or daily social media graphics – we deliver.",
    "We’ve helped 50+ businesses boost conversions and stand out online. Located in Delhi, we work with clients worldwide. Let’s create something amazing together.",
  ],

  email: "sauravprajapati144063@gmail.com",
  phone: "+91 9868464518",
  resumeUrl: "/saurav.pdf",
  socials: [
    {
      label: "Email",
      href: "mailto:sauravprajapati144063@gmail.com",
    },
    {
      label: "GitHub",
      href: "https://github.com/saurav-prajapati/",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/saurav-parjapati-bv191102",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/saurav_p01",
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
    { name: "Java", tag: "Backend Development" },
    { name: "Spring Boot", tag: "REST APIs & Microservices" },
    { name: "Hibernate", tag: "ORM" },
    { name: "MySQL / PostgreSQL", tag: "Relational DB" },
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
    },
  ],

  projects: [
    {
      title: "Ciwete",
      image: "/projects/ciwete.webp",
      fullImage: "/projects/ciwete-full.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
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
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
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
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
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
      tags: [
        "React",
        "Polaris",
        "Node.js",
        "Shopify",
      ],
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
      tags: [
        "React",
        "Polaris",
        "Node.js",
        "Shopify",
      ],
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
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
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
      tags: [
        "WordPress",
      ],
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
      tags: [
        "WordPress",
      ],
      description:
        "Designed and developed an education platform with modern UI, SEO optimization, responsive layouts, animations, and lead generation features.",
      link: "https://systempkg.com/",
      year: "2023",
    },
    {
      title: "Epic Web Techno",
      image: "/projects/epicwebtechno.webp",
      stack: "Next.js",
      tags: [
        "Next.js",
        "Framer Motion",
        "Tailwind CSS",
      ],
      description:
        "Personal portfolio showcasing Shopify, React, WordPress, and frontend development projects with a premium UI, smooth animations, and SEO-focused architecture.",
      link: "https://www.epicwebtechno.com/",
      year: "2023",
    },
    {
      title: "Pltdaddy",
      image: "/projects/pltdaddy.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://pltdaddy.com",
      year: "2024",
    },
    {
      title: "Hootyballoo",
      image: "/projects/hootyballoo.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://www.clubgreen.com/",
      year: "2023",
    },
    {
      title: "Italiving",
      image: "/projects/italiving.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://italiving.de/",
      year: "2023",
    },
    {
      title: "8000kicks",
      image: "/projects/8000kick.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://www.8000kicks.com/",
      year: "2023",
    },
    {
      title: "Rouki",
      image: "/projects/rouki.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
      description:
        "Developed multiple production Shopify stores with custom sections, metafields, promotional features, responsive layouts, and performance optimization for international clients.",
      link: "https://rouki.ca/",
      year: "2023",
    },
    {
      title: "Manonsimard",
      image: "/projects/manonsimard.webp",
      stack: "Shopify",
      tags: [
        "Shopify",
        "Liquid",
        "GraphQL",
        "Performance",
      ],
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
  ],
};
