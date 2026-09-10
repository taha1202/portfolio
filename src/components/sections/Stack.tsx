import Section from "@/components/layout/Section";
import FadeIn from "@/components/motion/FadeIn";
import { stack } from "@/lib/site";

export default function Stack() {
  return (
    <Section id="stack" index="02" label="Toolkit">
      <FadeIn stagger className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.group} data-fade>
            <h3 className="meta mb-4 border-b border-rule pb-2">{group.group}</h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-ink-soft transition-colors duration-300 hover:text-ember"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </FadeIn>
    </Section>
  );
}
