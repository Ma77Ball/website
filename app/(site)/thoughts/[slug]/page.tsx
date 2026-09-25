import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "../../anim";
import { getAllPosts, getPost, formatDate } from "../posts";

type Params = { params: { slug: string } };

// Pre-render a static page for every markdown file at build time.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found - Matthew Ball" };
  return {
    title: `${post.title} - Matthew Ball`,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <Reveal>
      <article className="post">
        <Link className="post-back" href="/thoughts">
          ← All thoughts
        </Link>
        <div className="post-meta">
          <span className="post-tag">{post.tag}</span>
          <span className="post-date">{formatDate(post.date)}</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-body prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Reveal>
  );
}
