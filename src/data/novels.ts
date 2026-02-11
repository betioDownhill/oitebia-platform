export type Chapter = {
  id: string;
  heading: string;
  body: string;
};

export type Novel = {
  slug: string;
  workTitle: string;
  lead: string;
  chapters: Chapter[];
};

export const novels: Novel[] = [
  {
    slug: "yui-miracle",
    workTitle: "AIアニメーター・ユイの小さな奇跡",
    lead: "導入公開版。作品ページから映像・音楽への導線をつなぐための抜粋です。",
    chapters: [
      {
        id: "ch-1",
        heading: "第1章 3分の光",
        body:
          "ユイの線は、いつも少しだけ早い。誰よりも先に手を動かして、誰よりも遅く息を吐く。\n\nその日、彼女が描いた青い鳥は、紙の上からふっと浮き上がった。三分だけ。青は空気の中で震え、やがて光の粒になって消えた。\n\n同僚は誰も気づかない。気づいてはいけない。ユイはペン先を握り直し、次のカットを描いた。"
      },
      {
        id: "ch-2",
        heading: "第2章 代償",
        body:
          "魔法を使うほど、線は鈍くなる。前は迷わなかったカーブが、今は何度も途切れる。\n\nスタジオを救うプレゼンの日、ユイは最後の一枚を掲げた。現実へ押し出された映像は会場を満たし、歓声が上がる。\n\nその瞬間、彼女の右手はかすかに震え、鉛筆の芯が折れた。"
      }
    ]
  }
];
