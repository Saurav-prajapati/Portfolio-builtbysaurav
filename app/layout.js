import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";
import { siteConfig } from "@/lib/siteConfig";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },

  // ── Primary ──
  title: {
    default: `${siteConfig.name} – ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,

  // ── Keywords & Author ──
  keywords: [
    "Shopify developer Delhi",
    "frontend developer India",
    "React developer",
    "Next.js developer",
    "WordPress developer",
    "Shopify store development",
    "freelance web developer",
    "website performance optimization",
    "custom Shopify themes",
    "React frontend",
    "UI/UX developer",
    "Saurav Prajapati",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],

  // ── Canonical & Robots ──
  metadataBase: new URL(siteConfig.siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.role}`,
    description: siteConfig.tagline,
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} – ${siteConfig.role}`,
      },
    ],
  },

  // ── Twitter ──
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – ${siteConfig.role}`,
    description: siteConfig.tagline,
    images: [`${siteConfig.siteUrl}/og-image.png`],
  },

  // ── Google Site Verification ──
  verification: {
    google: "2Htkow39h0rfRt2xjJres9V-OwTurGQzJgAilcFyemg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} font-body antialiased`}>
        {/* Google Tag Manager - head script (inlined via Script) */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJKFJ77H');
          `}
        </Script>

        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJKFJ77H"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <CustomCursor />
        <div className="grain-overlay" />
        <Header />
        <main className="pt-14">{children}</main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}