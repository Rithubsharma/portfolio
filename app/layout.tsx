import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourportfolio.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rishav Sharma — Software Development Engineer",
    template: "%s | Rishav Sharma",
  },
  description:
    "Software Development Engineer with 4+ years building distributed systems, cloud-native applications, and AI-powered infrastructure. IIT Roorkee graduate.",
  keywords: [
    "Rishav Sharma",
    "software development engineer",
    "backend engineer",
    "distributed systems",
    "Go engineer",
    "Java developer",
    "Kafka",
    "AWS",
    "GoDaddy",
    "IIT Roorkee",
  ],
  authors: [{ name: "Rishav Sharma", url: siteUrl }],
  creator: "Rishav Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Rishav Sharma — Software Development Engineer",
    description:
      "Software Development Engineer building distributed systems, cloud infrastructure, and AI-powered tooling.",
    siteName: "Rishav Sharma",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rishav Sharma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishav Sharma — Software Development Engineer",
    description:
      "Software Development Engineer building distributed systems, cloud infrastructure, and AI-powered tooling.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishav Sharma",
  url: siteUrl,
  jobTitle: "Software Development Engineer",
  worksFor: { "@type": "Organization", name: "GoDaddy" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology, Roorkee" },
  email: "rishavsharma3673@gmail.com",
  sameAs: [
    "https://github.com/Rithubsharma",
    "https://www.linkedin.com/in/rishav-sharma-023482188/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
