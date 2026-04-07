import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClerkProvider from "../components/ConvexProviderWithClerk";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexis",
  description: "Nexis AI RAG Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ConvexClerkProvider>
            <Header />
            {children}
            <Toaster />
          </ConvexClerkProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
