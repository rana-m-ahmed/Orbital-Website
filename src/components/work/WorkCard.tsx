import Link from "next/link";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { TextLink } from "@/components/ui/Button";
import { WORK_LABEL, type WorkItem } from "@/content/work";
export function WorkLabel({
  type,
  tone = "light",
}: {
  type: WorkItem["type"];
  tone?: "light" | "dark";
}) {
  return (
    <span className={`work-label work-label-${tone}`}>
      <span aria-hidden="true" />
      {WORK_LABEL[type]}
    </span>
  );
}
export function FeatureCase({ item }: { item: WorkItem }) {
  return (
    <article className="featured-project">
      <div className="featured-project-preview">
        <ProductFrame variant={item.frame} title={item.title} />
      </div>
      <div className="featured-project-copy">
        <WorkLabel type={item.type} />
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <TextLink
          href={`/work/${item.slug}`}
          event="work_case_open"
          eventLabel={item.slug}
        >
          Explore the system
        </TextLink>
      </div>
    </article>
  );
}
export function SecondaryCase({ item }: { item: WorkItem }) {
  return (
    <article className="secondary-project">
      <Link
        className="secondary-project-preview"
        href={`/work/${item.slug}`}
        aria-label={`Explore ${item.title}`}
      >
        <ProductFrame variant={item.frame} title={item.title} />
      </Link>
      <div className="secondary-project-copy">
        <WorkLabel type={item.type} />
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <TextLink
          href={`/work/${item.slug}`}
          event="work_case_open"
          eventLabel={item.slug}
        >
          Explore the system
        </TextLink>
      </div>
    </article>
  );
}
