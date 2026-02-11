import { NovelCard } from "../components/NovelCard";
import { novelList } from "../data/store";

export function NovelsPage() {
  return (
    <>
      <section className="panel intro">
        <h1>Novel Library</h1>
        <p className="lead">小説をサムネイル付きカードで選択し、本文ページへ進めます。</p>
      </section>

      <section className="grid novels-grid">
        {novelList.map((novel) => (
          <NovelCard key={novel.slug} novel={novel} />
        ))}
      </section>
    </>
  );
}
