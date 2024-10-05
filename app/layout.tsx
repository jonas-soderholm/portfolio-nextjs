// app/layout.tsx
// "use client";

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

// Export metadata (this must be in a server component)
export const metadata = {
  title: "Next.js Portfolio",
  description: "A portfolio app using Next.js and Dark Mode",
};

// Server component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
