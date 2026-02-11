import { Link } from "react-router-dom";
import type { Novel } from "../types";

type Props = {
  novel: Novel;
};

export function NovelCard({ novel }: Props) {
  return (
    <article className="panel novel-card">
      <img src={novel.thumbnail} alt={`${novel.workTitle} サムネイル`} loading="lazy" />
      <p className="work-sense">{novel.sense}</p>
      <h3>{novel.workTitle}</h3>
      <p className="work-tagline">{novel.teaser}</p>
      <Link className="action-card single" to={`/novels/${novel.slug}`}>
        <span className="action-title">本文を読む</span>
        <span className="action-sub">章ごとの読書ページへ</span>
      </Link>
    </article>
  );
}
