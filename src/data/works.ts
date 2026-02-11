export type Work = {
  slug: string;
  title: string;
  sense: string;
  tagline: string;
  synopsis: string;
  novelSlug: string;
  highlight: string;
  thumbnail: string;
};

export const works: Work[] = [
  {
    slug: "yui-miracle",
    title: "AIアニメーター・ユイの小さな奇跡",
    sense: "視覚",
    tagline: "描いたイラストが3分だけ現実になる。",
    synopsis:
      "新人アニメーターのユイは、絵を現実に出す力と引き換えに画力を失っていく。スタジオを守るためのプレゼンで力が暴走したあと、彼女に残ったのは鉛筆と震える手だけだった。",
    novelSlug: "yui-miracle",
    highlight: "キャラデザ / 背景 / 絵コンテ / 音楽計画",
    thumbnail: "/images/novels/yui-miracle.svg"
  },
  {
    slug: "last-tuner",
    title: "最後の調律師",
    sense: "聴覚",
    tagline: "ピアノに刻まれた記憶が聴こえる。",
    synopsis:
      "調律師の篠崎楓は、閉館するホール最後のピアノと向き合う。美しい記憶だけでなく痛みも抱えた音の層を弾き切った時、幼い日の夜想曲の真実に辿り着く。",
    novelSlug: "last-tuner",
    highlight: "短編3話構成 / 音主導の演出設計",
    thumbnail: "/images/novels/last-tuner.svg"
  },
  {
    slug: "kintsugi-touch",
    title: "継ぎの痕",
    sense: "触覚",
    tagline: "壊れた器に触れると、感情が流れ込む。",
    synopsis:
      "金継ぎ職人の神谷奏は、遺品の茶碗に残る怒りと絶望の奥で、不器用な愛を見つける。壊れた痕を消さず、痕ごと抱える再生の物語。",
    novelSlug: "kintsugi-touch",
    highlight: "触覚表現 / クローズアップ演出",
    thumbnail: "/images/novels/kintsugi-touch.svg"
  }
];
