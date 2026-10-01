import { useEditorialMotion } from "../components/use-editorial-motion";
import { GraffitiCursor } from "../components/graffiti-cursor";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Briefcase, HardHat, HeartPulse, Menu, Minus, Monitor, Plane, Plus, Rocket, ShoppingBag, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Hero background playlist — plays in this order, then loops back to the first clip.
const heroClips = [
  "/videos/hero-01-bridge-day.mp4", // Pixabay 272517 — bridge (shown first)
  "/videos/hero-02-bridge-dusk.mp4", // Pixabay 231178 — bridge at dusk
  "/videos/hero-03-city-avenue.mp4", // Pixabay 219134 — city avenue
] as const;
const heroPoster = "/images/hero-poster.jpg";
const founderImage = "/images/benifacts-founder-cutout.png";
// Founder’s LinkedIn — swap in the personal profile URL once confirmed (company page until then).
const founderLinkedIn = "https://www.linkedin.com/company/benifacts-accountants-uk/";
// If a local image file is missing, fall back to the copy stored in the Lovable project.
const LOVABLE_ASSETS = "https://id-preview--ec736e6a-a9cc-443e-8179-4339a84b1913.lovable.app/__l5e/assets-v1";
const lovableFallback: Record<string, string> = {
  [founderImage]: `${LOVABLE_ASSETS}/538f61b7-e6a0-42a8-9c3a-ba7c88d9bae5/benifacts-founder.jpg`,
};
const CROSSFADE_MS = 800;

const metaDescription = "Benifacts is an accounting and advisory firm with offices in Slough, UK and Coral Springs, Florida — UK accounting, tax and compliance, plus US international tax filings (5471, 5472, FBAR, 8938) for companies and founders operating across borders.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "font", href: "/fonts/manrope-400.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", href: "/fonts/manrope-600.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", href: "/fonts/newsreader-400.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "image", href: heroPoster, fetchPriority: "high" },
    ],
    meta: [
      { title: "Benifacts | Cross-Border CPA Firm · US International Tax & Advisory" },
      { name: "description", content: metaDescription },
      { property: "og:title", content: "Benifacts | Cross-Border CPA Firm · US International Tax & Advisory" },
      { property: "og:description", content: metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/benifacts-og.png" },
      { property: "og:image:alt", content: "Benifacts" },
      { name: "twitter:image", content: "/images/benifacts-og.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { number: "01", title: "Cross-border accounting", lead: "Multi-currency books that reconcile.", body: "Books that reconcile across entities and currencies—plus UK bookkeeping, VAT and payroll.", tags: "BOOKKEEPING  /  MULTI-CURRENCY  /  VAT & PAYROLL", href: "/services/cross-border-accounting" },
  { number: "02", title: "International tax compliance", lead: "One calendar for every return.", body: "US international returns and UK self-assessment, filed correctly and on time.", tags: "5471  /  5472  /  FBAR  /  SELF-ASSESSMENT", href: "/services/international-tax-compliance" },
  { number: "03", title: "Founder & expansion advisory", lead: "Decisions made before year-end.", body: "Entity choice, expansion planning and UK company formation.", tags: "STRUCTURING  /  EXPANSION  /  COMPANY FORMATION", href: "/services/founder-advisory" },
  { number: "04", title: "Virtual CFO & reporting", lead: "Reporting ready for the room.", body: "Board-ready reporting and a Virtual CFO, with a dedicated accountant.", tags: "MIS  /  VIRTUAL CFO  /  BOARD REPORTING", href: "/services/virtual-cfo" },
];


const clients: Array<[string, string, string]> = [
  ["01", "Foreign companies entering the US", "5472, pro forma 1120, state nexus, and Beneficial Ownership Information (BOI) reporting where it applies to overseas owners setting up or running a US entity."],
  ["02", "US companies expanding abroad", "5471, 8858, 926, and GILTI/Subpart F for US parents funding subsidiaries or hiring overseas."],
  ["03", "Founders & expats with global income", "Forms 2555/1116, FBAR, and 8938 for US people living and earning in more than one country."],
  ["04", "Behind on US filings", "Streamlined procedures, delinquent FBAR, and reasonable cause—catch-up routes before the IRS makes contact."],
];

const faqs: Array<[string, string]> = [
  ["Is the call free?", "Yes. The first 20-minute call carries no fee and no obligation. No engagement exists until an engagement letter is signed."],
  ["Do I need documents ready?", "No. Bring the shape of the situation—countries, ownership and open years. Documents come later, once we agree a scope."],
  ["What services do you offer individuals?", "Personal tax planning, self-assessment, inheritance tax, HMRC inquiries, and US filings such as FBAR and 8938."],
  ["What makes Benifacts different?", "A dedicated accountant, unlimited bookkeeping, and all your tax filings managed on one calendar."],
  ["How do you keep my information safe?", "Documents move through a secure portal—never as email attachments—and are reviewed only by our team."],
];


const industries = [["IT services", Monitor], ["Tech startups", Rocket], ["Healthcare", HeartPulse], ["Contractors & SMEs", HardHat], ["Retail", ShoppingBag], ["Relocation", Plane]] as const;

const caseChapters = [
  { label: "SITUATION", text: "An overseas owner operating through a US LLC had no prior US reporting. Ownership and transactions spanned two countries." },
  { label: "WORK PERFORMED", text: "Prepared pro forma 1120 and Form 5472, reviewed reportable transactions, and assessed Beneficial Ownership Information (BOI) reporting obligations under current FinCEN guidance." },
  { label: "OUTCOME", text: "Open years filed on a single calendar, with a documented position on BOI and a forward compliance plan." },
];

const filings = ["5471", "5472", "FBAR", "8938", "2555", "1116"];

// Figures published on benifacts.co.uk.
const stats: Array<[string, string]> = [["10+", "Years of excellence"], ["100+", "Happy clients in the UK"], ["100%", "Paperless commitment"], ["65%", "Referral business"]];

const testimonials: Array<[string, string]> = [
  ["Benifacts offered clear guidance and ensured my tax returns were filed accurately and on time. They’ve saved me both time and money.", "General Practitioner, London"],
  ["Their knowledge of HMRC’s regulations was impressive. Thanks to their help, we secured significant savings on our R&D tax credits.", "Technology Company, Manchester"],
  ["Benifacts took the stress out of VAT and bookkeeping. Their regular reports give me clear visibility of my finances.", "Retail Business Owner, Birmingham"],
];

// Illustrative CC0 stock photography (see IMAGE_CREDITS.md) — chosen by topic, never presented as Benifacts staff or clients.
const stock = (name: string) => ({ src: `/images/stock/${name}-960.webp`, srcSet: `/images/stock/${name}-640.webp 640w, /images/stock/${name}-960.webp 960w` });
const serviceImages: Record<string, { name: string; alt: string }> = {
  "01": { name: "service-accounting", alt: "Hands working on a laptop and calculator beside financial notes" },
  "02": { name: "service-tax-return", alt: "Close-up of a dictionary page showing the words tax return" },
  "03": { name: "service-advisory", alt: "A team discussing plans around a meeting table" },
  "04": { name: "service-reporting", alt: "A laptop displaying analytics charts" },
};
const clientImages: Record<string, { name: string; alt: string }> = {
  "01": { name: "client-us-skyline", alt: "Aerial view of a US city skyline" },
  "02": { name: "client-airport", alt: "Aircraft parked at airport gates" },
  "03": { name: "client-remote-founder", alt: "A man on a video call working from home" },
  "04": { name: "client-catch-up", alt: "A businessman at a laptop holding his head in concern" },
};

// Short editorial notes. Every fact restates a service already described on this page.
const insights = [
  { category: "INBOUND · FOREIGN-OWNED US ENTITIES", title: "Form 5472 starts the day a US entity has an overseas owner", excerpt: "Pro forma 1120, Form 5472 and state nexus can apply from the first year — mapping them early keeps every return on one calendar.", image: "insight-documents", alt: "A signed document on a clipboard on a wooden desk" },
  { category: "EXPATS · GLOBAL INCOME", title: "Earning in two countries rarely means one simple return", excerpt: "US people living abroad may need Forms 2555 and 1116 alongside FBAR and 8938. Knowing which apply before the deadline keeps the year predictable.", image: "insight-passports", alt: "Two US passports on a wooden table" },
];
// Articles published on benifacts.co.uk.
const ukInsights = [
  { category: "UK · VAT", title: "Making Tax Digital for VAT: A Complete Guide", excerpt: "The digital revolution is transforming the UK tax system. What every business owner needs to know about Making Tax Digital for VAT.", image: "making-tax-digital-for-vat-a-complete-guide", href: "https://www.benifacts.co.uk/making-tax-digital-for-vat-a-complete-guide/" },
];

function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand-lockup old-brand ${light ? "old-brand-light" : ""}`}><span className="old-brand-mark" aria-hidden="true"><i /><i /><i /></span><span><span className="old-brand-name">benifacts<span className="old-brand-dot">.</span></span><small>ADVISORY &amp; ACCOUNTING</small></span></span>;
}

/** Oversized Benifacts wordmark in the logo's own typeface, used the way ARIO uses its name. */
function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wordmark ${className}`} aria-hidden="true"><span className="wordmark-inner">benifacts<span className="old-brand-dot">.</span></span></span>;
}

function SiteImage({ src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <img {...rest} src={src} onError={(e) => {
    const fallback = lovableFallback[src];
    if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
  }} />;
}

function StockImage({ name, alt, sizes = "(max-width: 900px) 100vw, 50vw" }: { name: string; alt: string; sizes?: string }) {
  const { src, srcSet } = stock(name);
  return <img src={src} srcSet={srcSet} sizes={sizes} width={960} height={640} alt={alt} loading="lazy" decoding="async" data-parallax />;
}

/** Text whose words light up one by one as it scrolls through the viewport. */
function ScrubText({ text }: { text: string }) {
  const words = text.split(" ");
  return <span className="scrub" data-progress="scrub" style={{ "--n": words.length } as React.CSSProperties}>{words.map((w, i) => <span key={i} style={{ "--w": i } as React.CSSProperties}>{w}{i < words.length - 1 ? " " : ""}</span>)}</span>;
}

/** Small centred section label, ARIO-style. */
function Label({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

/** Thin crosshair rule used on cards. */
function Cross() {
  return <span className="cross" aria-hidden="true" />;
}

type Layer = 0 | 1;

/**
 * Plays the hero clips one after another with a crossfade, looping forever.
 * Two stacked <video> layers: the front one plays while the back one preloads the next clip.
 */
function CinematicVideo({ className = "" }: { className?: string }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [front, setFront] = useState<Layer>(0);
  const [layerClips, setLayerClips] = useState<[number, number]>([0, 1]);
  const layerA = useRef<HTMLVideoElement>(null);
  const layerB = useRef<HTMLVideoElement>(null);
  const switching = useRef(false);
  const fadeTimer = useRef<number | undefined>(undefined);
  const generation = useRef(0);
  useEffect(() => () => { generation.current++; window.clearTimeout(fadeTimer.current); }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slowConnection = connection.connection?.saveData || connection.connection?.effectiveType === "2g" || connection.connection?.effectiveType === "slow-2g";
    const sync = () => {
      generation.current++;
      switching.current = false;
      window.clearTimeout(fadeTimer.current);
      setPlayVideo(!reducedMotion.matches && !slowConnection);
    };
    sync();
    reducedMotion.addEventListener("change", sync);
    return () => reducedMotion.removeEventListener("change", sync);
  }, []);

  const getLayer = (layer: Layer) => (layer === 0 ? layerA.current : layerB.current);

  useEffect(() => {
    if (!playVideo) return;
    const hero = layerA.current?.closest(".hero");
    if (!hero) return;
    let visible = true;
    const sync = () => {
      [layerA.current, layerB.current].forEach((video, index) => {
        if (!video) return;
        if (visible && !document.hidden && (index === front || switching.current)) void video.play().catch(() => undefined);
        else video.pause();
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [playVideo, front]);


  // Start the first clip once the videos are mounted.
  useEffect(() => {
    if (!playVideo) return;
    [layerA.current, layerB.current].forEach((v) => { if (v) v.muted = true; });
    void layerA.current?.play().catch(() => undefined);
  }, [playVideo]);

  const advance = useCallback(async () => {
    if (switching.current || document.hidden) return;
    const outgoing = front;
    const incoming: Layer = front === 0 ? 1 : 0;
    const next = getLayer(incoming);
    if (!next) return;
    switching.current = true;
    const currentGeneration = generation.current;
    try {
      next.currentTime = 0;
      next.muted = true;
      // Keep the outgoing frame visible until the next clip actually starts.
      await next.play();
      if (currentGeneration !== generation.current) { next.pause(); return; }
      setFront(incoming);
      fadeTimer.current = window.setTimeout(() => {
        getLayer(outgoing)?.pause();
        setLayerClips(prev => {
          const updated: [number, number] = [prev[0], prev[1]];
          updated[outgoing] = (prev[incoming] + 1) % heroClips.length;
          return updated;
        });
        switching.current = false;
      }, CROSSFADE_MS);
    } catch {
      // A buffering or autoplay failure leaves the current frame on screen; keep the current clip
      // moving and try the next one again shortly, so a slow connection never freezes the loop.
      switching.current = false;
      if (currentGeneration !== generation.current) return;
      const current = getLayer(outgoing);
      if (current?.ended) { current.currentTime = 0; void current.play().catch(() => undefined); }
      window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => { if (currentGeneration === generation.current) void advance(); }, 1500);
    }
  }, [front]);

  const handleTimeUpdate = (layer: Layer) => (event: React.SyntheticEvent<HTMLVideoElement>) => {
    if (layer !== front) return;
    const video = event.currentTarget;
    if (video.duration && video.duration - video.currentTime <= CROSSFADE_MS / 1000) advance();
  };

  if (!playVideo) return <img className={className} src={heroPoster} alt="" aria-hidden="true" fetchPriority="high" />;

  return <>
    {([0, 1] as const).map((layer) => (
      <video
        key={layer}
        ref={layer === 0 ? layerA : layerB}
        className={`${className} hero-video-layer ${front === layer ? "is-front" : ""}`}
        src={heroClips[layerClips[layer]]}
        muted
        playsInline
        preload="auto"
        poster={layer === 0 ? heroPoster : undefined}
        aria-hidden="true"
        onTimeUpdate={handleTimeUpdate(layer)}
        onEnded={(event) => {
          if (layer !== front) return;
          // Next clip still buffering: keep this one playing instead of freezing on its last frame.
          if (switching.current) { event.currentTarget.currentTime = 0; void event.currentTarget.play().catch(() => undefined); }
          else advance();
        }}
      />
    ))}
  </>;
}


const nav: Array<[string, string]> = [["Why Benifacts", "#credibility"], ["Expertise", "#expertise"], ["Who we help", "#clients"], ["Insights", "#insights"]];

function Header() {
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
      <a href="#top" aria-label="Benifacts home" className="header-brand"><Brand light /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="header-cta" href="#contact">Let’s talk <Plus size={15} aria-hidden="true" /></a>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <div id="mobile-menu" className="mobile-menu" hidden={!open}>
      <nav aria-label="Mobile navigation">{[...nav, ["FAQ", "#faq"] as [string, string]].map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>)}</nav>
      <a className="button-primary" href="#contact" onClick={() => setOpen(false)}>Get in touch <ArrowUpRight aria-hidden="true" /></a>
    </div>
    <div className="reading-progress" aria-hidden="true" />
  </header>;
}

/* 1 — Hero: the original video, with an ARIO-style composition on top of it. */
function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title" data-tone="navy">
    <CinematicVideo className="hero-video" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-content shell">
      <div className="hero-statement hero-enter">
        <h1 id="hero-title">UK &amp; US tax clarity for businesses and founders <em>across borders.</em></h1>
        <p className="hero-lead">Accounting, tax and advisory for the UK and US—coordinated around your business.</p>
        <div className="hero-actions"><a className="button-primary" href="#contact">Book a 20-minute consultation <ArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#expertise">Explore our services <ArrowDown aria-hidden="true" /></a></div>
      </div>
    </div>
  </section>;
}

/* Founder spotlight — shown between Insights and FAQ. */
function Founder() {
  return <section className="founder-spotlight section-pad" data-tone="navy" aria-labelledby="founder-title">
      <div className="shell founder-grid">
        <figure className="founder-photo" data-reveal="image">
          <SiteImage src={founderImage} alt="Founder and Lead CPA of Benifacts" width={1254} height={1254} loading="lazy" decoding="async" />
          <a className="founder-linkedin" href={founderLinkedIn} target="_blank" rel="noreferrer" aria-label="Founder on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg></a>
        </figure>
        <div className="founder-bio" data-reveal>
          <h2 id="founder-title" className="founder-role">Founder &amp; Lead CPA</h2>
          <p className="founder-practice">Cross-border US international tax &amp; advisory</p>
          <ul><li>Licensed Certified Public Accountant (CPA) — jurisdiction and licence number to be confirmed and displayed here.</li><li>Specialisation in US international filings: Forms 5471, 5472, FBAR, 8938, and related reporting.</li><li>Experience with inbound, outbound, and expat cross-border engagements.</li><li>Member of professional body — details to be confirmed.</li></ul>
          <div className="founder-bio-foot"><small>Specific name, credentials, and licence details will appear here once confirmed. We do not publish unverified credentials.</small><a className="button-primary" href="#contact">Book a 20-minute consultation <ArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>;
}

/* 2 — Why Benifacts. */
function WhyBenifacts() {
  return <section id="credibility" className="why" data-tone="paper" aria-labelledby="why-title">
    <div className="shell section-pad">
      <div className="centered-head" data-reveal>
        <Label>01 · Why Benifacts</Label>
        <h2 id="why-title">Credibility you can <em>verify before you call.</em></h2>
        <p>Cross-border tax work leaves little room for guesswork. These are the people, experience, and results behind every engagement.</p>
      </div>
      <div className="filing-cards">
        <p className="filing-cards-title" data-reveal>INTERNATIONAL FILINGS MANAGED</p>
        {filings.map((f, i) => <div className="filing-card" key={f} data-progress="card" style={{ "--i": i } as React.CSSProperties}><Cross /><span className="filing-index">{String(i + 1).padStart(2, "0")}</span><b>{f}</b></div>)}
        <a className="filing-card more" href="#expertise" data-progress="card"><Cross /><span className="filing-index">+ 8865 · 926 · 1042-S</span><b>MORE <Plus aria-hidden="true" /></b></a>
      </div>
      <div className="why-intro" data-reveal>
        <span className="why-mark" aria-hidden="true">B.</span>
        <h3><ScrubText text="Simplifying complexity for businesses that don’t stop at the border." /></h3>
        <p>Precision-driven accounting and advisory from our offices in Slough, UK and Coral Springs, Florida—backed by over 10 years of experience.</p>
      </div>
      <ul className="stats" data-reveal>{stats.map(([n, l], i) => <li key={l} style={{ "--i": i } as React.CSSProperties}><b>{n}</b><span>{l}</span></li>)}</ul>
    </div>
  </section>;
}

/* 3 — Expertise: stacked practice cards (number card + image), ARIO-style. */
function Expertise() {
  return <section id="expertise" className="expertise section-pad" data-tone="navy" aria-labelledby="expertise-title">
    <div className="shell">
      <div className="centered-head with-aside" data-reveal>
        <Label>02 · Our expertise</Label>
        <h2 id="expertise-title">The right perspective. <em>The right next move.</em></h2>
        <p>Integrated accounting, tax, and advisory for the UK and US.</p>
      </div>
      <ol className="practice-stack">{services.map((s, i) => <li className="practice" key={s.number} style={{ "--i": i } as React.CSSProperties}>
        <a className="practice-card" href={s.href}>
          <div className="practice-text">
            <Cross />
            <span className="practice-number">{s.number}</span>
            <h3>{s.title}</h3>
            <div className="meta-table"><span>Focus</span><span>{s.lead}</span></div>
            <p>{s.body}</p>
            <small>{s.tags}</small>
            <span className="practice-more">MORE <Plus aria-hidden="true" /></span>
          </div>
          <figure className="practice-image"><StockImage name={serviceImages[s.number]!.name} alt={serviceImages[s.number]!.alt} /></figure>
        </a>
      </li>)}</ol>
    </div>
  </section>;
}

/* 4 — Who we help: pinned stage where photos stack as each client type comes forward. */
function WhoWeHelp() {
  return <section id="clients" className="clients" data-tone="paper" aria-labelledby="clients-title">
    <div className="shell section-pad clients-head">
      <div className="centered-head" data-reveal>
        <Label>03 · Who we help</Label>
        <h2 id="clients-title">Built for ambition. <em>Grounded in detail.</em></h2>
        <p>From sole proprietors to growing businesses operating across borders.</p>
        <a className="text-link" href="#contact">Find your way forward <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
    <div className="shell client-tree" data-progress="tree">
      <span className="tree-trunk" aria-hidden="true"><span className="tree-fill" /></span>
      {clients.map(([n, t, b], i) => <article key={n} className="tree-row" data-progress="branch" data-side={i % 2 ? "right" : "left"}>
        <figure className="tree-photo"><StockImage name={clientImages[n]!.name} alt={clientImages[n]!.alt} sizes="(max-width: 900px) 100vw, 440px" /></figure>
        <span className="tree-node" aria-hidden="true" />
        <div className="tree-text"><span className="client-number">{n} / 04</span><h3>{t}</h3><p>{b}</p></div>
      </article>)}
    </div>
    <div className="industries-band"><div className="shell industries" data-reveal><p>INDUSTRIES WE WORK IN</p><ul>{industries.map(([name, Icon], i) => <li key={name} style={{ "--i": i } as React.CSSProperties}><span className="industry-n">{String(i + 1).padStart(2, "0")}</span><Icon aria-hidden="true" strokeWidth={1.5} /><b>{name}</b></li>)}</ul></div></div>
  </section>;
}

/* 6 — Case study: large image / text spread. */
function CaseStudy() {
  return <section id="case-study" className="case section-pad" data-tone="mist" aria-labelledby="case-title">
    <div className="shell case-spread">
      <figure className="case-visual" data-reveal="image" aria-hidden="true"><StockImage name="case-filings" alt="" sizes="(max-width: 900px) 100vw, 50vw" /></figure>
      <div className="case-card" data-reveal>
        <Cross />
        <div className="meta-table"><span>CASE STUDY</span><span>CROSS-BORDER COMPLIANCE</span></div>
        <h2 id="case-title">Foreign-owned US entity brought current with 5472 and BOI reporting</h2>
        <ol className="case-chapters">{caseChapters.map((c) => <li key={c.label}><small>{c.label}</small><p>{c.text}</p></li>)}</ol>
        <p className="fineprint">Illustrative composite based on typical engagements. Identifying details withheld. Figures and specifics to be confirmed before promotion.</p>
      </div>
    </div>
  </section>;
}

/* 7 — Testimonials: oversized pull quote that rotates through client stories. */
function Testimonial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: number) => setI((n) => (n + d + testimonials.length) % testimonials.length), []);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), 8000);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  return <section className="testimonial section-pad" data-tone="deep" aria-roledescription="carousel" aria-label="Client testimonials">
    <figure className="shell quote" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Label>04 · What clients say</Label>
      <span className="quote-mark" aria-hidden="true">“</span>
      <div className="quote-slides" aria-live="polite">{testimonials.map(([q, who], n) => <div key={who} className={`quote-slide ${n === i ? "is-on" : ""}`} aria-hidden={n !== i}>
        <blockquote><p>{q}</p></blockquote>
      </div>)}</div>
    </figure>
  </section>;
}

/* 8 — Insights: press-centre style cards. */
function Insights() {
  return <section id="insights" className="insights section-pad" data-tone="paper" aria-labelledby="insights-title">
    <div className="shell">
      <div className="centered-head" data-reveal>
        <Label>05 · Insights</Label>
        <h2 id="insights-title">Questions worth asking <em>before the deadline.</em></h2>
        <p>Short notes on the UK and US filings our clients ask about most. General information only—your facts decide what applies.</p>
      </div>
      <div className="insight-grid">
        {insights.map((item, i) => <article className="insight-card" key={item.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
          <figure><StockImage name={item.image} alt={item.alt} sizes="(max-width: 900px) 100vw, 33vw" /></figure>
          <div className="insight-body"><Cross /><div className="meta-table"><span>{String(i + 1).padStart(2, "0")}</span><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p></div>
          <a className="card-link" href="#contact" aria-label={`Discuss your situation: ${item.title}`} />
        </article>)}
        {ukInsights.map((item, i) => <article className="insight-card" key={item.title} data-reveal style={{ "--i": i + insights.length } as React.CSSProperties}>
          <figure><img src={`/images/uk/${item.image}.webp`} alt="" width={960} height={640} loading="lazy" decoding="async" /></figure>
          <div className="insight-body"><Cross /><div className="meta-table"><span>{String(i + insights.length + 1).padStart(2, "0")}</span><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p></div>
          <a className="card-link" href={item.href} target="_blank" rel="noreferrer" aria-label={`Read: ${item.title}`} />
        </article>)}
        <a className="insight-card more" href="#contact" data-reveal><Cross /><b>Discuss your situation <Plus aria-hidden="true" /></b></a>
      </div>
    </div>
  </section>;
}

function Faq({ q, a, n, initiallyOpen }: { q: string; a: string; n: number; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return <div className={`faq-row ${open ? "is-open" : ""}`}><h3><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}><span className="faq-n">{String(n).padStart(2, "0")}</span><span className="faq-q">{q}</span>{open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</button></h3><div className="faq-answer"><div><p>{a}</p></div></div></div>;
}

/* 10 — FAQ: list rows with a plus, like ARIO's recognition list. */
function FaqSection() {
  return <section id="faq" className="faq section-pad" data-tone="navy" aria-labelledby="faq-title">
    <div className="shell">
      <div className="centered-head" data-reveal><Label>06 · FAQ</Label><h2 id="faq-title">Frequently asked <em>questions.</em></h2></div>
      <div className="faq-list" data-reveal>{faqs.map(([q, a], i) => <Faq key={q} q={q} a={a} n={i + 1} initiallyOpen={i === 0} />)}</div>
    </div>
  </section>;
}

/* 11 — Contact: large minimal form on the brand gradient. */
function Contact() {
  return <section id="contact" className="contact section-pad" data-tone="ocean" aria-labelledby="contact-title">
    <div className="contact-backdrop" aria-hidden="true"><img src="/images/stock/contact-tower-960.webp" alt="" loading="lazy" decoding="async" /></div>
    <div className="shell contact-grid">
      <div className="contact-copy" data-reveal>
        <Label>07 · Let’s connect</Label>
        <h2 id="contact-title">Make your next move <em>count.</em></h2>
        <p>Tell us which countries are involved and what you’re trying to do. We’ll confirm which UK or US filings apply, what it costs, and what to do next — before you commit to anything.</p>
        <ol><li><span>01</span>We review what you have already told us.</li><li><span>02</span>We confirm which UK or US filings are likely to apply to you.</li><li><span>03</span>If it’s a fit, you get a written scope and fee.</li></ol>
        <a className="email-call" href="mailto:info@benifactscpa.com?subject=Schedule%20a%2020-minute%20call%20%E2%80%94%20Benifacts">Or email us to schedule a 20-minute call <ArrowUpRight aria-hidden="true" /></a>
        <dl className="offices"><div><dt>UK OFFICE</dt><dd>Office 308, Regal Court Business Centre, 42–44 High Street, Slough, Berkshire SL1 1EL<br /><a href="tel:+442035191551">+44 203 519 1551</a> · <a href="mailto:info@benifacts.co.uk">info@benifacts.co.uk</a></dd></div><div><dt>US OFFICE</dt><dd>5301 NW 100th Ave, Coral Springs, FL 33076<br /><a href="mailto:info@benifactscpa.com">info@benifactscpa.com</a></dd></div></dl>
      </div>
      <div className="form-wrap" data-reveal><form action="https://benifacts-consulting-portfolio-170717.hostingersite.com/api/contact" method="post"><label>Full name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required /></label><div className="field-pair"><label>Company <small>(optional)</small><input name="company" type="text" placeholder="Company or entity name" /></label><label>Countries involved <small>(optional)</small><input name="countries" type="text" placeholder="e.g. US and India" /></label></div><label>What do you need help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Cross-border accounting</option><option>International tax compliance (5471 / 5472 / FBAR / 8938)</option><option>Founder & expansion advisory</option><option>Virtual CFO / reporting</option><option>Catch-up / streamlined filings</option><option>UK personal tax / self-assessment</option><option>UK bookkeeping, VAT &amp; payroll</option><option>UK company formation &amp; secretarial</option><option>UK specialist advisory (healthcare, IT, SMEs)</option><option>Something else</option></select></label><label>How did you hear about us? <small>(optional)</small><select name="source" defaultValue=""><option value="" disabled>Select an option</option><option>Google Search</option><option>Social Media</option><option>Event / Webinar</option><option>Google Ad</option><option>Accounting reference</option><option>Newsletter</option></select></label><label>Tell us a little more<textarea name="message" rows={4} placeholder="Which years are open, who owns what, and what you’re trying to do. Please don’t send account or ID numbers here." required /></label><label className="consent"><input type="checkbox" required /><span>I understand this form sends general information, not advice, and that no client relationship is created until an engagement letter is signed.</span></label><button className="send" type="submit">Send message <Plus aria-hidden="true" /></button><p className="form-note">We reply within 1 business day</p><p className="fineprint">By submitting, you agree to our <a href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy">Privacy Policy</a>. Your information is used only to respond to your enquiry.</p></form></div>
    </div>
  </section>;
}

/* 12 — Footer: structured columns and the oversized wordmark. */
function Footer() {
  return <footer className="footer" data-tone="deep">
    <div className="shell">
      <div className="footer-top">
        <div className="footer-brand"><a href="#top" aria-label="Benifacts home"><Brand light /></a><p>Accounting and advisory<br /><em>for a world in motion.</em></p></div>
        <nav className="footer-col footer-explore" aria-label="Explore"><small>EXPLORE</small>{[...nav, ["Case study", "#case-study"], ["FAQ", "#faq"]].map(([label, href]) => <a key={href} className="footer-link" href={href}>{label}</a>)}</nav>
        <nav className="footer-col footer-connect" aria-label="Connect"><small>CONNECT</small><a className="footer-link" href="#contact">Get in touch</a><a className="footer-link" href="mailto:info@benifactscpa.com">Email us</a><a className="footer-link" href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy">Privacy Policy</a><a className="footer-link" href="https://www.linkedin.com/company/benifacts-accountants-uk/" target="_blank" rel="noreferrer">LinkedIn</a><a className="footer-link" href="https://www.benifacts.co.uk/" target="_blank" rel="noreferrer">UK website</a><a className="footer-link" href="https://www.benifactscpa.com/" target="_blank" rel="noreferrer">US website</a></nav>
        <dl className="footer-col footer-contacts"><small>CONTACTS</small><div><dt>UK CONTACT</dt><dd><a href="tel:+442035191551">+44 203 519 1551</a><br /><a href="mailto:info@benifacts.co.uk">info@benifacts.co.uk</a></dd></div><div><dt>US CONTACT</dt><dd><a href="mailto:info@benifactscpa.com">info@benifactscpa.com</a></dd></div><div><dt>US OFFICE HOURS</dt><dd>Mon–Fri, 9am–6pm US Eastern</dd></div><div><dt>RESPONSE TIME</dt><dd>Replies within 1 business day</dd></div><div><dt>UK OFFICE</dt><dd>Office 308, Regal Court Business Centre, 42–44 High Street, Slough, Berkshire SL1 1EL</dd></div><div><dt>US OFFICE</dt><dd>5301 NW 100th Ave, Coral Springs, FL 33076</dd></div><div><dt>SENDING DOCUMENTS</dt><dd>Documents move through a secure portal — never as email attachments.</dd></div></dl>
      </div>
      <div className="footer-bottom"><p>© 2026 Benifacts. All rights reserved.</p><p>Slough, UK · Coral Springs, Florida · Serving clients across the UK, the US and abroad</p><a href="#top">BACK TO TOP ↑</a></div>
      <p className="disclaimer">This is general information, not tax, legal, or accounting advice. No client relationship or engagement is created until an engagement letter is signed by both parties. Beneficial Ownership Information (BOI) reporting obligations depend on current FinCEN guidance, including any applicable exemptions for US-formed entities; confirm your position before acting.</p>
    </div>
    <Wordmark className="footer-wordmark" />
  </footer>;
}

function Index() {
  useEditorialMotion();
  return <div className="site">
    <div className="intro-curtain" aria-hidden="true"><Brand light /></div>
    <div className="tone-canvas" aria-hidden="true"><div className="tone-noise" /></div>
    <GraffitiCursor />
    <Header />
    <main id="main">
      <Hero />
      <WhyBenifacts />
      <Expertise />
      <WhoWeHelp />
      <CaseStudy />
      <Testimonial />
      <Insights />
      <Founder />
      <FaqSection />
      <Contact />
    </main>
    <Footer />
  </div>;
}
