import { Link, useParams } from "react-router-dom";
import { findWork } from "../data/store";
import { toAssetUrl } from "../lib/asset";

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
        <img className="detail-thumb" src={toAssetUrl(work.thumbnail)} alt={`${work.title} サムネイル`} loading="lazy" />
        <p className="wk-badge-inline">{work.sense}</p>
        <h1>{work.title}</h1>
        <p className="work-tagline">{work.tagline}</p>
        <p>{work.synopsis}</p>

        {/* Video section — placeholder for future anime/CM */}
        <div className="video-section">
          <h2>映像</h2>
          <div className="video-placeholder">
            <div className="video-placeholder-inner">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <p>短編アニメーション / CM — 準備中</p>
            </div>
          </div>
        </div>
      </section>

      <aside className="panel sticky-side">
        <h2>閲覧</h2>
        <div className="stack-gap">
          <Link className="btn btn-primary" to={`/novels/${work.novelSlug}`}>
            本文を読む
          </Link>
          <Link className="btn" to="/works">
            作品一覧へ
          </Link>
        </div>

        <h2>制作情報</h2>
        <p className="detail-highlight">{work.highlight}</p>
      </aside>
    </article>
  );
}
