import type { Metadata } from "next";
import { homeShareMetadata } from "@/lib/share-data";
import { getMetadataBase } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: homeShareMetadata.title,
  description: homeShareMetadata.description,
  openGraph: {
    title: homeShareMetadata.title,
    description: homeShareMetadata.description,
    images: [
      {
        url: homeShareMetadata.image,
        alt: homeShareMetadata.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeShareMetadata.title,
    description: homeShareMetadata.description,
    images: [homeShareMetadata.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
