import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/siteConfig";
import { sections } from "@/lib/sections";

export default function sitemap() {
  const baseUrl = "https://builtbysaurav.in";

  // Dynamic service pages
  const services = siteConfig.serviceinner || siteConfig.services || [];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic blog pages
  const blogPages = blogPosts.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic section pages
  const sectionPages = sections.map((s) => ({
    url: `${baseUrl}/sections/${s.slug}`,
    lastModified: new Date(s.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Legal / policy pages
  const policyPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Dynamic service pages
    ...servicePages,

    // Dynamic blog pages
    ...blogPages,
    
    // Dynamic section pages
    ...sectionPages,

    // Legal / policy pages
    ...policyPages,

  ];
}