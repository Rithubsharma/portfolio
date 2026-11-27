import type { Metadata, Viewport } from "next";
import { Anybody, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { personal } from "@/lib/data";
import { asset, SITE_URL as siteUrl } from "@/lib/site";
import "./globals.css";

// Display face: the width axis is the site's motion language.
const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
  display: "swap",
});

const title = "Rishav Sharma, backend engineer";
const socialImage = {
  url: `${siteUrl}/brand/og.png`,
  width: 1200,
  height: 630,
  alt: "Rishav Sharma, backend engineer. Systems that stay in step.",
};
const description =
  "Rishav Sharma is a Software Development Engineer at GoDaddy in Bangalore, building distributed systems in Go and Java. Previously DP World. IIT Roorkee graduate.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Rishav Sharma" },
  description,
  keywords: [
    "Rishav Sharma",
    "software development engineer",
    "backend engineer",
    "distributed systems",
    "Go",
    "Java",
    "Kafka",
    "AWS",
    "GoDaddy",
    "IIT Roorkee",
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: personal.name,
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  icons: { icon: [{ url: asset("/brand/icon.png"), type: "image/png", sizes: "32x32" }] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceeea" },
    { media: "(prefers-color-scheme: dark)", color: "#08262a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  jobTitle: personal.role,
  worksFor: { "@type": "Organization", name: personal.company },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology, Roorkee",
  },
  email: personal.email,
  sameAs: [personal.githubUrl, personal.linkedinUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anybody.variable} ${instrumentSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Scroll reveals start hidden; without scripts, show everything. */}
        <noscript>
          <style>{`[data-inview="false"],[data-inview="false"] *{opacity:1!important;transform:none!important}.scrub-word{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
