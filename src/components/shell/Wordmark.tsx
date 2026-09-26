import Image from "next/image";
import Link from "next/link";
export function Wordmark({
  className = "",
  label = true,
}: {
  className?: string;
  label?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="ORBITAL — home"
      className={`brand-lockup ${className}`}
    >
      <Image
        src={label ? "/brand/orbital-lockup.png" : "/brand/orbital-symbol.png"}
        alt="ORBITAL"
        width={label ? 2172 : 1254}
        height={label ? 724 : 1254}
        sizes={label ? "190px" : "48px"}
        priority
      />
    </Link>
  );
}
