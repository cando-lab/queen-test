"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ShareRedirect({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/test?result=${slug}`);
  }, [router, slug]);

  return (
    <main
      className="relative flex h-screen items-center justify-center overflow-hidden px-4 text-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 246, 251, 0.66), rgba(255, 243, 235, 0.72)), url("/home.png")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <section className="w-full max-w-md rounded-[28px] border border-white/[0.45] bg-white/[0.72] p-6 shadow-soft backdrop-blur-sm">
        <p className="text-sm text-berry/85">결과 화면으로 이동하고 있어요...</p>
        <Link
          href={`/test?result=${slug}`}
          className="mt-4 inline-block rounded-full bg-gradient-to-r from-rose to-[#ec8caf] px-5 py-3 text-sm font-semibold text-white"
        >
          결과 바로 보기
        </Link>
      </section>
    </main>
  );
}
