import ServicePageClient from "@/components/ServicePageClient";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = siteConfig.serviceinner.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} – ${siteConfig.name}`,
    description: service.description,
  };
}

export default function ServicePage({ params }) {
  return <ServicePageClient params={params} />;
}