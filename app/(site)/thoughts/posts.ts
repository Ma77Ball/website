import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Where the markdown posts live. To publish a post, drop a `.md` file in
// `content/thoughts/` with the frontmatter below - nothing else to wire up.
const POSTS_DIR = path.join(process.cwd(), "content", "thoughts");

export type Post = {
  slug: string; // derived from the file name (e.g. my-post.md -> "my-post")
  title: string;
  date: string; // ISO date "2026-09-25", or "" for undated / "Coming soon"
  tag: string;
  excerpt: string;
  draft: boolean;
  cover?: number; // optional gradient index (0-2) for the card cover
  html: string; // rendered post body
};

type FrontMatter = {
  title?: string;
  date?: string;
  tag?: string;
  excerpt?: string;
  draft?: boolean;
  cover?: number;
};

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const fm = data as FrontMatter;
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ? String(fm.date) : "",
    tag: fm.tag ?? "Notes",
    excerpt: fm.excerpt ?? "",
    draft: Boolean(fm.draft),
    cover: typeof fm.cover === "number" ? fm.cover : undefined,
    html: marked.parse(content, { async: false }) as string,
  };
}

/** All published (non-draft) posts, newest first. Undated posts sort last. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    // Only markdown files, skipping READMEs and underscore-prefixed helpers.
    .filter((f) => /\.mdx?$/.test(f) && f !== "README.md" && !f.startsWith("_"))
    .map(readPostFile)
    .filter((p) => !p.draft)
    .sort((a, b) => {
      if (a.date && b.date) return a.date < b.date ? 1 : -1;
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Human-friendly date for display; passes through non-ISO strings unchanged. */
export function formatDate(date: string): string {
  if (!date) return "Coming soon";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  // Format in UTC so a plain "YYYY-MM-DD" isn't shifted a day by the local zone.
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
