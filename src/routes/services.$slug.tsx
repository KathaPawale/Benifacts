import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { GraffitiCursor } from "../components/graffiti-cursor";
import { Faq, Footer, Header, Label } from "../components/site-chrome";
import { useEditorialMotion } from "../components/use-editorial-motion";
import { serviceBySlug, services, type ServiceBlock } from "../lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!serviceBySlug(params.slug)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const service = serviceBySlug(params.slug);
    const title = service ? `${service.name} | Benifacts` : "Benifacts";
    return {
      meta: [
        { title },
        { name: "description", content: service?.tagline ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: service?.tagline ?? "" },
      ],
    };
  },
  component: ServicePage,
});

type Pair = [string, string];

// Photo prefix per service; files live in public/images/services/<prefix>-hero|1..n-640|1280.webp (see IMAGE_CREDITS.md).
const photoPrefix: Record<string, string> = {
  "cross-border-advisory": "cb", "us-tax-compliance": "tc", "sales-tax": "st", "small-business": "sb",
  individuals: "in", "business-financial-services": "bf", "corporate-services": "cs", "specialist-advisory": "sa",
};

function Photo({ name, sizes = "(max-width: 900px) 100vw, 50vw", eager = false }: { name: string; sizes?: string; eager?: boolean }) {
  const base = `/images/services/${name}`;
  return <img src={`${base}-1280.webp`} srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`} sizes={sizes} width={1280} height={853} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />;
}

const two = (n: number) => String(n).padStart(2, "0");
const li = (i: number) => ({ "--li": i }) as React.CSSProperties;

/* ---- Lists: each part of a page picks a different way to present the same kind of content ---- */

function Reasons({ items, kind }: { items: Pair[]; kind: "check" | "columns" | "lead" }) {
  if (kind === "lead") {
    const [first, ...rest] = items;
    const [firstTitle, firstBody] = first ?? ["", ""];
    return <div className="sx-reasons-lead">
      <p className="sx-lead"><b>{firstTitle}.</b> {firstBody}</p>
      <ul className="sx-plain">{rest.map(([t, b], i) => <li key={t} style={li(i)}><b>{t}</b> — {b}</li>)}</ul>
    </div>;
  }
  return <ul className={kind === "check" ? "sx-check" : "sx-check sx-two"}>{items.map(([t, b], i) => <li key={t} style={li(i)}><Check aria-hidden="true" /><div><b>{t}</b><span>{b}</span></div></li>)}</ul>;
}

function Steps({ items, kind }: { items: Pair[]; kind: "numbered" | "timeline" | "line" }) {
  return <ol className={`sx-steps sx-steps-${kind}`}>{items.map(([t, b], i) => <li key={t} style={li(i)}><i>{two(i + 1)}</i><div><b>{t}</b><span>{b}</span></div></li>)}</ol>;
}

function Included({ title, items, kind }: { title: string; items: Pair[]; kind: "rows" | "tiles" | "columns" | "pills" }) {
  if (!items.length) return null;
  return <div className={`sx-included sx-included-${kind}`} data-reveal>
    <h3 className="sx-kicker">{title}</h3>
    <ul>{items.map(([t, b], i) => <li key={t} style={li(i)}>{kind !== "pills" && <i>{two(i + 1)}</i>}<b>{t}</b><span>{b}</span></li>)}</ul>
  </div>;
}

/* ---- Four part layouts, rotated so no two neighbouring parts (or services) share a structure ---- */

function Part({ block, n, total, layout, photo }: { block: ServiceBlock; n: number; total: number; layout: number; photo: string }) {
  const tag = total > 1 ? <Label>{two(n + 1)} / {two(total)}</Label> : <Label>How we deliver it</Label>;
  // Single-part pages already show the service title in the banner, so the part gets its own heading.
  const heading = <h2>{total > 1 ? block.title : "What working with us looks like"}</h2>;
  const why = <h3 className="sx-kicker">Why choose Benifacts</h3>;
  const how = <h3 className="sx-kicker">Our approach</h3>;

  if (layout === 0) {
    // Split: sticky photo on the left, reading column on the right.
    return <section className="sx-part sx-split" data-tone="paper" aria-label={block.title}>
      <div className="shell sx-split-grid">
        <figure className="sx-photo sx-sticky" data-reveal="image"><Photo name={photo} /></figure>
        <div className="sx-flow">
          <div data-reveal>{tag}{heading}<p className="sx-intro">{block.intro}</p></div>
          <div data-reveal>{why}<Reasons items={block.why} kind="check" /></div>
          <div data-reveal>{how}<Steps items={block.approach} kind="numbered" /></div>
          <Included title={block.servicesTitle} items={block.services} kind="columns" />
        </div>
      </div>
    </section>;
  }

  if (layout === 1) {
    // Banner: wide photo with the title over it, then three plain columns.
    return <section className="sx-part sx-banner" data-tone="mist" aria-label={block.title}>
      <div className="shell">
        <div className="sx-banner-media" data-reveal="image"><Photo name={photo} sizes="100vw" /><div className="sx-banner-text">{tag}{heading}</div></div>
        <p className="sx-intro sx-intro-wide" data-reveal>{block.intro}</p>
        <div className="sx-three">
          <div data-reveal>{why}<Reasons items={block.why} kind="lead" /></div>
          <div data-reveal>{how}<Steps items={block.approach} kind="timeline" /></div>
        </div>
        <Included title={block.servicesTitle} items={block.services} kind="tiles" />
      </div>
    </section>;
  }

  if (layout === 2) {
    // Reverse split: text first, framed photo on the right, steps as a horizontal line.
    return <section className="sx-part sx-reverse" data-tone="paper" aria-label={block.title}>
      <div className="shell">
        <div className="sx-reverse-top">
          <div data-reveal>{tag}{heading}<p className="sx-intro">{block.intro}</p>{why}<Reasons items={block.why} kind="columns" /></div>
          <figure className="sx-photo sx-framed" data-reveal="image"><Photo name={photo} /></figure>
        </div>
        <div data-reveal>{how}<Steps items={block.approach} kind="line" /></div>
        <Included title={block.servicesTitle} items={block.services} kind="rows" />
      </div>
    </section>;
  }

  // Editorial: centred title, dark approach panel beside a photo, services as pills.
  return <section className="sx-part sx-editorial" data-tone="mist" aria-label={block.title}>
    <div className="shell">
      <div className="sx-editorial-head" data-reveal>{tag}{heading}<p className="sx-intro">{block.intro}</p></div>
      <div className="sx-editorial-grid">
        <div className="sx-dark" data-reveal>{how}<Steps items={block.approach} kind="timeline" /></div>
        <div className="sx-editorial-side">
          <figure className="sx-photo sx-wide" data-reveal="image"><Photo name={photo} /></figure>
          <div data-reveal>{why}<Reasons items={block.why} kind="check" /></div>
        </div>
      </div>
      <Included title={block.servicesTitle} items={block.services} kind="pills" />
    </div>
  </section>;
}

/* ---- Overview: three formats, rotated by service ---- */

function Overview({ title, items, kind }: { title: string; items: Pair[]; kind: number }) {
  if (kind === 0) {
    return <section className="sx-overview sx-ov-rows" data-tone="paper" aria-labelledby="sx-ov">
      <div className="shell">
        <h2 id="sx-ov" data-reveal>{title}</h2>
        <ol data-reveal>{items.map(([t, b], i) => <li key={t} style={li(i)}><i>{two(i + 1)}</i><b>{t}</b><span>{b}</span><ArrowUpRight aria-hidden="true" /></li>)}</ol>
      </div>
    </section>;
  }
  if (kind === 1) {
    return <section className="sx-overview sx-ov-cards" data-tone="paper" aria-labelledby="sx-ov">
      <div className="shell">
        <h2 id="sx-ov" data-reveal>{title}</h2>
        <ul data-count={items.length}>{items.map(([t, b], i) => <li key={t} data-progress="card"><span className="sx-card-n">{two(i + 1)}</span><b>{t}</b><span>{b}</span></li>)}</ul>
      </div>
    </section>;
  }
  return <section className="sx-overview sx-ov-split" data-tone="paper" aria-labelledby="sx-ov">
    <div className="shell sx-ov-split-grid">
      <div data-reveal><h2 id="sx-ov">{title}</h2><p>Each engagement is led by your Primary Account Manager, from first conversation to ongoing support.</p></div>
      <ul data-reveal>{items.map(([t, b], i) => <li key={t} style={li(i)}><b>{t}</b><span>{b}</span></li>)}</ul>
    </div>
  </section>;
}

function ServicePage() {
  useEditorialMotion();
  const { slug } = Route.useParams();
  const service = serviceBySlug(slug)!;
  const offset = services.indexOf(service);
  const prefix = photoPrefix[service.slug]!;
  return <div className="site">
    <div className="tone-canvas" aria-hidden="true"><div className="tone-noise" /></div>
    <GraffitiCursor />
    <Header home={false} />
    <main id="main">
      <section className="sx-hero" id="top" data-tone="navy" aria-labelledby="svc-title">
        <div className="shell sx-hero-grid">
          <div className="sx-hero-text">
            <a className="svc-back" href="/#expertise">← All services</a>
            <Label>{service.label}</Label>
            <h1 id="svc-title">{service.title}</h1>
            <p>{service.tagline}</p>
          </div>
          <figure className="sx-hero-photo"><Photo name={`${prefix}-hero`} eager /></figure>
        </div>
      </section>

      <Overview title={service.overviewTitle} items={service.overview} kind={offset % 3} />

      {service.blocks.map((block, n) => <Part key={block.title} block={block} n={n} total={service.blocks.length} layout={(offset + n) % 4} photo={`${prefix}-${n + 1}`} />)}

      {service.faqs.length > 0 && <section className="faq section-pad" data-tone="navy" aria-labelledby="svc-faq-title">
        <div className="shell">
          <div className="centered-head" data-reveal><Label>FAQ</Label><h2 id="svc-faq-title">Frequently asked <em>questions.</em></h2></div>
          <div className="faq-list" data-reveal>{service.faqs.map(([q, a], i) => <Faq key={q} q={q} a={a} n={i + 1} initiallyOpen={i === 0} />)}</div>
        </div>
      </section>}

      <section className="svc-cta" data-tone="ocean" aria-labelledby="svc-cta-title">
        <div className="shell" data-reveal>
          <div className="svc-cta-row">
            <div><h2 id="svc-cta-title">Ready to simplify your <em>cross-border tax?</em></h2><p>Free consultation—we’ll assess your obligations at no cost.</p></div>
            <a className="button-primary" href="/#contact">Schedule a call <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <nav className="svc-others" aria-label="Other services"><small>OTHER SERVICES</small>{services.filter((s) => s.slug !== service.slug).map((s) => <a key={s.slug} href={`/services/${s.slug}/`}>{s.name}</a>)}</nav>
        </div>
      </section>
    </main>
    <Footer home={false} />
  </div>;
}
