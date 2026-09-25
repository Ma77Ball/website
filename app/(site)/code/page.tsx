import type { Metadata } from "next";
import Link from "next/link";
import { Squiggle, STATS, RESEARCH, PROJECTS } from "../content";
import { Reveal } from "../anim";

export const metadata: Metadata = {
  title: "Code - Matthew Ball",
  description: "Open-source work, contributions, and projects by Matthew Ball.",
};

// Re-fetch the live GitHub data at most once an hour.
export const revalidate = 3600;

const GH_USER = "Ma77Ball";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Scala: "#c22d40",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
};

type RepoData = {
  name: string;
  url: string;
  desc: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  logo: string;
};

const REPOS = [
  {
    owner: "apache",
    repo: "texera",
    logo: "texera-icon.png",
    fallback: { desc: PROJECTS[0].desc, language: "Scala", stars: 0, forks: 0, topics: ["data-science", "workflow", "distributed-systems"] },
  },
  {
    owner: "apache",
    repo: "spark",
    logo: "spark-logo.png",
    fallback: { desc: PROJECTS[1].desc, language: "Scala", stars: 0, forks: 0, topics: ["big-data", "sql", "spark", "scala"] },
  },
];

// Dark "app-window" project cards, driven by the research items.
const STACKS: Record<string, { name: string; file: string }[]> = {
  "ai-data-workflow-benchmark": [
    { name: "Python", file: "python" },
    { name: "PyTorch", file: "pytorch" },
  ],
  "on-device-llm-adaptation": [
    { name: "Python", file: "python" },
    { name: "PyTorch", file: "pytorch" },
    { name: "Hugging Face", file: "huggingface" },
  ],
  "semantic-search-retrieval": [
    { name: "Python", file: "python" },
    { name: "Elasticsearch", file: "elasticsearch" },
  ],
  "rl-text-to-sql": [{ name: "Python", file: "python" }],
};

function fmt(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

async function getRepo(owner: string, repo: string, logo: string, fallback: (typeof REPOS)[number]["fallback"], token?: string): Promise<RepoData> {
  const base = { name: repo, url: `https://github.com/${owner}/${repo}`, logo };
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github+json", ...(token ? { Authorization: `bearer ${token}` } : {}) },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("bad status");
    const j = await res.json();
    return {
      ...base,
      url: j.html_url ?? base.url,
      desc: j.description ?? fallback.desc,
      language: j.language ?? fallback.language,
      stars: j.stargazers_count ?? fallback.stars,
      forks: j.forks_count ?? fallback.forks,
      topics: (j.topics?.length ? j.topics : fallback.topics).slice(0, 8),
    };
  } catch {
    return { ...base, desc: fallback.desc, language: fallback.language, stars: fallback.stars, forks: fallback.forks, topics: fallback.topics };
  }
}

async function getContributions(token?: string): Promise<{ stats: { num: string; label: string }[]; live: boolean }> {
  if (!token) return { stats: STATS, live: false };
  const query = `query($login:String!){ user(login:$login){ contributionsCollection {
    totalCommitContributions totalPullRequestContributions totalPullRequestReviewContributions totalIssueContributions
  }}}`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: GH_USER } }),
      next: { revalidate: 3600 },
    });
    const c = (await res.json())?.data?.user?.contributionsCollection;
    if (!c) return { stats: STATS, live: false };
    return {
      live: true,
      stats: [
        { num: String(c.totalCommitContributions), label: "Commits" },
        { num: String(c.totalPullRequestContributions), label: "Pull Requests" },
        { num: String(c.totalPullRequestReviewContributions), label: "Pull Request Reviews" },
        { num: String(c.totalIssueContributions), label: "Issues" },
      ],
    };
  } catch {
    return { stats: STATS, live: false };
  }
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.79L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

export default async function CodePage() {
  const token = process.env.GITHUB_TOKEN;
  const [repos, contrib] = await Promise.all([
    Promise.all(REPOS.map((r) => getRepo(r.owner, r.repo, r.logo, r.fallback, token))),
    getContributions(token),
  ]);
  const { stats, live } = contrib;

  return (
    <>
      {/* Featured Open Source */}
      <Reveal>
        <section className="home-section code-lead">
          <h2 className="section-title">
            Featured Open Source
            <Squiggle />
          </h2>
          <p className="prose">
            Contributing to open source is easily my favorite part of the work.
            Shipping improvements that other people build on, and learning from
            the maintainers who review them, never gets old.
          </p>
          <div className="featured-grid">
            {repos.map((r) => (
              <a key={r.name} className="repo-card" href={r.url} target="_blank" rel="noreferrer">
                <h3 className="repo-name">{r.name}</h3>
                <img className="repo-logo" src={`/logos/${r.logo}`} alt={r.name} />
                <p className="repo-desc">{r.desc}</p>
                <div className="repo-topics">
                  {r.topics.map((t) => (
                    <span key={t} className="repo-topic">{t}</span>
                  ))}
                </div>
                <div className="repo-footer">
                  {r.language && (
                    <span className="repo-lang" style={{ background: LANG_COLORS[r.language] ?? "#6b7280" }}>
                      {r.language}
                    </span>
                  )}
                  <div className="repo-stats">
                    <span className="repo-stat"><StarIcon /> {fmt(r.stars)}</span>
                    <span className="repo-stat"><ForkIcon /> {fmt(r.forks)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Contributions */}
      <Reveal>
        <section className="home-section contributions">
          <div className="contrib-intro">
            <h2 className="section-title">
              Contributions
              <Squiggle />
            </h2>
            <p className="prose">
              {live
                ? "My open-source contributions over the past year, pulled live from GitHub."
                : "A snapshot of my open-source work over the past year."}
            </p>
          </div>
          <div className="contrib-grid">
            {stats.map((s) => (
              <div key={s.label} className="cstat">
                <div className="cstat-numcol">
                  <span className="cstat-num">{s.num}</span>
                  <span className="cstat-dots" aria-hidden="true" />
                </div>
                <span className="cstat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="prose contrib-note">
            Beyond the numbers, most of that work lives on a handful of projects
            I genuinely care about - reviewing pull requests, mentoring
            first-time contributors, and keeping the build and tooling healthy 
	    so the next person has an easier time.           </p>
        </section>
      </Reveal>

      {/* Projects (dark app-window cards on the gradient band) */}
      <Reveal>
        <section className="band band-alt">
          <div className="band-inner">
            <h2 className="section-title on-band">
              Projects
              <Squiggle />
            </h2>
            <div className="proj-grid">
              {RESEARCH.map((p) => {
                const stack = STACKS[p.slug] ?? [];
                return (
                  <Link key={p.slug} className="proj-window" href={`/code/${p.slug}`}>
                    <div className="win-bar" aria-hidden="true">
                      <i /><i /><i />
                    </div>
                    <div className="win-preview" aria-hidden="true">
                      {stack.slice(0, 4).map((s) => (
                        <img key={s.file} src={`/logos/${s.file}.svg`} alt="" width={52} height={52} />
                      ))}
                    </div>
                    <div className="win-body">
                      <h3 className="win-name">{p.title}</h3>
                      <p className="win-desc">{p.desc}</p>
                      <div className="win-badges">
                        {stack.map((s) => (
                          <span key={s.file} className="win-badge">
                            <img src={`/logos/${s.file}.svg`} alt="" width={18} height={18} />
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
