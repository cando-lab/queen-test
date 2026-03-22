"use client";

import { CoupangBanner } from "@/components/coupang-banner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { calculateResult, questions } from "@/lib/test-data";

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const currentQuestion = questions[currentIndex];
  const result = calculateResult(totalScore);
  const isFinished = currentIndex >= questions.length;

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

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-6 text-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 246, 251, 0.66), rgba(255, 243, 235, 0.72)), url("/home.png")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] flex-col items-center justify-between">
        <div className="flex flex-1 items-center justify-center py-4">
          <section className="w-full max-w-md rounded-[28px] border border-white/[0.45] bg-white/[0.68] p-5 shadow-soft backdrop-blur-sm sm:p-7">
            {!isFinished ? (
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-semibold text-berry/80">
                    <span>
                      {currentIndex + 1} / {questions.length}
                    </span>
                    <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.65]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose to-gold"
                      style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-[24px] bg-gradient-to-br from-white/70 to-cream/70 p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-rose/75">
                    Question {currentQuestion.id}
                  </p>
                  <h1 className="font-display text-[1.65rem] leading-snug text-berry sm:text-[1.9rem]">
                    {currentQuestion.prompt}
                  </h1>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => handleAnswer(option.score)}
                      className="w-full rounded-[22px] border border-white/50 bg-white/[0.72] px-4 py-4 text-sm leading-6 text-berry sm:text-base"
                    >
                      <span className="mb-1 block text-xs uppercase tracking-[0.3em] text-rose/65">
                        Choice {index + 1}
                      </span>
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
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

                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block rounded-full bg-gradient-to-r from-rose to-[#ec8caf] px-5 py-3 text-center text-sm font-semibold text-white sm:text-base"
                  >
                    당신을 위한 스트레스 해소템을 추천합니다
                  </a>

                  <div className="flex justify-center">
                    <p className="inline-flex whitespace-nowrap rounded-full bg-white/[0.72] px-3 py-1 text-center text-[10px] text-slate-500 backdrop-blur-sm sm:text-[11px]">
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

                <Link
                  href="/"
                  className="block w-full rounded-full bg-gradient-to-r from-berry to-rose px-5 py-3 text-base font-semibold text-white"
                >
                  다시하기
                </Link>
              </div>
            )}
          </section>
        </div>

        {!isFinished ? (
          <div className="w-full pb-1">
            <CoupangBanner />
          </div>
        ) : null}
      </div>
    </main>
  );
}
