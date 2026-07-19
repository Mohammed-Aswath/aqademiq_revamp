import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AppProvider, COMFORT_NO_FLASH_SCRIPT } from "@/components/site/AppProvider";
import { GetAppModal } from "@/components/site/GetAppModal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aqademiq — the calm study planner that helps you actually start",
    template: "%s · Aqademiq",
  },
  description:
    "Aqademiq is a calm study planner that helps students actually start — focus soundscapes, a melting-cube timer, and an AI that breaks the work down.",
  applicationName: "Aqademiq",
  openGraph: {
    type: "website",
    siteName: "Aqademiq",
    url: SITE_URL,
    title: "Aqademiq — the calm study planner that helps you actually start",
    description:
      "Focus soundscapes, a melting-cube timer, and an AI that breaks the work down. The enemy is the not-starting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqademiq — the calm study planner that helps you actually start",
    description:
      "Focus soundscapes, a melting-cube timer, and an AI that breaks the work down.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Apply saved comfort settings before first paint (no FOUC). */}
        <script dangerouslySetInnerHTML={{ __html: COMFORT_NO_FLASH_SCRIPT }} />
        <AppProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <GetAppModal />
        </AppProvider>
      </body>
    </html>
  );
}
