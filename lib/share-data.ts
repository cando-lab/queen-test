import { findResultBySlug, results, type ResultInfo } from "@/lib/test-data";

export type ResultSlug = ResultInfo["slug"];

export const homeShareMetadata = {
  title: "공주력 테스트",
  description: "나는 평민일까, 공주일까, 여왕일까?",
  image: "/home.png",
};

export function getResultShareCopy(slug: string) {
  const result = findResultBySlug(slug);

  if (!result) {
    return null;
  }

  return {
    title: `${result.title}형 공주력`,
    description: `나는 공주력 테스트에서 ${result.title}이 나왔다`,
    image: result.image,
    result,
    path: result.shareLink,
  };
}

export function getAllResultSlugs() {
  return results.map((result) => result.slug);
}
