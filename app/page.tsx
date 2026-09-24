"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

const EDUCATION = [
  {
    period: "2024 — Present",
    title: "University of California, Irvine",
    desc: "Ph.D. & M.Sc. in Computer Science · GPA 3.9 · Advised by Prof. Chen Li.",
  },
  {
    period: "2022 — 2024",
    title: "University of California, Berkeley",
    desc: "M.Sc. in Data Science · GPA 3.96.",
  },
  {
    period: "2019 — 2022",
    title: "University of La Verne",
    desc: "B.Sc. in Computer Science · GPA 3.98 · Summa Cum Laude, Honors Degree, Departmental Honors.",
  },
];

const RESEARCH = [
  {
    period: "2025 — Present",
    title: "AI & Data Workflow Benchmark Suite",
    desc: "Designing a system-agnostic benchmark for dataflow, training, inference, and RAG pipelines with standardized workloads and metrics.",
    tags: ["Benchmarking", "RAG", "MLSys"],
  },
  {
    period: "2025 — Present",
    title: "Efficient On-Device LLM Adaptation",
    desc: "Tooling for local LLM fine-tuning (SFT, LoRA) and knowledge distillation — cutting cloud-inference cost while preserving privacy.",
    tags: ["LLMs", "LoRA / SFT", "Distillation"],
  },
  {
    period: "2023 — 2025",
    title: "Semantic Search & Vector Retrieval for Mission-Critical IR",
    desc: "Benchmarked Microsoft Semantic Kernel and Elasticsearch against production vector search for low-latency retrieval (U.S. Department of Defense).",
    tags: ["Vector Search", "Elasticsearch", "IR"],
  },
  {
    period: "2022 — 2023",
    title: "Reinforcement Learning for Text-to-SQL & Query Optimization",
    desc: "Applied Q-learning and reward shaping to improve text-to-SQL generation and query-plan optimization.",
    tags: ["RL", "Text-to-SQL", "Databases"],
  },
];

const PROJECTS = [
  {
    title: "Apache Texera (incubating) — Core Contributor",
    desc: "162+ merged PRs to a distributed, browser-based data-science platform — backend performance (Postgres pooling), full-stack UI, and CI tooling. Building a columnar Apache Arrow vectorized execution engine.",
    tags: ["Scala", "Python", "TypeScript"],
    href: "https://github.com/apache/texera",
  },
  {
    title: "Apache Spark — Contributor",
    desc: "Patches to Spark SQL, GraphX, and Spark Connect, including error-condition naming (SPARK-58xxx) and test-port hardening.",
    tags: ["Scala", "Spark SQL", "GraphX"],
    href: "https://github.com/apache/spark",
  },
  {
    title: "Python-to-Dataflow Compiler",
    desc: "Lowers imperative Python ML code into distributed Texera workflows.",
    tags: ["Python", "Compilers", "Dataflow"],
    href: "https://github.com/Ma77Ball",
  },
  {
    title: "This site",
    desc: "A fast, accessible Next.js site with a two-column layout and a cursor spotlight. Source is public.",
    tags: ["Next.js", "TypeScript", "CSS"],
    href: "https://github.com/Ma77Ball/website",
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C++", "Java", "TypeScript", "JavaScript", "SQL", "R", "LaTeX"] },
  { group: "AI / ML", items: ["PyTorch", "Hugging Face", "LangChain", "scikit-learn", "RAG", "Fine-tuning (SFT/LoRA)"] },
  { group: "Data & Retrieval", items: ["Apache Spark", "BigQuery", "PostgreSQL / pgvector", "Elasticsearch", "FAISS", "Pinecone"] },
  { group: "Systems & Cloud", items: ["Docker", "Kubernetes", "Git", "Linux", "Google Cloud (Vertex AI, GKE)", "Azure"] },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export default function Home() {
  const [active, setActive] = useState("about");
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight ("portal")
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(94,234,212,0.06), transparent 80%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll spy for the top nav — highlight the last section past the header line
  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + 120; // just below the sticky header
      let current = NAV[0].id;
      for (const { id } of NAV) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />

      {/* ---------- Top menu ---------- */}
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">Matthew Ball</a>
          <div className="topbar-right">
            <nav className="nav" aria-label="Sections">
              {NAV.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
                  {label}
                </a>
              ))}
            </nav>
            <a className="resume-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
              Résumé
            </a>
          </div>
        </div>
      </header>

      <div className="layout" id="top">
        {/* ---------- Sidebar ---------- */}
        <header className="sidebar">
          <div>
            <img className="avatar" src="/profileImage.webp" alt="Matthew Ball" width={220} height={220} />
            <h1 className="name">Matthew Ball</h1>
            <h2 className="role">CS Ph.D. Student · UC Irvine</h2>
            <p className="tagline">
              I build AI &amp; data systems — from LLM adaptation and retrieval
              to distributed data-science platforms. Advised by Prof. Chen Li.
            </p>
          </div>

          <ul className="socials">
            <li>
              <a href="https://github.com/Ma77Ball" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a href="mailto:mgball@uci.edu" aria-label="Email">
                <MailIcon />
              </a>
            </li>
            <li>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" aria-label="Résumé (PDF)">
                <ResumeIcon />
              </a>
            </li>
          </ul>
        </header>

        {/* ---------- Content ---------- */}
        <main className="content">
          <section id="about" className="section" aria-label="About">
            <h2 className="section-label">About</h2>
            <p>
              I&apos;m a Computer Science Ph.D. student at{" "}
              <a href="https://uci.edu" target="_blank" rel="noreferrer">UC Irvine</a>,
              advised by Prof. Chen Li. Before that I earned an M.Sc. in Data
              Science at UC Berkeley and a B.Sc. in Computer Science at the
              University of La Verne (summa cum laude).
            </p>
            <p>
              My work sits at the intersection of <strong>AI</strong>,{" "}
              <strong>data systems</strong>, and the software engineering that
              makes them fast and usable — LLM adaptation, semantic retrieval,
              and distributed data-science platforms. I&apos;m an active open-source
              contributor to Apache Texera and Apache Spark.
            </p>

            <h3 className="subhead">Education</h3>
            {EDUCATION.map((item) => (
              <div key={item.title} className="card">
                <div className="card-period">{item.period}</div>
                <div>
                  <div className="card-title">{item.title}</div>
                  <p className="card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>

          <section id="research" className="section" aria-label="Research">
            <h2 className="section-label">Research</h2>
            {RESEARCH.map((item) => (
              <div key={item.title} className="card">
                <div className="card-period">{item.period}</div>
                <div>
                  <div className="card-title">{item.title}</div>
                  <p className="card-desc">{item.desc}</p>
                  <div className="tags">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section id="projects" className="section" aria-label="Projects">
            <h2 className="section-label">Open Source & Projects</h2>
            {PROJECTS.map((p, i) => (
              <a
                key={i}
                className="card"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <div className="card-period" aria-hidden="true" />
                <div>
                  <div className="card-title">
                    {p.title} <span className="arrow">↗</span>
                  </div>
                  <p className="card-desc">{p.desc}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </section>

          <section id="skills" className="section" aria-label="Skills">
            <h2 className="section-label">Skills</h2>
            {SKILLS.map((s) => (
              <div key={s.group} className="card">
                <div className="card-period">{s.group}</div>
                <div className="tags">
                  {s.items.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}

            <p className="footer-note">
              © {new Date().getFullYear()} Matthew Ball · Built with Next.js ·{" "}
              <a href="https://github.com/Ma77Ball/website">Source on GitHub</a>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
