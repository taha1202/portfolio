import { forwardRef } from "react";

type SectionProps = {
  /** Dossier index, e.g. "02" — rendered in the margin rail. */
  index?: string;
  label?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * The structural unit of the dossier: a numbered margin rail on the left,
 * content on the right. This asymmetric two-column rhythm is what keeps the
 * page reading as a technical document rather than a stack of centred cards.
 */
const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { index, label, id, children, className = "" },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative border-t border-rule px-[var(--edge)] py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-[8.5rem_1fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          {index && (
            <div className="meta text-ember tabular-nums">{index}</div>
          )}
          {label && (
            <div className="meta mt-2 md:mt-3">{label}</div>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
});

export default Section;
