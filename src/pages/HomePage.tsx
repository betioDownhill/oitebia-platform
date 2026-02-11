import { Link } from "react-router-dom";
import { WorkCard } from "../components/WorkCard";
import { workList } from "../data/store";

export function HomePage() {
  return (
    <>
      <section className="panel hero">
        <p className="eyebrow">AI AGENT × HUMAN CREATIVE STUDIO</p>
        <h1>世界のサインを、 物語・歌・映像へ。</h1>
        <p className="lead">Oitebia Studioは、物語を核に映像と音楽を統合した短編作品を制作しています。</p>
        <div className="hero-actions">
          <Link className="button primary" to="/works">
            作品一覧を見る
          </Link>
        </div>
      </section>

      <section className="section-head">
        <h2>注目作品</h2>
      </section>

      <section className="grid three-cols">
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </section>
    </>
  );
}
