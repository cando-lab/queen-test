"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    if (isStarting) {
      return;
    }

    setIsStarting(true);
    timerRef.current = setTimeout(() => {
      router.push("/test");
    }, 420);
  };

  return (
    <main
      className="relative flex h-screen min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/home.png")' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#3f2aa1]/16" />

      <div className="relative h-screen w-full max-w-[768px]">
        <button
          type="button"
          onClick={handleStart}
          aria-label="공주력 테스트 시작"
          className="absolute left-1/2 top-[83.4%] z-20 h-[13.5%] min-h-[88px] w-[48%] min-w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-[999px] bg-transparent"
        >
          <span
            className={`pointer-events-none absolute inset-0 rounded-[999px] ${
              isStarting ? "start-sparkle is-active" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </main>
  );
}
