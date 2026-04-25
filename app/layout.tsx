import React from "react";
import localFont from "next/font/local";
import "./globals.css";

// Font imports
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Export metadata
export const metadata = {
  title: "Jonas Söderholm Portfolio",
  description: "A full stack web developer portfolio",
};

// Server component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <head>
        <link rel="icon" href="/ai-star.svg" />
        {/* Preload fallback background image */}
        <link rel="preload" as="image" href="/start_gradient_background.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
