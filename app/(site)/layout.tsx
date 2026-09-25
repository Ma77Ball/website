import { SiteHeader } from "./SiteHeader";
import { Socials, Squiggle } from "./content";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="page">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <span className="footer-title">Find Me</span>
            <Squiggle />
          </div>
          <Socials />
        </div>
      </footer>
    </>
  );
}
