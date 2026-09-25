import type { Metadata } from "next";
import { Squiggle, THOUGHTS } from "../content";
import { Reveal, Cover, TiltCard } from "../anim";

export const metadata: Metadata = {
  title: "Thoughts - Matthew Ball",
  description: "Writing and notes by Matthew Ball on AI, data systems, and building software.",
};

export default function ThoughtsPage() {
  const total = String(THOUGHTS.length).padStart(2, "0");

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
        <div className="tcards">
          {THOUGHTS.map((t, i) => (
            <Reveal key={t.slug} y={30} delay={(i % 3) * 0.08 + Math.floor(i / 3) * 0.06}>
              <TiltCard>
                <a className="tcard" href="#">
                  <div className="tcard-cover">
                    <Cover>
                      <div className={`tcard-cover-bg cover-${i % 3}`} />
                    </Cover>
                    <span className="tcard-tag">{t.tag}</span>
                    <span className="tcard-num">
                      TH.{String(i + 1).padStart(2, "0")} / {total}
                    </span>
                    <span className="tcard-read">Read →</span>
                  </div>
                  <div className="tcard-body">
                    <span className="tcard-date">{t.date}</span>
                    <h2 className="tcard-title">{t.title}</h2>
                    <p className="tcard-excerpt">{t.excerpt}</p>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
