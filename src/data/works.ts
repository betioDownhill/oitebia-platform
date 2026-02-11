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
    thumbnail: "/images/sample.png"
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
    thumbnail: "/images/sample.png"
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
    thumbnail: "/images/sample.png"
  },
  {
    slug: "residual-scent",
    title: "残り香",
    sense: "嗅覚",
    tagline: "人の記憶を香りとして嗅ぎ取る。",
    synopsis:
      "フリーランス調香師の蓮は、人の記憶を香りとして感じ取る力を持つ。余命宣告を受けた依頼人のため最後の一本を作る過程で、自身の喪失と向き合う。",
    novelSlug: "residual-scent",
    highlight: "香りのレイヤー演出 / 記憶再生",
    thumbnail: "/images/sample.png"
  },
  {
    slug: "taste-blind",
    title: "味知らず",
    sense: "味覚",
    tagline: "感情を味として感じ取る食堂の物語。",
    synopsis:
      "食堂『しお』の店主・凛は、客の感情を味として感じ取る。何を食べても味がしない老人との対話を通じて、凍結した心を解きほぐしていく。",
    novelSlug: "taste-blind",
    highlight: "味覚×感情設計 / 日常ドラマ",
    thumbnail: "/images/sample.png"
  }
];
