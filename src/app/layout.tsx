import type { ReactNode } from "react";
import "./globals.css";
export const metadata = { title: "Live Better", description: "Live better. Live simple." };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior keeps smooth scrolling for in-page links (#challenge)
    // without animating every route change. Next.js 16 no longer does this itself.
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
