import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";

import {NuqsAdapter} from "nuqs/adapters/next/app"
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "sonner"

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Docify",
  description: "A collaborative cloud docs space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
      <NuqsAdapter >
        <ConvexClientProvider>
          <Toaster />
          {children}
        </ConvexClientProvider>
      </NuqsAdapter>
      </body>
    </html>
  );
}
