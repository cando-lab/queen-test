export type Option = {
  text: string;
  score: number;
};

export type Question = {
  id: number;
  prompt: string;
  options: Option[];
};

export type ResultKey = "평민" | "귀족" | "공주" | "여왕";

export type ResultInfo = {
  title: ResultKey;
  description: string;
  extra?: string;
  image: string;
  accent: string;
  link: string;
  productCaption: string;
  slug: "commoner" | "noble" | "princess" | "queen";
};

export const questions: Question[] = [
  {
    id: 1,
    prompt: "월요일 아침 눈을 뜨자마자 거울을 보고 떠오르는 생각은?",
    options: [
      { text: "출근하기 ㅈ같네", score: 1 },
      { text: "이번주도 시작이다 힘내보자", score: 2 },
      { text: "신나는 월요일! 즐거운 출근길!", score: 3 },
      { text: "거울따위 보지 않음", score: 4 },
    ],
  },
  {
    id: 2,
    prompt: "감성 카페에서 예쁜 메뉴를 주문했다. 당신의 행동은?",
    options: [
      { text: "음! 맛있겠다!", score: 1 },
      { text: "예쁘네~ 눈에 담아둬야지", score: 2 },
      { text: "먹기전에 사진찍기 → 인스타", score: 3 },
      { text: "예쁘니까 친구들한테 공유", score: 4 },
    ],
  },
  {
    id: 3,
    prompt: "친구랑 만나서 인생네컷을 찍을거다. 당신의 옷차림은?",
    options: [
      { text: "그냥 아무거나 입었다", score: 1 },
      { text: "평소처럼 입었다", score: 2 },
      { text: "오늘 좀 신경좀 썼다", score: 3 },
      { text: "컨셉 정하고 나옴", score: 4 },
    ],
  },
  {
    id: 4,
    prompt: "단체 사진을 찍는데 “너 진짜 잘 나왔다” 라고 했다. 당신은?",
    options: [
      { text: "아 진짜? 하고 넘김", score: 1 },
      { text: "에이 뭐야~ 하면서 기분 좋음", score: 2 },
      { text: "그치? 오늘 좀 괜찮은데?", score: 3 },
      { text: "알아. 다시 한 장 더 찍자", score: 4 },
    ],
  },
  {
    id: 5,
    prompt: "친구가 약속시간에 말없이 30분 늦었다. 당신은?",
    options: [
      { text: "다음부터 나도 늦는다", score: 1 },
      { text: "왜 늦었냐고 한다", score: 2 },
      { text: "무슨 일 있었는지 물어본다", score: 3 },
      { text: "나도 방금 왔다고 한다", score: 4 },
    ],
  },
];

export const results: ResultInfo[] = [
  {
    title: "평민",
    description: "꾸미는 것보다 편한 게 중요하고 실용이 먼저다.",
    extra: "멋 부리기보다 편한 게 최고",
    image: "/img/1.png",
    accent: "from-rose-100 via-amber-50 to-orange-100",
    link: "https://link.coupang.com/a/d9nVLf",
    productCaption: "당신을 위한 스트레스 해소템을 추천합니다.",
    slug: "commoner",
  },
  {
    title: "귀족",
    description: "나를 어느 정도 아끼고 품위 있는 타입",
    image: "/img/2.png",
    accent: "from-amber-100 via-rose-50 to-yellow-100",
    link: "https://link.coupang.com/a/d9n0gK",
    productCaption: "당신을 위한 스트레스 해소템을 추천합니다.",
    slug: "noble",
  },
  {
    title: "공주",
    description: "예쁨과 분위기를 중요하게 생각하고 즐길 줄 안다",
    image: "/img/3.png",
    accent: "from-pink-100 via-rose-50 to-fuchsia-100",
    link: "https://link.coupang.com/a/d9n3gu",
    productCaption: "공주님을 위한 스트레스 해소템을 추천합니다.",
    slug: "princess",
  },
  {
    title: "여왕",
    description: "자존감이 높고 자연스럽게 중심이 되는 사람",
    image: "/img/4.png",
    accent: "from-rose-200 via-orange-100 to-yellow-100",
    link: "https://link.coupang.com/a/d9nYIa",
    productCaption: "퀸을 위한 스트레스 해소템을 추천합니다.",
    slug: "queen",
  },
];

export function calculateResult(totalScore: number): ResultInfo {
  if (totalScore <= 8) {
    return results[0];
  }

  if (totalScore <= 12) {
    return results[1];
  }

  if (totalScore <= 16) {
    return results[2];
  }

  return results[3];
}

export function findResultBySlug(slug: string | null): ResultInfo | null {
  if (!slug) {
    return null;
  }

  return results.find((item) => item.slug === slug) ?? null;
}
