import type { ReactNode } from "react";
import "./globals.css";
export const metadata = { title: "Live Better", description: "Live better. Live simple." };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
