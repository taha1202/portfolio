import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Grain from "@/components/motion/Grain";
import { NO_FLASH_SCRIPT } from "@/lib/theme";
import { site } from "@/lib/site";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadtaha.dev"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Software engineer working on AI systems and backend infrastructure. Agent runtimes, document extraction pipelines, and applied machine learning.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Software engineer working on AI systems and backend infrastructure.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#211f1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Sets data-theme before first paint. Must stay inline and blocking. */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <Cursor />
          <Grain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
