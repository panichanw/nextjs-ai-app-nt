import { Suspense } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Bungee, Work_Sans, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Navbar from "@/components/navbar";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-arcade-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-arcade-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบ E-Commerce",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "font-sans",
        bungee.variable,
        workSans.variable,
        spaceMono.variable
      )}
    >
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Navbar />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
