import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { OrbitalEvent } from "@/lib/analytics";
export type Tone = "light" | "dark";
type Props = {
  children: ReactNode;
  href: string;
  tone?: Tone;
  event?: OrbitalEvent;
  eventLabel?: string;
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
function Action({
  children,
  tone = "dark",
  event,
  eventLabel,
  className = "",
  arrow = true,
  variant,
  ...props
}: Props & { variant: string }) {
  return (
    <Link
      {...props}
      data-track={event}
      data-track-label={eventLabel}
      className={`orbital-button ${variant} tone-${tone} ${className}`}
    >
      <span className="button-label">{children}</span>
      {arrow && (
        <span className="button-arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </Link>
  );
}
export function PrimaryButton(props: Props) {
  return <Action {...props} variant="button-primary" />;
}
export function SecondaryButton(props: Props) {
  return <Action {...props} variant="button-secondary" />;
}
export function TextLink(props: Props) {
  return <Action {...props} variant="button-text" />;
}
