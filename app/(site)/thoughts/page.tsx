import type { Metadata } from "next";
import Link from "next/link";
import { Squiggle } from "../content";
import { Reveal, Cover, TiltCard } from "../anim";
import { getAllPosts, formatDate } from "./posts";

export const metadata: Metadata = {
  title: "Thoughts - Matthew Ball",
  description: "Writing and notes by Matthew Ball on AI, data systems, and building software.",
};

export default function ThoughtsPage() {
  const posts = getAllPosts();
  const total = String(posts.length).padStart(2, "0");

  return (
    <>
      <header className="page-hero">
        <h1 className="page-title">
          Thoughts
          <Squiggle />
        </h1>
        <p className="page-sub">Writing and notes on AI, data systems, and building software.</p>
      </header>

      <section className="home-section">
        {posts.length === 0 ? (
          <Reveal>
            <div className="thoughts-empty">
              <span className="thoughts-empty-badge">Coming soon</span>
              <p className="thoughts-empty-text">
                No posts yet - writing is on the way. Check back soon.
              </p>
            </div>
          </Reveal>
        ) : (
        <div className="tcards">
          {posts.map((t, i) => {
            const cover = typeof t.cover === "number" ? t.cover : i % 3;
            return (
              <Reveal key={t.slug} y={30} delay={(i % 3) * 0.08 + Math.floor(i / 3) * 0.06}>
                <TiltCard>
                  <Link className="tcard" href={`/thoughts/${t.slug}`}>
                    <div className="tcard-cover">
                      <Cover>
                        <div className={`tcard-cover-bg cover-${cover}`} />
                      </Cover>
                      <span className="tcard-tag">{t.tag}</span>
                      <span className="tcard-num">
                        TH.{String(i + 1).padStart(2, "0")} / {total}
                      </span>
                      <span className="tcard-read">Read →</span>
                    </div>
                    <div className="tcard-body">
                      <span className="tcard-date">{formatDate(t.date)}</span>
                      <h2 className="tcard-title">{t.title}</h2>
                      <p className="tcard-excerpt">{t.excerpt}</p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        )}
      </section>
    </>
  );
}
