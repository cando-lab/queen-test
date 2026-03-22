"use client";

import { CoupangBanner } from "@/components/coupang-banner";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculateResult, findResultBySlug, questions } from "@/lib/test-data";

export default function TestPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sharedResult = useMemo(
    () => findResultBySlug(searchParams.get("result")),
    [searchParams],
  );
  const isFinished = currentIndex >= questions.length;
  const showResult = Boolean(sharedResult) || isFinished;
  const result = sharedResult ?? calculateResult(totalScore);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAnswer = (score: number) => {
    const nextScore = totalScore + score;
    const isLastQuestion = currentIndex === questions.length - 1;

    setTotalScore(nextScore);

    if (isLastQuestion) {
      setCurrentIndex(questions.length);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${pathname}?result=${result.slug}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setToastMessage("링크가 복사됐어요!");

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
      }, 1800);
    } catch {
      window.alert("링크가 복사됐어요!");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTotalScore(0);
    setToastMessage("");
    router.replace("/test");
  };

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
      <div className="relative z-10 flex h-full flex-col items-center">
        <div className="flex min-h-0 w-full flex-1 items-stretch justify-center">
          <section className="flex w-full max-w-md min-h-0 flex-col rounded-[28px] border border-white/[0.45] bg-white/[0.68] p-4 shadow-soft backdrop-blur-sm sm:p-5">
            {!showResult ? (
              <div className="flex h-full min-h-0 flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-berry/80">
                    <span>
                      {currentIndex + 1} / {questions.length}
                    </span>
                    <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.65]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose to-gold"
                      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-[24px] bg-gradient-to-br from-white/70 to-cream/70 px-4 py-4">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-rose/75">
                    Question {currentQuestion.id}
                  </p>
                  <h1 className="font-display text-[1.42rem] leading-[1.2] text-berry sm:text-[1.7rem]">
                    {currentQuestion.prompt}
                  </h1>
                </div>

                <div className="grid gap-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => handleAnswer(option.score)}
                      className="flex min-h-12 w-full items-center justify-center rounded-[22px] border border-white/50 bg-white/[0.72] px-3 py-2 text-center text-[13px] leading-5 text-berry sm:text-sm"
                    >
                      <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-rose/65">
                        Choice {index + 1}
                      </span>
                      <span>{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center gap-3">
                <div className="space-y-3">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block"
                  >
                    <div
                      className={`overflow-hidden rounded-[24px] border border-white/50 bg-gradient-to-br ${result.accent} p-3`}
                    >
                      <Image
                        src={result.image}
                        alt={`${result.title} 결과 상품 추천 이미지`}
                        width={720}
                        height={720}
                        className="h-auto w-full rounded-[18px] object-cover"
                        priority
                      />
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="block w-full rounded-full bg-gradient-to-r from-[#ff6ea8] to-[#ff9dc4] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_22px_rgba(255,110,168,0.22)] sm:text-base"
                  >
                    결과 공유하기
                  </button>

                  <div className="flex justify-center">
                    <p className="inline-flex whitespace-nowrap rounded-full bg-white/[0.76] px-3 py-1 text-center text-[10px] text-slate-500 backdrop-blur-sm sm:text-[11px]">
                      이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="whitespace-nowrap font-display text-[1.8rem] leading-tight text-berry sm:text-[2.2rem]">
                    결과 : {result.title}
                  </h2>
                  <p className="whitespace-nowrap text-[12px] leading-5 text-berry/85 sm:text-sm">
                    한줄설명 : {result.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="block w-full rounded-full border border-white/60 bg-white/[0.72] px-5 py-3 text-base font-semibold text-berry"
                >
                  다시하기
                </button>
              </div>
            )}
          </section>
        </div>

        {!showResult ? (
          <div className="w-full shrink-0 pt-2">
            <CoupangBanner />
          </div>
        ) : null}
      </div>

      {toastMessage ? (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-4">
          <p className="rounded-full bg-white/[0.86] px-4 py-2 text-sm font-semibold text-berry shadow-soft backdrop-blur-sm">
            {toastMessage}
          </p>
        </div>
      ) : null}
    </main>
  );
}
