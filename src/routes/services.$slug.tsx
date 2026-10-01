import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GraffitiCursor } from "../components/graffiti-cursor";
import { Cross, Faq, Footer, Header, Label } from "../components/site-chrome";
import { useEditorialMotion } from "../components/use-editorial-motion";
import { serviceBySlug, services } from "../lib/services";

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

function ServicePage() {
  useEditorialMotion();
  const { slug } = Route.useParams();
  const service = serviceBySlug(slug)!;
  const single = service.blocks.length === 1;
  // Rotate three layouts so neighbouring parts, and neighbouring services, do not look the same.
  const offset = services.indexOf(service);
  return <div className="site">
    <div className="tone-canvas" aria-hidden="true"><div className="tone-noise" /></div>
    <GraffitiCursor />
    <Header home={false} />
    <main id="main">
      <section className="svc-hero" id="top" data-tone="navy" aria-labelledby="svc-title">
        <div className="shell">
          <a className="svc-back" href="/#expertise">← All services</a>
          <Label>{service.label}</Label>
          <h1 id="svc-title">{service.title}</h1>
          <p>{service.tagline}</p>
        </div>
      </section>

      <section className="svc-overview section-pad" data-tone="paper" aria-labelledby="svc-overview-title">
        <div className="shell">
          <div className="centered-head" data-reveal><h2 id="svc-overview-title">{service.overviewTitle}</h2></div>
          <ul className="svc-grid" data-count={service.overview.length}>{service.overview.map(([title, body], i) => <li className="svc-card" key={title} data-progress="card">
            <Cross /><span className="svc-n">{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p>
          </li>)}</ul>
        </div>
      </section>

      {service.blocks.map((block, n) => <section className={`svc-block svc-v${(offset + n) % 3} section-pad`} key={block.title} data-tone={n % 2 ? "paper" : "mist"} aria-label={block.title}>
        <div className="shell">
          <div className="svc-block-head" data-reveal>
            {!single && <Label>{String(n + 1).padStart(2, "0")} / {String(service.blocks.length).padStart(2, "0")}</Label>}
            <h2>{single ? "How we deliver it" : block.title}</h2>
            <p>{block.intro}</p>
          </div>
          <div className="svc-cols">
            <div className="svc-col" data-reveal>
              <h3>Why choose Benifacts</h3>
              <ul className="svc-list">{block.why.map(([title, body], i) => <li key={title} style={{ "--li": i } as React.CSSProperties}><b>{title}</b><span>{body}</span></li>)}</ul>
            </div>
            <div className="svc-col" data-reveal>
              <h3>Our approach</h3>
              <ol className="svc-list svc-steps">{block.approach.map(([title, body], i) => <li key={title} style={{ "--li": i } as React.CSSProperties}><i>{String(i + 1).padStart(2, "0")}</i><b>{title}</b><span>{body}</span></li>)}</ol>
            </div>
          </div>
          {block.services.length > 0 && <div className={`svc-included${(offset + n) % 2 ? " is-plain" : ""}`} data-reveal>
            <h3>{block.servicesTitle}</h3>
            <ul>{block.services.map(([title, body], i) => <li key={title} style={{ "--li": i } as React.CSSProperties}><b>{title}</b><span>{body}</span></li>)}</ul>
          </div>}
        </div>
      </section>)}

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
