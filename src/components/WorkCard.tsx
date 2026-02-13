import { Link } from "react-router-dom";
import type { Work } from "../types";
import { toAssetUrl } from "../lib/asset";

type Props = {
  work: Work;
};

export function WorkCard({ work }: Props) {
  return (
    <article className="wk-card">
      <Link className="wk-link" to={`/works/${work.slug}`} aria-label={`${work.title} の作品ページへ`}>
        <div className="wk-thumb-wrap">
          <img className="wk-thumb" src={toAssetUrl(work.thumbnail)} alt={`${work.title} サムネイル`} loading="lazy" />
          <span className="wk-badge">{work.sense}</span>
        </div>
        <div className="wk-body">
          <h3 className="wk-title">{work.title}</h3>
          <p className="wk-tagline">{work.tagline}</p>
        </div>
      </Link>
    </article>
  );
}
