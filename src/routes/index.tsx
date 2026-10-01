import { useEditorialMotion } from "../components/use-editorial-motion";
import { GraffitiCursor } from "../components/graffiti-cursor";
import { createFileRoute } from "@tanstack/react-router";
import { Brand, Cross, Faq, Footer, Header, Label } from "../components/site-chrome";
import { services as servicePages } from "../lib/services";
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

const metaDescription = "Benifacts is a cross-border CPA firm in Coral Springs, Florida — cross-border tax advisory, US tax compliance, sales tax planning and complete small-business services for individuals, startups and businesses operating between the US and beyond.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "font", href: "/fonts/manrope-400.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", href: "/fonts/manrope-600.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", href: "/fonts/newsreader-400.woff", type: "font/woff", crossOrigin: "anonymous" },
      { rel: "preload", as: "image", href: heroPoster, fetchPriority: "high" },
      { rel: "preload", as: "image", href: "/images/benifacts-original.svg", type: "image/svg+xml" },
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
  { number: "01", title: "Cross-border tax advisory & planning", lead: "International tax clarity.", body: "Strategic guidance for non-resident individuals, foreign-owned businesses and Americans abroad—FBAR, FATCA, treaty positions and optimized structures.", tags: "TREATY ANALYSIS  /  FBAR & FATCA  /  STRUCTURING  /  TRANSFER PRICING  /  EXPAT TAX", href: "/services/cross-border-advisory/" },
  { number: "02", title: "US tax compliance & planning", lead: "Every return, on time.", body: "Federal and state filings for individuals and every entity type—Forms 1040, 1120, 1065 and all international information returns—with IRS audit representation.", tags: "FEDERAL & STATE  /  5471  /  5472  /  8865  /  8938  /  IRS AUDIT", href: "/services/us-tax-compliance/" },
  { number: "03", title: "US sales tax planning & compliance", lead: "Know where you have nexus.", body: "Multi-state sales tax obligations, economic nexus thresholds and voluntary disclosure—keeping your business compliant without over-paying.", tags: "NEXUS ANALYSIS  /  VOLUNTARY DISCLOSURE  /  REGISTRATION  /  RETURN FILING", href: "/services/sales-tax/" },
  { number: "04", title: "Small business complete package", lead: "Everything under one roof.", body: "Bookkeeping, payroll, corporate tax, 401(k) administration and business entity formation—LLC, corporation or non-profit—coordinated by your Primary Account Manager.", tags: "BOOKKEEPING  /  PAYROLL & 1099  /  CORPORATE TAX  /  401(K)  /  ENTITY FORMATION", href: "/services/small-business/" },
];


const clients: Array<[string, string, string]> = [
  ["01", "Foreign companies entering the US", "5472, pro forma 1120, state nexus, and Beneficial Ownership Information (BOI) reporting where it applies to overseas owners setting up or running a US entity."],
  ["02", "US companies expanding abroad", "5471, 8858, 926, and GILTI/Subpart F for US parents funding subsidiaries or hiring overseas."],
  ["03", "Founders & expats with global income", "Forms 2555/1116, FBAR, and 8938 for US people living and earning in more than one country."],
  ["04", "Behind on US filings", "Streamlined procedures, delinquent FBAR, and reasonable cause—catch-up routes before the IRS makes contact."],
];

const faqs: Array<[string, string]> = [
  ["What is cross-border tax advisory, and who needs it?", "It helps individuals and businesses with tax obligations in more than one country—foreign nationals earning US income, Americans with overseas assets, US companies with foreign subsidiaries, and non-US businesses selling into the US."],
  ["What is a Primary Account Manager (PAM)?", "Your dedicated point of contact at Benifacts. They own the relationship, coordinate all service delivery, and lead your advisory—so you never re-explain your situation every year."],
  ["Do I need to file US taxes if I live or am incorporated outside the US?", "Potentially, yes. US citizens and permanent residents are taxed on worldwide income, and non-US individuals and foreign corporations may have filing obligations too. We determine your exact obligations."],
  ["What are FBAR and FATCA, and do I need to report?", "FBAR (FinCEN Form 114) applies to US persons whose foreign financial accounts exceed $10,000 at any point in the year. FATCA (Form 8938) covers specified foreign financial assets above certain thresholds. We handle both filings."],
  ["How does Benifacts handle bookkeeping and payroll for small businesses?", "Bookkeeping, payroll and routine compliance are delivered through our trusted outsourced delivery partners, coordinated and overseen by your Primary Account Manager."],
  ["How quickly can Benifacts onboard a new client?", "Onboarding typically takes one to two weeks. For urgent filings we can prioritize the initial assessment and begin work within days of engagement."],
  ["Does Benifacts work with startups and early-stage businesses?", "Yes. Getting the structure right from the beginning—entity type, tax elections, cross-border considerations—avoids costly restructuring later."],
];


const industries = [["IT services", Monitor], ["Tech startups", Rocket], ["Healthcare", HeartPulse], ["Contractors & SMEs", HardHat], ["Retail", ShoppingBag], ["Relocation", Plane]] as const;

const caseChapters = [
  { label: "SITUATION", text: "An overseas owner operating through a US LLC had no prior US reporting. Ownership and transactions spanned two countries." },
  { label: "WORK PERFORMED", text: "Prepared pro forma 1120 and Form 5472, reviewed reportable transactions, and assessed Beneficial Ownership Information (BOI) reporting obligations under current FinCEN guidance." },
  { label: "OUTCOME", text: "Open years filed on a single calendar, with a documented position on BOI and a forward compliance plan." },
];

const filings = ["5471", "5472", "FBAR", "8938", "2555", "1116"];

// Figures published on benifacts.co.uk.
const stats: Array<[string, string]> = [["10+", "Years of excellence"], ["200+", "Happy clients across the US"], ["100%", "Paperless operations"], ["65%", "Referral business"]];

const testimonials: Array<[string, string]> = [
  ["Benifacts offered clear guidance and ensured my tax returns were filed accurately and on time. They’ve saved me both time and money.", "General Practitioner, London"],
  ["Their knowledge of HMRC’s regulations was impressive. Thanks to their help, we secured significant savings on our R&D tax credits.", "Technology Company, Manchester"],
  ["Benifacts took the stress out of VAT and bookkeeping. Their regular reports give me clear visibility of my finances.", "Retail Business Owner, Birmingham"],
];

// Illustrative CC0 stock photography (see IMAGE_CREDITS.md) — chosen by topic, never presented as Benifacts staff or clients.
const stock = (name: string) => ({ src: `/images/stock/${name}-960.webp`, srcSet: `/images/stock/${name}-640.webp 640w, /images/stock/${name}-960.webp 960w` });
const serviceImages: Record<string, { name: string; alt: string }> = {
  "01": { name: "service-advisory", alt: "A team discussing plans around a meeting table" },
  "02": { name: "service-tax-return", alt: "Close-up of a dictionary page showing the words tax return" },
  "03": { name: "service-accounting", alt: "Hands working on a laptop and calculator beside financial notes" },
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
  { category: "BLOG", title: "Maximizing Tax Deductions: Overlooked Business Expenses That Can Save You Thousands", excerpt: "Managing your finances goes beyond earning revenue—it also means minimizing your tax liabilities through every legitimate deduction available to you.", image: "insight-documents", alt: "A signed document on a clipboard on a wooden desk" },
  { category: "BLOG", title: "Preparing for an IRS Audit: Best Practices for Businesses", excerpt: "An IRS audit is one of the most stressful events for any business. Whether triggered by a red flag or chosen at random, preparation makes all the difference.", image: "insight-calendar", alt: "A desk calendar beside pens and a stapler" },
  { category: "BLOG", title: "Navigating the New Tax Code: What Businesses Need to Know", excerpt: "The US tax landscape is constantly evolving. Recent changes significantly impact businesses of all sizes—here is what you need to understand and act on.", image: "insight-passports", alt: "Two US passports on a wooden table" },
];



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




/* 1 — Hero: the original video, with an ARIO-style composition on top of it. */
function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title" data-tone="navy">
    <CinematicVideo className="hero-video" />
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-content shell">
      <div className="hero-statement hero-enter">
        <h1 id="hero-title">USA tax clarity for businesses and founders <em>across borders.</em></h1>
        <p className="hero-lead">Dedicated advisory, full compliance management, and strategic planning for individuals, startups, and businesses operating between the US and beyond.</p>
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
        <h2 id="why-title">Complete financial solutions <em>for US businesses.</em></h2>
        <p>Everything your business needs to stay compliant, optimize tax, and plan for growth—delivered with the care and precision of a trusted partner.</p>
      </div>
      <div className="filing-cards">
        <p className="filing-cards-title" data-reveal>INTERNATIONAL FILINGS MANAGED</p>
        {filings.map((f, i) => <div className="filing-card" key={f} data-progress="card" style={{ "--i": i } as React.CSSProperties}><Cross /><span className="filing-index">{String(i + 1).padStart(2, "0")}</span><b>{f}</b></div>)}
        <a className="filing-card more" href="#expertise" data-progress="card"><Cross /><span className="filing-index">+ 8865 · 926 · 1042-S</span><b>MORE <Plus aria-hidden="true" /></b></a>
      </div>
      <div className="why-intro" data-reveal>
        <span className="why-mark" aria-hidden="true">B.</span>
        <h3><ScrubText text="Simplifying complexity for businesses that don’t stop at the border." /></h3>
        <p>Every client has a dedicated Primary Account Manager who owns your relationship, your compliance, and your advisory delivery. Your financial data is protected with SOC 2-compliant practices and advanced encryption at every step.</p>
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
        <p>From cross-border tax planning to US compliance and sales tax strategy—full-service advisory with dedicated Primary Account Managers who own your outcomes end-to-end.</p>
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
      <p className="more-services" data-reveal><span>ALSO</span>{servicePages.slice(4).map((p) => <a key={p.slug} className="text-link" href={`/services/${p.slug}/`}>{p.name} <ArrowUpRight aria-hidden="true" /></a>)}</p>
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
        <h2 id="insights-title">Recent <em>articles.</em></h2>
        <p>Stay informed on US tax law, cross-border compliance, and financial strategy for growing businesses.</p>
      </div>
      <div className="insight-grid">
        {insights.map((item, i) => <article className="insight-card" key={item.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
          <figure><StockImage name={item.image} alt={item.alt} sizes="(max-width: 900px) 100vw, 33vw" /></figure>
          <div className="insight-body"><Cross /><div className="meta-table"><span>{String(i + 1).padStart(2, "0")}</span><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p></div>
          <a className="card-link" href="#contact" aria-label={`Discuss your situation: ${item.title}`} />
        </article>)}
      </div>
    </div>
  </section>;
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
        <h2 id="contact-title">Ready to simplify your <em>cross-border tax?</em></h2>
        <p>Schedule a free consultation with one of our cross-border advisory specialists. We’ll assess your current obligations and identify immediate planning opportunities at no cost—and reply within one business day.</p>
        <ol><li><span>01</span>Initial consultation — your cross-border footprint and tax priorities.</li><li><span>02</span>Assessment &amp; scoping — obligations, exposures and engagement scope.</li><li><span>03</span>Strategy &amp; setup — a tax-efficient structure and compliance plan.</li><li><span>04</span>Ongoing advisory — compliance management and proactive planning.</li></ol>
        <a className="email-call" href="mailto:info@benifactscpa.com?subject=Schedule%20a%20call%20%E2%80%94%20Benifacts">Schedule a call <ArrowUpRight aria-hidden="true" /></a>
        <dl className="offices"><div><dt>EMAIL</dt><dd><a href="mailto:info@benifactscpa.com">info@benifactscpa.com</a></dd></div><div><dt>PHONE</dt><dd><a href="tel:+02079934109">+02 079 934 109</a></dd></div><div><dt>ADDRESS</dt><dd>5301 NW 100th Ave, Coral Springs, FL 33076, US</dd></div></dl>
      </div>
      <div className="form-wrap" data-reveal><form action="https://benifacts-consulting-portfolio-170717.hostingersite.com/api/contact" method="post"><label>Full name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required /></label><div className="field-pair"><label>Company <small>(optional)</small><input name="company" type="text" placeholder="Company or entity name" /></label><label>Countries involved <small>(optional)</small><input name="countries" type="text" placeholder="e.g. US and India" /></label></div><label>What do you need help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Cross-border tax advisory &amp; planning</option><option>US tax compliance &amp; reporting</option><option>Sales tax planning &amp; compliance</option><option>Small business complete package</option><option>Bookkeeping, payroll &amp; business accounting</option><option>Business entity formation &amp; corporate secretary</option><option>Retirement plan (401(k)) administration</option><option>Personal tax planning / self-assessment</option><option>Estate &amp; gift tax planning</option><option>IRS audit support</option><option>Specialist advisory (healthcare, IT, SMEs)</option><option>Catch-up / streamlined filings</option><option>Something else</option></select></label><label>How did you hear about us? <small>(optional)</small><select name="source" defaultValue=""><option value="" disabled>Select an option</option><option>Google Search</option><option>Social Media</option><option>Event / Webinar</option><option>Google Ad</option><option>Accounting reference</option><option>Newsletter</option></select></label><label>Tell us a little more<textarea name="message" rows={4} placeholder="Which years are open, who owns what, and what you’re trying to do. Please don’t send account or ID numbers here." required /></label><label className="consent"><input type="checkbox" required /><span>I understand this form sends general information, not advice, and that no client relationship is created until an engagement letter is signed.</span></label><button className="send" type="submit">Send message <Plus aria-hidden="true" /></button><p className="form-note">We reply within 1 business day</p><p className="fineprint">By submitting, you agree to our <a href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy">Privacy Policy</a>. Your information is used only to respond to your enquiry.</p></form></div>
    </div>
  </section>;
}


function Index() {
  useEditorialMotion();
  return <div className="site">
    <div className="intro-curtain" aria-hidden="true"><Brand /></div>
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
