import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공주력 테스트",
  description: "유쾌하고 빠르게 즐기는 공주력 심리테스트",
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
