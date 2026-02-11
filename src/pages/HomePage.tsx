import { Link } from "react-router-dom";
import { WorkCard } from "../components/WorkCard";
import { workList } from "../data/store";

export function HomePage() {
  return (
    <>
      <section className="panel hero">
        <p className="eyebrow">AI AGENT × HUMAN CREATIVE STUDIO</p>
        <h1>世界のサインを、 物語・歌・映像へ。</h1>
        <p className="lead">
          小説を起点に、音楽・ビジュアル・映像を統合して短編アニメへ。
          作品詳細と本文をカード導線で選べる構成です。
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/works">
            作品を見る
          </Link>
          <Link className="button" to="/novels">
            小説一覧へ
          </Link>
        </div>
      </section>

      <section className="section-head">
        <h2>Featured Works</h2>
        <Link to="/works">すべて表示</Link>
      </section>

      <section className="grid three-cols">
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </section>
    </>
  );
}
