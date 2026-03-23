import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareRedirect } from "./share-redirect";
import { getAllResultSlugs, getResultShareCopy } from "@/lib/share-data";
import { getMetadataBase } from "@/lib/site";

type SharePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllResultSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { slug } = await params;
  const shareCopy = getResultShareCopy(slug);

  if (!shareCopy) {
    return {};
  }

  return {
    metadataBase: getMetadataBase(),
    title: shareCopy.title,
    description: shareCopy.description,
    openGraph: {
      title: shareCopy.title,
      description: shareCopy.description,
      images: [
        {
          url: shareCopy.image,
          alt: shareCopy.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: shareCopy.title,
      description: shareCopy.description,
      images: [shareCopy.image],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { slug } = await params;
  const shareCopy = getResultShareCopy(slug);

  if (!shareCopy) {
    notFound();
  }

  return <ShareRedirect slug={slug} />;
}
