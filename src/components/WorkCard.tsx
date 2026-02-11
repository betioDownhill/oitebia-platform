import { Link } from "react-router-dom";
import type { Work } from "../types";
import { toAssetUrl } from "../lib/asset";

type Props = {
  work: Work;
};

export function WorkCard({ work }: Props) {
  return (
    <article className="panel work-card">
      <Link className="work-main" to={`/works/${work.slug}`} aria-label={`${work.title} の作品ページへ`}>
        <img className="work-thumb" src={toAssetUrl(work.thumbnail)} alt={`${work.title} サムネイル`} loading="lazy" />
        <p className="work-sense">{work.sense}</p>
        <h3>{work.title}</h3>
        <p className="work-tagline">{work.tagline}</p>
        <p className="work-highlight">{work.highlight}</p>
        <p className="work-link-text">作品ページへ</p>
      </Link>
    </article>
  );
}
