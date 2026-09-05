import type { Metadata } from "next";
import { Public_Sans, Figtree } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";
import { siteUrl } from "@/lib/site";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-public-sans",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gems of Drogheda",
    template: "%s · Gems of Drogheda",
  },
  description: "Gems of Drogheda — the business directory & community quest for Drogheda.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 60 } });

  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-muted">
        {settings ? <SiteHeader settings={settings} /> : null}
        <main className="flex flex-1 flex-col items-center">{children}</main>
        {settings ? <SiteFooter settings={settings} /> : null}
      </body>
    </html>
  );
}
