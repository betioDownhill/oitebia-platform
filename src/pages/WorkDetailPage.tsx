import { Link, useParams } from "react-router-dom";
import { findWork } from "../data/store";

export function WorkDetailPage() {
  const { slug = "" } = useParams();
  const work = findWork(slug);

  if (!work) {
    return (
      <section className="panel intro">
        <h1>作品が見つかりません</h1>
        <Link to="/works">作品一覧へ戻る</Link>
      </section>
    );
  }

  return (
    <article className="detail-grid">
      <section className="panel">
        <img className="detail-thumb" src={work.thumbnail} alt={`${work.title} サムネイル`} loading="lazy" />
        <p className="work-sense">{work.sense}</p>
        <h1>{work.title}</h1>
        <p className="work-tagline">{work.tagline}</p>
        <p>{work.synopsis}</p>
      </section>

      <aside className="panel">
        <h2>導線</h2>
        <div className="stack-gap">
          <Link className="button primary" to={`/novels/${work.novelSlug}`}>
            この作品の小説を読む
          </Link>
          <Link className="button" to="/novels">
            小説一覧へ
          </Link>
          <Link className="button" to="/works">
            作品一覧へ
          </Link>
        </div>

        <h2>制作ハイライト</h2>
        <p>{work.highlight}</p>
      </aside>
    </article>
  );
}
