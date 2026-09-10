import Section from "@/components/layout/Section";
import ProjectEntry from "./ProjectEntry";
import RevealText from "@/components/motion/RevealText";
import { projects } from "@/lib/site";

export default function Work() {
  return (
    <Section id="work" index="01" label="Selected work">
      <RevealText
        as="h2"
        text="Four systems, and what each one taught me."
        className="display mb-14 block max-w-[18ch] text-[clamp(2rem,5vw,4rem)]"
      />
      <div className="border-t border-rule">
        {projects.map((p) => (
          <ProjectEntry key={p.index} project={p} />
        ))}
      </div>
    </Section>
  );
}
