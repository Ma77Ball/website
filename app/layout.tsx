import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Ball — CS Ph.D. @ UC Irvine",
  description:
    "Matthew Ball — Computer Science Ph.D. student at UC Irvine working on AI & data systems, LLM adaptation, and retrieval. Apache Texera & Spark contributor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
