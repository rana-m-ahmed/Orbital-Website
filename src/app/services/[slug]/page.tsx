import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePage, servicePageSpecs } from "@/components/ServicePage";

export function generateStaticParams() {
  return Object.keys(servicePageSpecs).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePageSpecs[slug];
  return pageMetadata(
    s?.name ?? "Not found",
    s?.copy ?? "Page not found.",
    "/services/" + slug,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePageSpecs[slug];
  if (!s) notFound();
  return <ServicePage spec={s} />;
}
