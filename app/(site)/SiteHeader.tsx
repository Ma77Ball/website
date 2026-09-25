"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "./content";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const path = usePathname();
  return (
    <div className="header-band">
      <header className="site-header-inner">
        <Link className="brand" href="/">
          Matthew Ball
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href ? "active" : ""}>
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </header>
    </div>
  );
}
