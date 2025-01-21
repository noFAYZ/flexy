"use client"
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import {  fontLufga } from '@/config/fonts'
import { NavbarNew } from "@/components/navbar-new";
import { Analytics } from "@vercel/analytics/react"
import { PageContainer } from "@/components/layout/page-container";
import Sidebar from "@/components/layout/sidebar-new";
import { usePathname } from "next/navigation";

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

const layoutConfigs = {
    // Routes with both sidebar and navbar
    dashboard: {
      paths: ['/dashboard', '/jobs', '/contracts', '/wallet','/inbox', '/projects','/user'],
      showSidebar: true,
      showNavbar: true,
    },
    // Routes with only navbar
    public: {
      paths: ['/blog', '/pricing', '/about'],
      showSidebar: false,
      showNavbar: true,
    },
    // Routes with neither (landing pages, auth pages)
    minimal: {
      paths: ['/login', '/register', '/auth'],
      showSidebar: false,
      showNavbar: false,
    },
  } as const;
  


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

 // Determine the layout configuration based on the current path
 const getLayoutConfig = (currentPath: string) => {
  // Find the matching layout configuration
  for (const [_, config] of Object.entries(layoutConfigs)) {
    if (config.paths.some(path => currentPath?.startsWith(path))) {
      return config;
    }
  }
  // Default to minimal layout if no match is found
  return layoutConfigs.minimal;
};

const currentLayout = getLayoutConfig(pathname);

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
            <div className="flex min-h-screen">
              {/* Left Sidebar - Show based on navigation preference and screen size */}
             
              {currentLayout.showSidebar && (
                <div className="hidden md:block">
                  <Sidebar />
                </div>
              )}
              

              {/* Main Content */}
              <PageContainer>
                {/* Show navbar based on navigation preference */}
                <NavbarNew isSidebar={currentLayout.showSidebar} />
                {children}
              </PageContainer>
            </div>
          </>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}



