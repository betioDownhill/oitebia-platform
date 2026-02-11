import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { findNovel } from "../data/store";
import { toAssetUrl } from "../lib/asset";

export function NovelDetailPage() {
  const { slug = "" } = useParams();
  const novel = findNovel(slug);
  const handleChapterJump = (chapterId: string) => {
    const target = document.getElementById(chapterId);
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <img className="detail-thumb" src={toAssetUrl(novel.thumbnail)} alt={`${novel.workTitle} サムネイル`} loading="lazy" />
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
        {novel.fetchError ? <p className="warn">取得状態: {novel.fetchError}</p> : null}
      </aside>

      <section className="panel chapter-panel">
        <div className="chapter-toc-mobile">
          <label htmlFor="chapter-select" className="chapter-select-label">
            章を選択
          </label>
          <select
            id="chapter-select"
            className="chapter-select"
            defaultValue=""
            onChange={(event) => {
              const chapterId = event.target.value;
              if (chapterId) {
                handleChapterJump(chapterId);
              }
            }}
          >
            <option value="" disabled>
              章を選んで移動
            </option>
            {novel.chapters.map((chapter) => (
              <option key={`opt-${chapter.id}`} value={chapter.id}>
                {chapter.heading}
              </option>
            ))}
          </select>
        </div>

        <nav className="chapter-toc" aria-label="章目次">
          {novel.chapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              className="chapter-pill"
              onClick={() => handleChapterJump(chapter.id)}
            >
              {chapter.heading}
            </button>
          ))}
        </nav>
        {novel.chapters.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="chapter-block">
            <h2>{chapter.heading}</h2>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.body}</ReactMarkdown>
            </div>
          </section>
        ))}
      </section>
    </article>
  );
}
