// import { Session } from "next-auth";
// import { getServerSession } from "next-auth/next";
import { env } from "@/env.js";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";

import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { absoluteUrl } from "@/lib/utils";
import Provider from "./provider";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["nextjs", "react", "drizzle", "postgresql", "shadecn", "tailwind"],
  authors: [
    {
      name: "Subha Sundar Das",
      url: "https://www.subha.com",
    },
  ],
  creator: "sadmann7",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@subha",
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session: Session | null = await getServerSession(authOptions);

  return (
    <Provider>
      <section>
        {children}
        <Toaster position="top-right" />
        <TailwindIndicator />
      </section>
    </Provider>
  );
}
