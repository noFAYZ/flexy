"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Providers } from "./providers";

import {  fontLufga } from '@/config/fonts'
import { NavbarNew } from "@/components/navbar-new";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-lufga antialiased lg:px-32 md:px-24",
          fontLufga.variable
        )}
      >
       <Providers themeProps={{ attribute: "data-theme", defaultTheme: "system" }}>
    
                <NavbarNew />
                {children}</Providers>
      </body>
    </html>
  );
}
