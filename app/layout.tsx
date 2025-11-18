import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KidOS - Kid-Safe Operating System",
  description: "A containerized browser-based operating system with kid-safe features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
