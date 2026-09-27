import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="inner-hero not-found">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>Page not found.</h1>
      <p>Let’s get you back to the right next step.</p>
      <Link href="/" className="button">
        Back to home ↗
      </Link>
    </main>
  );
}
