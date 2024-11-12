"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Providers } from "./providers";

import {  fontLufga } from '@/config/fonts'
import { NavbarNew } from "@/components/navbar-new";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Analytics } from "@vercel/analytics/react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const FadedBackground = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-yellow-500" />
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle, #ffffff33 1px, transparent 1px)`,
      backgroundSize: '30px 30px'
    }} />
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/90" />
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <head>
     
         
    
      </head >
      <body
        className={cn(
          "min-h-screen bg-background font-lufga antialiased  ",
          fontLufga.variable
        )}
      >
        <Providers themeProps={{ attribute: "data-theme", defaultTheme: "dark" }}>
          <>
            <FadedBackground />
            <NavbarNew />
            {children}
          </>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}



