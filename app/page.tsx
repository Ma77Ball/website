const links = [
  {
    title: "GitHub",
    desc: "Code, projects, and experiments.",
    href: "https://github.com/Ma77Ball",
  },
  {
    title: "Research",
    desc: "CS PhD @ UC Irvine.",
    href: "#",
  },
  {
    title: "Contact",
    desc: "Get in touch.",
    href: "mailto:matthewball820@gmail.com",
  },
];

export default function Home() {
  return (
    <main>
      <p className="eyebrow">Personal site</p>
      <h1>Matthew Ball</h1>
      <p className="lead">
        CS PhD student at UC Irvine. I build systems, tinker with self-hosted
        infrastructure, and work on data &amp; AI. This is my corner of the
        internet — edit it any time by pushing to the repo.
      </p>

      <div className="grid">
        {links.map((l) => (
          <a
            key={l.title}
            className="card"
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <h3>{l.title}</h3>
            <p>{l.desc}</p>
          </a>
        ))}
      </div>

      <footer>
        <span>© {new Date().getFullYear()} Matthew Ball</span>
        <a href="https://github.com/Ma77Ball/website">Source on GitHub</a>
      </footer>
    </main>
  );
}
