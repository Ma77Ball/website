import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matthew Ball - CS Ph.D. @ UC Irvine",
  description:
    "Matthew Ball - Computer Science Ph.D. student at UC Irvine working on AI & data systems, LLM adaptation, and retrieval. Apache Texera & Spark contributor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={serif.variable}>
      <body>{children}</body>
    </html>
  );
}
