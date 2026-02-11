import { Link, useParams } from "react-router-dom";
import { findNovel } from "../data/store";

export function NovelDetailPage() {
  const { slug = "" } = useParams();
  const novel = findNovel(slug);

  if (!novel) {
    return (
      <section className="panel intro">
        <h1>小説が見つかりません</h1>
        <Link to="/novels">小説一覧へ戻る</Link>
      </section>
    );
  }

  return (
    <article className="detail-grid novels">
      <aside className="panel sticky-side">
        <img className="detail-thumb" src={novel.thumbnail} alt={`${novel.workTitle} サムネイル`} loading="lazy" />
        <h1>{novel.workTitle}</h1>
        <p className="lead">{novel.lead}</p>
        <div className="stack-gap">
          <Link className="button" to="/novels">
            小説一覧へ
          </Link>
          <Link className="button" to="/works">
            作品一覧へ
          </Link>
        </div>
        <h2>章目次</h2>
        <ol className="toc-list">
          {novel.chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>{chapter.heading}</a>
            </li>
          ))}
        </ol>
        {novel.fetchError ? <p className="warn">取得状態: {novel.fetchError}</p> : null}
      </aside>

      <section className="panel chapter-panel">
        {novel.chapters.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="chapter-block">
            <h2>{chapter.heading}</h2>
            {chapter.body.split("\n\n").map((paragraph, index) => (
              <p key={`${chapter.id}-${index}`}>{paragraph}</p>
            ))}
          </section>
        ))}
      </section>
    </article>
  );
}
