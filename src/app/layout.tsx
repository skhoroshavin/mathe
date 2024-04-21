import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./normalize.css"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mathe",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`container ${inter.className}`}>{children}</body>
    </html>
  );
}
