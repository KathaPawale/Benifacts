import { LetterText } from "../components/letter-text";
import { useImageInteractions } from "../components/use-image-interactions";
import { useGsapReveals } from "../components/use-gsap-reveals";
import { CaseStory } from "../components/case-story";
import { ServiceRail } from "../components/service-rail";
import { FilingBadge, ScrambleText, useMagneticButtons } from "../components/premium-interactions";
import { MotionLayer } from "../components/motion-layer";
import { MotionWords } from "../components/motion-words";
import { useSiteMotion } from "../components/use-site-motion";
import { AnimatedImage } from "../components/animated-image";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Menu, Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Hero background playlist — plays in this order, then loops back to the first clip.
const heroClips = [
  "/videos/hero-01-bridge-day.mp4", // Pixabay 272517 — bridge (shown first)
  "/videos/hero-02-bridge-dusk.mp4", // Pixabay 231178 — bridge at dusk
  "/videos/hero-03-city-avenue.mp4", // Pixabay 219134 — city avenue
] as const;
const heroPoster = "/images/hero-poster.jpg";
const cityPoster = "/images/contact-facade.webp";
const founderImage = "/images/benifacts-founder-cutout.png";
const teamImage = "/images/benifacts-team.png";
// If a local image file is missing, fall back to the copy stored in the Lovable project.
const LOVABLE_ASSETS = "https://id-preview--ec736e6a-a9cc-443e-8179-4339a84b1913.lovable.app/__l5e/assets-v1";
const lovableFallback: Record<string, string> = {
  [founderImage]: `${LOVABLE_ASSETS}/538f61b7-e6a0-42a8-9c3a-ba7c88d9bae5/benifacts-founder.jpg`,
  [teamImage]: `${LOVABLE_ASSETS}/da17968e-3ca5-427b-ab51-464fee4bfb3e/benifacts-team.png`,
};
const CROSSFADE_MS = 800;

const metaDescription = "Benifacts is a cross-border CPA firm in Coral Springs, Florida handling US international tax filings—5471, 5472, FBAR, 8938—and advisory for companies and founders operating across borders.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "font", href: "/fonts/manrope-400.woff", type: "font/woff", crossOrigin: "anonymous" },
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
  { number: "01", title: "Cross-border accounting", lead: "Multi-currency books that reconcile.", body: "Books that reconcile across entities and currencies—giving you a clear, consistent picture of performance on both sides of a border.", tags: "BOOKKEEPING  /  MULTI-CURRENCY  /  RECONCILIATION", href: "/services/cross-border-accounting" },
  { number: "02", title: "International tax compliance", lead: "One calendar for every return.", body: "Federal, state, and international returns managed on a single calendar—5471, 5472, FBAR, 8938, and the rest, filed correctly and on time.", tags: "5471  /  5472  /  FBAR  /  8938", href: "/services/international-tax-compliance" },
  { number: "03", title: "Founder & expansion advisory", lead: "Decisions made before year-end.", body: "Entity choice, treaty positions, relocation and expansion planning—considered guidance on the decisions that shape your next chapter.", tags: "STRUCTURING  /  TREATY POSITIONS  /  EXPANSION", href: "/services/founder-advisory" },
  { number: "04", title: "Virtual CFO & reporting", lead: "Reporting ready for the room.", body: "Parent-, board-, and investor-ready reporting, plus a cross-border Virtual CFO for founders who need strategic oversight without a full-time hire.", tags: "MIS  /  VIRTUAL CFO  /  BOARD REPORTING", href: "/services/virtual-cfo" },
];

const clients: Array<[string, string, string]> = [
  ["01", "Foreign companies entering the US", "5472, pro forma 1120, state nexus, and Beneficial Ownership Information (BOI) reporting where it applies to overseas owners setting up or running a US entity."],
  ["02", "US companies expanding abroad", "5471, 8858, 926, and GILTI/Subpart F for US parents funding subsidiaries or hiring overseas."],
  ["03", "Founders & expats with global income", "Forms 2555/1116, FBAR, and 8938 for US people living and earning in more than one country."],
  ["04", "Behind on US filings", "Streamlined procedures, delinquent FBAR, and reasonable cause—catch-up routes before the IRS makes contact."],
];

const faqs: Array<[string, string]> = [
  ["Is the call free?", "Yes. The first 20-minute call carries no fee and no obligation. It is general guidance, not advice on your facts, and no engagement exists until an engagement letter is signed by both parties."],
  ["Do I need documents ready?", "No. Bring the shape of the situation — which countries are involved, who owns what, and which years are open. Documents come later, once we agree a scope. Please don’t send identity or account numbers before then."],
  ["How do you keep my information safe?", "Documents move through a secure portal — never as email attachments. Enquiries submitted through this form are stored in a protected system and reviewed only by our team."],
];

function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand-lockup old-brand ${light ? "old-brand-light" : ""}`}><span className="old-brand-mark" aria-hidden="true"><i /><i /><i /></span><span>benifacts<span className="old-brand-dot">.</span><small>ADVISORY &amp; ACCOUNTING</small></span></span>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal is-visible ${className}`}>{children}</div>;
}

function SiteImage({ src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <img {...rest} src={src} onError={(e) => {
    const fallback = lovableFallback[src];
    if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
  }} />;
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
      // A buffering or autoplay failure leaves the current frame on screen.
      switching.current = false;
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
        onEnded={() => { if (layer === front) advance(); }}
      />
    ))}
  </>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const nav: Array<[string,string]> = [["Expertise", "#expertise"], ["Who we help", "#clients"], ["Our approach", "#approach"]];
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <a href="#top" aria-label="Benifacts home"><Brand light /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href}><ScrambleText text={label} /></a>)}</nav>
    <a aria-label="Let’s talk" className="header-cta" href="#contact"><LetterText text="Let’s talk" /> <ArrowUpRight size={16} /></a>
    <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <div className={`mobile-menu ${open ? "is-open" : ""}`}>{nav.map(([label, href], i) => <a aria-label={label} key={href} href={href} style={{ transitionDelay: `${i * 55}ms` }} onClick={() => setOpen(false)}><LetterText text={label} /></a>)}<a aria-label="Get in touch" href="#contact" onClick={() => setOpen(false)}><LetterText text="Get in touch" /></a></div>
  </header>;
}

function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <CinematicVideo className="hero-video" />
    <div className="hero-shade" data-decorative="true" />
    <div className="hero-grid" data-decorative="true" /><div className="cinematic-atmosphere" data-decorative="true" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    <div className="hero-content page-shell">
      <div className="hero-kicker hero-enter delay-1"><span /> CROSS-BORDER CPA FIRM · CORAL SPRINGS, FLORIDA <b>01 / 05</b></div>
      <div className="hero-copy">
        <p className="eyebrow hero-enter delay-2">ACCOUNTING · INTERNATIONAL FILINGS · ADVISORY</p>
        <h1 id="hero-title" className="hero-enter delay-3"><MotionWords>US tax clarity for<br />businesses and founders<br /><em>across borders.</em></MotionWords></h1>
        <p className="hero-lead hero-enter delay-4">Accounting, international filings, and advisory—coordinated around your business. From day-to-day books to cross-border decisions, Benifacts helps you move forward with confidence.</p>
        <div className="hero-actions hero-enter delay-5"><a aria-label="Book a 20-minute consultation" className="button-primary magnetic" href="#contact"><LetterText text="Book a 20-minute consultation" /> <ArrowUpRight /></a><a aria-label="Explore our services" className="text-action" href="#expertise"><LetterText text="Explore our services" /> <ArrowDown /></a></div>
      </div>
      <div className="hero-note hero-enter delay-5"><small>INDIA → US OPERATIONS</small><p>5472 and pro forma 1120 for Indian-owned US entities, plus 5471 and 8865 for US parents with Indian subsidiaries.</p></div>
      <a className="scroll-cue" href="#credibility" aria-label="Scroll to Why Benifacts"><LetterText text="SCROLL" /><ArrowDown size={16} /></a>
    </div>
  </section>;
}

function Index() {
  useMagneticButtons();
  useSiteMotion();
  useImageInteractions();
  useGsapReveals();
  return <div className="site"><MotionLayer /><Header /><main id="main"><Hero /><div className="editorial-flow">
    <section className="ticker" aria-label="Services"><div>{["Cross-border accounting", "Form 5471", "Form 5472", "FBAR", "Form 8938", "International tax", "Virtual CFO", "Founder advisory", "Streamlined filings", "Multi-entity books", "Treaty positions", "US compliance"].map((x) => <span key={x}>{x}<i>+</i></span>)}</div></section>

    <section id="credibility" className="section section-light credibility page-shell">
      <Reveal className="section-heading"><p className="eyebrow ink">01 / WHY BENIFACTS</p><h2><MotionWords>Credibility you can<br /><em>verify before you call.</em></MotionWords></h2><p>Cross-border tax work leaves little room for guesswork. These are the people, experience, and results behind every engagement.</p></Reveal>
      <div className="credibility-grid">
        <Reveal className="founder-panel"><div className="founder-portrait interactive-media"><div className="founder-portrait-drift media-drift"><SiteImage src={founderImage} alt="Founder and Lead CPA of Benifacts" width={1254} height={1254} loading="lazy" decoding="async" /></div></div><div className="founder-bio"><p className="eyebrow ink founder-title">FOUNDER & LEAD CPA</p><h3>Cross-border US international tax & advisory</h3><ul><li>Licensed Certified Public Accountant (CPA) — jurisdiction and licence number to be confirmed and displayed here.</li><li>Specialisation in US international filings: Forms 5471, 5472, FBAR, 8938, and related reporting.</li><li>Experience with inbound, outbound, and expat cross-border engagements.</li><li>Member of professional body — details to be confirmed.</li></ul><small>Specific name, credentials, and licence details will appear here once confirmed. We do not publish unverified credentials.</small></div></Reveal>
        <Reveal className="testimonial"><span className="quote-mark" aria-hidden="true">“</span><div className="quote-copy"><p className="eyebrow aqua">CLIENT TESTIMONIAL</p><blockquote>“Benifacts untangled three years of cross-border filings we had been avoiding. The scope was clear, the calendar was clear, and we finally knew what was owed and why.”</blockquote><small>Placeholder — client name, role and company will be added once publication consent is confirmed.</small></div></Reveal>
      </div>
      <CaseStory />
      <Reveal className="team-strip editorial-team"><div className="team-copy"><p className="eyebrow ink">THE TEAM</p><span className="team-motif" aria-hidden="true"><i/><i/><i/><i/></span><h3><MotionWords>Cross-border specialists behind every engagement</MotionWords></h3><p>Accounting, international filings, and advisory coordinated as one practice—so your books, forms, and decisions stay aligned.</p></div><figure><div className="team-image editorial-panorama"><div className="editorial-scale"><SiteImage src={teamImage} alt="Representative AI-generated placeholder of a professional advisory team in a modern office" width={1344} height={768} loading="lazy" decoding="async" /></div></div><figcaption>Temporary AI-generated image — representative placeholder only, not a photo of Benifacts staff. Real team photography to be supplied.</figcaption></figure></Reveal>
    </section>

    <section id="expertise" className="section section-dark expertise"><div className="ambient-field" data-decorative="true" aria-hidden="true"><span /><span /></div>
      <div className="page-shell"><Reveal className="section-heading split"><div><p className="eyebrow aqua">02 / OUR EXPERTISE <FilingBadge /></p><h2><MotionWords>The right perspective.<br /><em>The right next move.</em></MotionWords></h2></div><p>Integrated accounting, tax, and advisory built around one problem: US compliance for people and companies with a presence in more than one country.</p></Reveal>
      <AnimatedImage name="canary-wharf-skyline" width={1440} height={808} className="expertise-photo" />
      <ServiceRail>{services.map((s) => <a className="service-row" href={s.href} key={s.number}><span className="service-number">{s.number}</span><div><h3>{s.title}</h3><h4>{s.lead}</h4><p>{s.body}</p><small>{s.tags.split(/(  \/  )/).map((tag, index) => tag.includes("/") ? tag : <span className="keyword-token" key={index}>{tag}</span>)}</small></div><ArrowUpRight /></a>)}</ServiceRail>
      <Reveal className="filings"><p>INTERNATIONAL FILINGS MANAGED</p><div>{["5471", "5472", "FBAR", "8938", "2555", "1116"].map(x => <span key={x}>{x}</span>)}</div><small>+ 8865 · 926 · 1042-S</small></Reveal></div>
    </section>

    <section id="clients" className="section section-dark clients"><div className="cross-border-routes" data-decorative="true" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-shell"><Reveal className="section-heading split"><div><p className="eyebrow ink">03 / WHO WE HELP</p><h2><MotionWords>Built for ambition.<br /><em>Grounded in detail.</em></MotionWords></h2></div><div><p>Every cross-border client arrives in one of a few ways. We bring the financial discipline and strategic context to help address each one.</p><a aria-label="Find your way forward" className="text-action dark" href="#contact"><LetterText text="Find your way forward" /> <ArrowUpRight /></a></div></Reveal>
      <AnimatedImage name="canary-wharf-detail" width={1440} height={2566} className="clients-photo" />
      <div className="client-grid">{clients.map(([n,t,b]) => <Reveal className="client-panel" key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p><ArrowUpRight /></Reveal>)}</div></div>
      <div className="industries"><p>INDUSTRIES WE WORK IN</p><div className="industry-track"><span>IT services</span><span>Tech startups</span><span>Healthcare</span><span>Contractors & SMEs</span><span>Real estate</span><span>Relocation</span><span>IT services</span><span>Tech startups</span><span>Healthcare</span></div></div>
    </section>

    <section id="approach" className="section approach">
      <span className="approach-index" data-decorative="true" aria-hidden="true">01</span>
      <div className="page-shell approach-content"><Reveal><p className="eyebrow aqua">04 / THE BENIFACTS APPROACH</p><h2><MotionWords>Beyond the numbers.<br /><em>Closer to the decision.</em></MotionWords></h2><div className="values"><span>01 <b>Accuracy</b></span><span>02 <b>Transparency</b></span><span>03 <b>Integrity</b></span></div></Reveal>
      <div className="approach-story"><small className="approach-figure-label">FIG. 01 &nbsp; / &nbsp; THE PEOPLE BEHIND THE WORK</small><Reveal className="story-copy"><b>B.</b><h3>Simplifying complexity for businesses that don’t stop at the border.</h3><p>Benifacts is a Coral Springs, Florida accounting and advisory firm built around one problem: US compliance for people and companies with a presence in more than one country. We connect precise accounting with thoughtful advisory—translating financial complexity into clear, practical direction.</p></Reveal></div>
      <div className="process">{[["01","Assessment","A written obligation map."],["02","Optimization","A memo on the positions we recommend."],["03","Filing","Filed returns and filing confirmations."],["04","Monitoring","A deadline calendar and notice handling."]].map(([n,t,b]) => <Reveal className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p><Check /></Reveal>)}</div><a aria-label="Work with Benifacts" className="button-primary" href="#contact"><LetterText text="Work with Benifacts" /> <ArrowUpRight /></a></div>
    </section>


    <section id="contact" className="contact section"><div className="ambient-field ambient-contact" data-decorative="true" aria-hidden="true"><span /><span /></div>
      <div className="contact-backdrop" data-decorative="true"><img src={cityPoster} alt="" loading="lazy" aria-hidden="true" /><div /></div>
      <div className="page-shell contact-grid"><Reveal className="contact-copy"><p className="eyebrow aqua">05 / LET’S CONNECT</p><h2><MotionWords>Make your next<br />move <em>count.</em></MotionWords></h2><p>Tell us which countries are involved and what you’re trying to do. We’ll confirm which filings apply, what it costs, and what to do next — before you commit to anything.</p><ol><li><span>01</span>We review what you have already told us.</li><li><span>02</span>We confirm which US filings are likely to apply to you.</li><li><span>03</span>If it’s a fit, you get a written scope and fee.</li></ol></Reveal>
      <Reveal className="form-wrap"><form action="https://benifacts-consulting-portfolio-170717.hostingersite.com/api/contact" method="post"><label>Full name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@company.com" required /></label><div className="field-pair"><label>Company <small>(optional)</small><input name="company" type="text" placeholder="Company or entity name" /></label><label>Countries involved <small>(optional)</small><input name="countries" type="text" placeholder="e.g. US and India" /></label></div><label>What do you need help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Cross-border accounting</option><option>International tax compliance (5471 / 5472 / FBAR / 8938)</option><option>Founder & expansion advisory</option><option>Virtual CFO / reporting</option><option>Catch-up / streamlined filings</option><option>Something else</option></select></label><label>Tell us a little more<textarea name="message" rows={5} placeholder="Which years are open, who owns what, and what you’re trying to do. Please don’t send account or ID numbers here." required /></label><label className="consent"><input type="checkbox" required /><span>I understand this form sends general information, not advice, and that no client relationship is created until an engagement letter is signed.</span></label><button aria-label="Send message" className="button-primary submit" type="submit"><LetterText text="Send message" /> <ArrowUpRight /></button><p className="form-note">We reply within 1 business day</p><p className="fineprint">By submitting, you agree to our <a aria-label="Privacy Policy" href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy"><LetterText text="Privacy Policy" /></a>. Your information is used only to respond to your enquiry.</p></form></Reveal></div>
      <div className="page-shell contact-details"><div><small>DIRECT CONTACT</small><a href="mailto:info@benifactscpa.com">info@benifactscpa.com</a></div><div><small>OFFICE HOURS</small><p>Mon–Fri, 9am–6pm US Eastern</p></div><div><small>RESPONSE TIME</small><p>Replies within 1 business day</p></div><div><small>OUR OFFICE</small><p>5301 NW 100th Ave, Coral Springs, FL 33076</p></div><div><small>SENDING DOCUMENTS</small><p>Documents move through a secure portal — never as email attachments.</p></div></div>
      <div className="page-shell email-call"><a aria-label="Or email us to schedule a 20-minute call" href="mailto:info@benifactscpa.com?subject=Schedule%20a%2020-minute%20call%20%E2%80%94%20Benifacts"><LetterText text="Or email us to schedule a 20-minute call" /> <ArrowUpRight /></a></div>
    </section>

    <section className="faq section section-mist"><div className="page-shell"><p className="eyebrow ink">FREQUENTLY ASKED QUESTIONS</p><div className="faq-columns">{faqs.map(([q,a],i) => <Faq key={q} q={q} a={a} initiallyOpen={i===0} />)}</div></div></section>
    </div></main><Footer /></div>;
}

function Faq({ q, a, initiallyOpen }: { q: string; a: string; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return <div className={`faq-row ${open ? "is-open" : ""}`}><button aria-label={q} onClick={() => setOpen(!open)} aria-expanded={open}><LetterText text={q} />{open ? <Minus /> : <Plus />}</button><div className="faq-answer"><p>{a}</p></div></div>;
}

function Footer() {
  return <footer><div className="page-shell footer-main"><div><a href="#top" aria-label="Benifacts home"><Brand light /></a><p>Accounting and advisory<br />for a world in motion.</p></div><div><small>EXPLORE</small><a className="footer-link" href="#expertise"><ScrambleText text="Expertise" /></a><a className="footer-link" href="#clients"><ScrambleText text="Who we help" /></a><a className="footer-link" href="#approach"><ScrambleText text="Our approach" /></a><a className="footer-link" href="#credibility"><ScrambleText text="Why Benifacts" /></a></div><div><small>CONNECT</small><a aria-label="Get in touch" className="footer-link" href="#contact"><LetterText text="Get in touch" /></a><a aria-label="Email us" className="footer-link" href="mailto:info@benifactscpa.com"><LetterText text="Email us" /></a><a aria-label="Privacy Policy" className="footer-link" href="https://benifacts-consulting-portfolio-170717.hostingersite.com/privacy"><LetterText text="Privacy Policy" /></a><a aria-label="Current website" className="footer-link" href="https://www.benifactscpa.com/" target="_blank" rel="noreferrer"><LetterText text="Current website" /></a></div></div><div className="page-shell footer-bottom"><p>© 2026 Benifacts. All rights reserved.</p><p>Coral Springs, Florida · Serving clients across the US and abroad</p><a aria-label="BACK TO TOP ↑" href="#top"><LetterText text="BACK TO TOP ↑" /></a></div><p className="page-shell disclaimer">This is general information, not tax, legal, or accounting advice. No client relationship or engagement is created until an engagement letter is signed by both parties. Beneficial Ownership Information (BOI) reporting obligations depend on current FinCEN guidance, including any applicable exemptions for US-formed entities; confirm your position before acting.</p></footer>;
}
