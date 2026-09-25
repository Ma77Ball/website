// Shared content + presentational pieces for the site pages.
import Link from "next/link";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/code", label: "Code" },
  { href: "/thoughts", label: "Thoughts" },
];

export const STATS = [
  { num: "162+", label: "Merged pull requests" },
  { num: "2", label: "Apache projects" },
  { num: "6", label: "Projects shipped" },
  { num: "3", label: "Years in open source" },
];

export type School = {
  period: string;
  school: string;
  logo: string; // file in /logos
  degree: string;
  detail: string;
  accent: string;
};

export const EDUCATION: School[] = [
  {
    period: "2024 - Present",
    school: "University of California, Irvine",
    logo: "school-uci",
    degree: "Ph.D. & M.Sc. in Computer Science",
    detail: "GPA 3.9 · Advised by Prof. Chen Li. Research in AI & data systems.",
    accent: "#0064A4",
  },
  {
    period: "2022 - 2024",
    school: "University of California, Berkeley",
    logo: "school-berkeley",
    degree: "M.Sc. in Data Science",
    detail: "GPA 3.96 · Focus on machine learning and large-scale data.",
    accent: "#d4a017",
  },
  {
    period: "2019 - 2022",
    school: "University of La Verne",
    logo: "school-laverne",
    degree: "B.Sc. in Computer Science",
    detail: "GPA 3.98 · Summa Cum Laude, Honors Degree, Departmental Honors.",
    accent: "#14522D",
  },
];

export const TOOLS = [
  {
    group: "Languages",
    items: [
      { name: "Python", file: "python" },
      { name: "C++", file: "cpp" },
      { name: "Java", file: "java" },
      { name: "TypeScript", file: "typescript" },
      { name: "JavaScript", file: "javascript" },
      { name: "R", file: "r" },
      { name: "LaTeX", file: "latex" },
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      { name: "PyTorch", file: "pytorch" },
      { name: "Hugging Face", file: "huggingface" },
      { name: "LangChain", file: "langchain" },
      { name: "scikit-learn", file: "scikitlearn" },
      { name: "Apache Spark", file: "spark" },
      { name: "BigQuery", file: "bigquery" },
      { name: "PostgreSQL", file: "postgresql" },
      { name: "Elasticsearch", file: "elasticsearch" },
      { name: "Docker", file: "docker" },
      { name: "Kubernetes", file: "kubernetes" },
      { name: "Git", file: "git" },
      { name: "Linux", file: "linux" },
      { name: "Google Cloud", file: "googlecloud" },
      { name: "Azure", file: "azure" },
    ],
  },
];

// Thoughts posts now live as markdown files in `content/thoughts/`.
// See `app/(site)/thoughts/posts.ts` for the loader.

export type Item = {
  slug: string;
  title: string;
  desc: string;
  overview: string[];
  period?: string;
  tags: string[];
  link?: string; // external (e.g. GitHub)
};

export const RESEARCH: Item[] = [
  {
    slug: "ai-data-workflow-benchmark",
    period: "2025 - Present",
    title: "AI & Data Workflow Benchmark Suite",
    desc: "A system-agnostic benchmark for dataflow, training, inference, and RAG pipelines with standardized workloads and metrics.",
    overview: [
      "Modern AI and data platforms are notoriously hard to compare - every system ships its own workloads, metrics, and harness. This project designs a system-agnostic benchmark that measures dataflow, training, inference, and RAG pipelines under standardized conditions.",
      "The goal is an apples-to-apples view of throughput, latency, and cost across engines, so practitioners can choose the right tool for a workload with evidence rather than folklore.",
    ],
    tags: ["Benchmarking", "RAG", "MLSys"],
  },
  {
    slug: "on-device-llm-adaptation",
    period: "2025 - Present",
    title: "Efficient On-Device LLM Adaptation",
    desc: "Tooling for local LLM fine-tuning (SFT, LoRA) and knowledge distillation - cutting cloud-inference cost while preserving privacy.",
    overview: [
      "Sending data to the cloud for every fine-tune or inference is expensive and often a privacy non-starter. This work builds tooling for adapting LLMs locally with supervised fine-tuning, LoRA, and knowledge distillation.",
      "The result is smaller, cheaper models that keep sensitive data on-device while retaining most of the capability of their larger teachers.",
    ],
    tags: ["LLMs", "LoRA / SFT", "Distillation"],
  },
  {
    slug: "semantic-search-retrieval",
    period: "2023 - 2025",
    title: "Semantic Search & Vector Retrieval for Mission-Critical IR",
    desc: "Benchmarked Microsoft Semantic Kernel and Elasticsearch against production vector search for low-latency retrieval (U.S. DoD).",
    overview: [
      "Mission-critical information retrieval needs both relevance and predictable low latency. This project benchmarked Microsoft Semantic Kernel and Elasticsearch against production vector search on realistic workloads for the U.S. Department of Defense.",
      "The evaluation surfaced concrete trade-offs between recall, latency, and operational complexity that informed the retrieval architecture.",
    ],
    tags: ["Vector Search", "Elasticsearch", "IR"],
  },
  {
    slug: "rl-text-to-sql",
    period: "2022 - 2023",
    title: "Reinforcement Learning for Text-to-SQL & Query Optimization",
    desc: "Applied Q-learning and reward shaping to improve text-to-SQL generation and query-plan optimization.",
    overview: [
      "Translating natural language into correct, efficient SQL is hard when supervision is sparse. This project applied Q-learning and reward shaping to improve both text-to-SQL generation and downstream query-plan optimization.",
      "Rewards tied to execution correctness and plan cost nudged the model toward queries that are not only right but fast.",
    ],
    tags: ["RL", "Text-to-SQL", "Databases"],
  },
];

export const PROJECTS: Item[] = [
  {
    slug: "apache-texera",
    title: "Apache Texera (incubating)",
    desc: "Core contributor - 162+ merged PRs to a distributed, browser-based data-science platform: backend performance, full-stack UI, CI tooling, and a columnar Apache Arrow vectorized execution engine.",
    overview: [
      "Apache Texera is a distributed, browser-based platform for collaborative, workflow-driven data science. As a core contributor I've landed 162+ merged pull requests across the stack.",
      "That work spans backend performance (Postgres connection pooling), full-stack UI features, and CI tooling - plus building a columnar Apache Arrow vectorized execution engine to speed up operator processing.",
    ],
    tags: ["Scala", "Python", "TypeScript"],
    link: "https://github.com/apache/texera",
  },
  {
    slug: "apache-spark",
    title: "Apache Spark",
    desc: "Contributor - patches to Spark SQL, GraphX, and Spark Connect, including error-condition naming (SPARK-58xxx) and test-port hardening.",
    overview: [
      "Apache Spark is the unified analytics engine for large-scale data processing. My contributions touch Spark SQL, GraphX, and Spark Connect.",
      "Recent patches include error-condition naming (SPARK-58xxx) for clearer diagnostics and test-port hardening to reduce flaky CI.",
    ],
    tags: ["Scala", "Spark SQL", "GraphX"],
    link: "https://github.com/apache/spark",
  },
];

export const SKILLS = [
  { group: "Languages", items: ["Python", "C++", "Java", "TypeScript", "JavaScript", "SQL", "R", "LaTeX"] },
  { group: "AI / ML", items: ["PyTorch", "Hugging Face", "LangChain", "scikit-learn", "RAG", "Fine-tuning (SFT/LoRA)"] },
  { group: "Data & Retrieval", items: ["Apache Spark", "BigQuery", "PostgreSQL / pgvector", "Elasticsearch", "FAISS", "Pinecone"] },
  { group: "Systems & Cloud", items: ["Docker", "Kubernetes", "Git", "Linux", "Google Cloud (Vertex AI, GKE)", "Azure"] },
];

/** Grid of tool logos, grouped, like the reference site. */
export function ToolLogos() {
  return (
    <div className="tool-groups">
      {TOOLS.map((g) => (
        <div key={g.group} className="tool-group">
          <h3 className="tool-group-title">{g.group}</h3>
          <div className="logo-grid">
            {g.items.map((t) => (
              <div key={t.name} className="logo-tile" title={t.name}>
                <img src={`/logos/${t.file}.svg`} alt={t.name} width={42} height={42} loading="lazy" />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Signature 5-color chevron underline that sits after a heading. */
export function Squiggle() {
  return (
    <svg className="squiggle" width="105" height="10" viewBox="0 0 105 10" aria-hidden="true">
      <path d="M5,0 L25,0 L20,10 L0,10 z" fill="#FBFDD7" />
      <path d="M25,0 L45,0 L40,10 L20,10 z" fill="#FCEB71" />
      <path d="M45,0 L65,0 L60,10 L40,10 z" fill="#FCBB45" />
      <path d="M65,0 L85,0 L80,10 L60,10 z" fill="#FC9A59" />
      <path d="M85,0 L105,0 L100,10 L80,10 z" fill="#F24B4B" />
    </svg>
  );
}


/** A box/card that links to the item's own detail page under `base`. */
export function Card({ item, base }: { item: Item; base: string }) {
  return (
    <Link className="card" href={`${base}/${item.slug}`}>
      <div className="card-top">
        <h3 className="card-title">
          {item.title} <span className="arrow">→</span>
        </h3>
        {item.period && <span className="card-meta">{item.period}</span>}
      </div>
      <p className="card-desc">{item.desc}</p>
      <div className="tags">
        {item.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </Link>
  );
}

/** Detail ("work") page body for a research item or project. */
export function WorkDetail({
  item,
  backHref,
  backLabel,
}: {
  item: Item;
  backHref: string;
  backLabel: string;
}) {
  return (
    <>
      <header className="page-hero">
        <Link className="back-link" href={backHref}>
          ← {backLabel}
        </Link>
        <h1 className="page-title">
          {item.title}
          <Squiggle />
        </h1>
        {item.period && <p className="page-sub">{item.period}</p>}
      </header>

      <section className="home-section">
        <div className="tags detail-tags">
          {item.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        {item.overview.map((p, i) => (
          <p key={i} className="prose">{p}</p>
        ))}
        {item.link && (
          <p>
            <a className="cta-link" href={item.link} target="_blank" rel="noreferrer">
              View on GitHub ↗
            </a>
          </p>
        )}
      </section>
    </>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export function Socials() {
  return (
    <ul className="socials">
      <li>
        <a href="https://github.com/Ma77Ball" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
      </li>
      <li>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" aria-label="Résumé (PDF)">
          <ResumeIcon />
        </a>
      </li>
      <li>
        <a href="mailto:mgball@uci.edu" aria-label="Email">
          <MailIcon />
        </a>
      </li>
    </ul>
  );
}
