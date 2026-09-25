import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESEARCH, PROJECTS, WorkDetail } from "../../content";

const ALL = [...PROJECTS, ...RESEARCH];

export function generateStaticParams() {
  return ALL.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = ALL.find((w) => w.slug === params.slug);
  return { title: item ? `${item.title} - Matthew Ball` : "Code - Matthew Ball" };
}

export default function CodeDetailPage({ params }: { params: { slug: string } }) {
  const item = ALL.find((w) => w.slug === params.slug);
  if (!item) notFound();
  return <WorkDetail item={item} backHref="/code" backLabel="Code" />;
}
