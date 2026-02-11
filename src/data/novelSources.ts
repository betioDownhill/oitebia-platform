export type NovelSource = {
  slug: string;
  workTitle: string;
  sense: string;
  teaser: string;
  thumbnail: string;
  path: string;
};

export const novelSources: NovelSource[] = [
  {
    slug: "yui-miracle",
    workTitle: "AIアニメーター・ユイの小さな奇跡",
    sense: "視覚",
    teaser: "描いたイラストが3分だけ現実になる。",
    thumbnail: "/images/novels/yui-miracle.svg",
    path: "projects/yui-miracle/story/final/yui-final-oitebia.md"
  },
  {
    slug: "last-tuner",
    workTitle: "最後の調律師",
    sense: "聴覚",
    teaser: "ピアノに刻まれた記憶が聴こえる。",
    thumbnail: "/images/novels/last-tuner.svg",
    path: "projects/last-tuner/story/final/last-tuner-final.md"
  },
  {
    slug: "kintsugi-touch",
    workTitle: "継ぎの痕",
    sense: "触覚",
    teaser: "壊れた器に触れると、感情が流れ込む。",
    thumbnail: "/images/novels/kintsugi-touch.svg",
    path: "projects/work3/story/final/work3-final.md"
  }
];
