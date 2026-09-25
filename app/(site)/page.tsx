import Link from "next/link";
import { Card, Squiggle, Socials, ToolLogos, RESEARCH, PROJECTS } from "./content";
import { Education } from "./Education";
import { Reveal, Annotate } from "./anim";

export default function Home() {
  const highlights = [
    { item: PROJECTS[0], base: "/code" },
    { item: PROJECTS[1], base: "/code" },
    { item: RESEARCH[0], base: "/code" },
    { item: RESEARCH[1], base: "/code" },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1 className="greeting">
            Hey, I&apos;m Matthew.
            <Squiggle />
          </h1>
          <p className="subtitle">
            I am a <Annotate><em>computer scientist</em></Annotate>,{" "}
            <Annotate><em>systems engineer</em></Annotate>, and{" "}
            <Annotate><em>open-source contributor</em></Annotate> based in Irvine, CA.
          </p>
          <p className="prose">
            My passions lie at the intersection of AI, data systems, and the
            software engineering that makes them fast and usable. I spend most of
            my time researching and building tools for LLM adaptation, semantic
            retrieval, and distributed data-science platforms.
          </p>
          <Socials />
        </div>
        <img className="hero-photo" src="/profileImage.webp" alt="Matthew Ball" width={320} height={320} />
      </section>

      {/* Signature skewed gradient band */}
      <Reveal>
        <section className="band">
          <div className="band-inner">
            <h2 className="section-title on-band">
              What I&apos;m up to
              <Squiggle />
            </h2>
            <p className="on-band-text">
              A Ph.D. student at UC Irvine advised by Prof. Chen Li, and an active
              contributor to Apache Texera and Apache Spark. A few things I&apos;ve
              been working on lately:
            </p>
            <div className="cards">
              {highlights.map(({ item, base }) => (
                <Card key={item.slug} item={item} base={base} />
              ))}
            </div>
            <p className="see-all">
              <Link href="/code">All code →</Link>
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="home-section">
          <h2 className="section-title">
            Education
            <Squiggle />
          </h2>
          <Education />
        </section>
      </Reveal>

      <Reveal>
        <section className="band band-alt">
          <div className="band-inner">
            <h2 className="section-title on-band">
              Tools I work with
              <Squiggle />
            </h2>
            <ToolLogos />
          </div>
        </section>
      </Reveal>
    </>
  );
}
