import type { Metadata } from "next";
import { Squiggle, THOUGHTS } from "../content";
import { Reveal } from "../anim";

export const metadata: Metadata = {
  title: "Thoughts - Matthew Ball",
  description: "Writing and notes by Matthew Ball on AI, data systems, and building software.",
};

export default function ThoughtsPage() {
  return (
    <>
      <header className="page-hero">
        <h1 className="page-title">
          Thoughts
          <Squiggle />
        </h1>
        <p className="page-sub">Writing and notes on AI, data systems, and building software.</p>
      </header>

      <Reveal>
        <section className="home-section">
          <ul className="thoughts">
            {THOUGHTS.map((t) => (
              <li key={t.slug} className="thought">
                <span className="thought-date">{t.date}</span>
                <h2 className="thought-title">{t.title}</h2>
                <p className="thought-excerpt">{t.excerpt}</p>
              </li>
            ))}
          </ul>
          <p className="prose" style={{ marginTop: 28 }}>
            More posts coming soon.
          </p>
        </section>
      </Reveal>
    </>
  );
}
