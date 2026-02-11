import { Link } from "react-router-dom";
import type { Work } from "../types";

type Props = {
  work: Work;
};

export function WorkCard({ work }: Props) {
  return (
    <article className="panel work-card">
      <Link className="work-main" to={`/works/${work.slug}`} aria-label={`${work.title} の作品詳細へ`}>
        <img className="work-thumb" src={work.thumbnail} alt={`${work.title} サムネイル`} loading="lazy" />
        <p className="work-sense">{work.sense}</p>
        <h3>{work.title}</h3>
        <p className="work-tagline">{work.tagline}</p>
        <p className="work-highlight">{work.highlight}</p>
      </Link>

      <div className="card-action-grid">
        <Link className="action-card" to={`/works/${work.slug}`}>
          <span className="action-title">作品詳細</span>
          <span className="action-sub">あらすじ・制作情報</span>
        </Link>
        <Link className="action-card" to={`/novels/${work.novelSlug}`}>
          <span className="action-title">小説を読む</span>
          <span className="action-sub">本文ページ</span>
        </Link>
      </div>
    </article>
  );
}
