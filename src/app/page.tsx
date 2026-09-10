import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Section from "@/components/layout/Section";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import { site, timeline } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Stack />

        <Section id="about" index="03" label="Background">
          <RevealText
            as="h2"
            text="Computer science at FAST, shipping production systems since the internship."
            className="display mb-12 block max-w-[20ch] text-[clamp(1.75rem,4.4vw,3.5rem)]"
          />
          <FadeIn stagger className="border-t border-rule">
            {timeline.map((t) => (
              <div
                key={`${t.org}-${t.role}`}
                data-fade
                className="grid grid-cols-1 gap-2 border-b border-rule py-7 md:grid-cols-[11rem_1fr] md:gap-10"
              >
                <span className="meta tabular-nums">{t.year}</span>
                <span>
                  <span className="block text-lg text-ink">{t.role}</span>
                  <span className="meta mt-1 block normal-case tracking-normal">
                    {t.org}
                  </span>
                  <span className="prose-lede mt-2 block text-[0.9375rem]">
                    {t.note}
                  </span>
                </span>
              </div>
            ))}
          </FadeIn>
        </Section>

        <Section id="contact" index="04" label="Contact">
          <RevealText
            as="h2"
            text="Open to 2026 roles in AI systems and backend engineering."
            className="display mb-10 block max-w-[16ch] text-[clamp(2rem,6vw,4.5rem)]"
          />
          <FadeIn stagger className="flex flex-col gap-4">
            <a
              data-fade
              data-magnetic
              href={`mailto:${site.email}`}
              className="link-wipe w-fit font-mono text-lg text-ink"
            >
              {site.email}
            </a>
            <div data-fade className="flex flex-wrap gap-x-8 gap-y-3">
              <a
                data-magnetic
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="meta link-wipe text-ink-soft hover:text-ink"
              >
                GitHub ↗
              </a>
              <a
                data-magnetic
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="meta link-wipe text-ink-soft hover:text-ink"
              >
                LinkedIn ↗
              </a>
            </div>
          </FadeIn>
        </Section>

        <footer className="border-t border-rule px-[var(--edge)] py-10">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4">
            <span className="meta">
              © {new Date().getFullYear()} {site.name}
            </span>
            <span className="meta">Karachi, PK</span>
          </div>
        </footer>
      </main>
    </>
  );
}
