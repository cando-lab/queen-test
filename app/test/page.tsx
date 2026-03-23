import { Suspense } from "react";
import { TestClient } from "./test-client";

function TestPageFallback() {
  return (
    <main
      className="relative h-screen overflow-hidden px-3 py-3 text-center sm:px-4 sm:py-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 246, 251, 0.66), rgba(255, 243, 235, 0.72)), url("/home.png")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 flex h-full items-center justify-center">
        <section className="w-full max-w-md rounded-[28px] border border-white/[0.45] bg-white/[0.68] p-5 text-center shadow-soft backdrop-blur-sm">
          <p className="text-sm text-berry/80">테스트 화면을 준비하고 있어요...</p>
        </section>
      </div>
    </main>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<TestPageFallback />}>
      <TestClient />
    </Suspense>
  );
}
