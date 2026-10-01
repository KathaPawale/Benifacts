import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import { services } from "../lib/services";
import { FooterLogo } from "./footer-logo";

// Shared page furniture: logo, header, footer and small building blocks used by the homepage and the service pages.
export function Brand() {
  return <img className="brand-logo" src="/images/benifacts-original.svg" alt="Benifacts Accountants" width={194} height={39} decoding="async" />;
}

/** Small centred section label, ARIO-style. */
export function Label({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

/** Thin crosshair rule used on cards. */
export function Cross() {
  return <span className="cross" aria-hidden="true" />;
}

export const nav: Array<[string, string]> = [["Why Benifacts", "#credibility"], ["Expertise", "#expertise"], ["Who we help", "#clients"], ["Insights", "#insights"]];

export function Header({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-locked", open);
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className={`site-header ${open ? "menu-open" : ""}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="header-inner">
      <a href={home ? "#top" : "/"} aria-label="Benifacts home" className="header-brand"><Brand /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.slice(0, 2).map(([label, href]) => <a key={href} href={base + href}>{label}</a>)}
        <div className="nav-drop">
          <button type="button" aria-haspopup="true">Services <ChevronDown size={14} aria-hidden="true" /></button>
          <div className="nav-drop-panel">{services.map((s) => <a key={s.slug} href={`/services/${s.slug}/`}>{s.name}</a>)}</div>
        </div>
        {nav.slice(2).map(([label, href]) => <a key={href} href={base + href}>{label}</a>)}
      </nav>
      <a className="header-cta" href={base + "#contact"}>Let’s talk <Plus size={15} aria-hidden="true" /></a>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <div id="mobile-menu" className="mobile-menu" hidden={!open}>
      <nav aria-label="Mobile navigation">{[...nav, ["FAQ", "#faq"] as [string, string]].map(([label, href], i) => <a key={href} href={base + href} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>)}</nav>
      <nav className="mobile-services" aria-label="Services"><small>SERVICES</small>{services.map((s) => <a key={s.slug} href={`/services/${s.slug}/`}>{s.name}</a>)}</nav>
      <a className="button-primary" href={base + "#contact"} onClick={() => setOpen(false)}>Get in touch <ArrowUpRight aria-hidden="true" /></a>
    </div>
    <div className="reading-progress" aria-hidden="true" />
  </header>;
}

export function Faq({ q, a, n, initiallyOpen }: { q: string; a: string; n: number; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return <div className={`faq-row ${open ? "is-open" : ""}`}><h3><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}><span className="faq-n">{String(n).padStart(2, "0")}</span><span className="faq-q">{q}</span>{open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</button></h3><div className="faq-answer"><div><p>{a}</p></div></div></div>;
}

/* 12 — Footer: structured columns and the oversized wordmark. */
export function Footer({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return <footer className="footer" data-tone="deep">
    <div className="shell">
      <div className="footer-top">
        <div className="footer-brand"><a href={home ? "#top" : "/"} aria-label="Benifacts home"><Brand /></a><p>Accounting and advisory<br /><em>for a world in motion.</em></p></div>
        <nav className="footer-col footer-explore" aria-label="Explore"><small>EXPLORE</small>{[...nav, ["Case study", "#case-study"], ["FAQ", "#faq"]].map(([label, href]) => <a key={href} className="footer-link" href={base + href}>{label}</a>)}</nav>
        <nav className="footer-col footer-connect" aria-label="Connect"><small>CONNECT</small><a className="footer-link" href={base + "#contact"}>Get in touch</a><a className="footer-link" href="mailto:info@benifactscpa.com">Email us</a><a className="footer-link" href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy">Privacy Policy</a><a className="footer-link" href="https://www.linkedin.com/company/benifacts-accountants-uk/" target="_blank" rel="noreferrer">LinkedIn</a><a className="footer-link" href="https://www.benifacts.co.uk/" target="_blank" rel="noreferrer">UK website</a><a className="footer-link" href="https://www.benifactscpa.com/" target="_blank" rel="noreferrer">US website</a></nav>
        <dl className="footer-col footer-contacts"><small>CONTACTS</small><div><dt>DIRECT CONTACT</dt><dd><a href="mailto:info@benifactscpa.com">info@benifactscpa.com</a><br /><a href="tel:+02079934109">+02 079 934 109</a></dd></div><div><dt>OFFICE HOURS</dt><dd>Mon–Fri, 9am–6pm US Eastern</dd></div><div><dt>RESPONSE TIME</dt><dd>Replies within 1 business day</dd></div><div><dt>OUR OFFICE</dt><dd>5301 NW 100th Ave, Coral Springs, FL 33076</dd></div><div><dt>SENDING DOCUMENTS</dt><dd>Documents move through a secure portal — never as email attachments.</dd></div></dl>
      </div>
      <div className="footer-bottom"><p>© 2026 Benifacts. All rights reserved.</p><p>Coral Springs, Florida · Serving clients across the US and abroad</p><a href="#top">BACK TO TOP ↑</a></div>
      <p className="disclaimer">This is general information, not tax, legal, or accounting advice. No client relationship or engagement is created until an engagement letter is signed by both parties. Beneficial Ownership Information (BOI) reporting obligations depend on current FinCEN guidance, including any applicable exemptions for US-formed entities; confirm your position before acting.</p>
    </div>
    <FooterLogo />
  </footer>;
}
