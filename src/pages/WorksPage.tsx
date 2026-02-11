import { workList } from "../data/store";
import { WorkCard } from "../components/WorkCard";

export function WorksPage() {
  return (
    <>
      <section className="panel intro">
        <h1>作品一覧</h1>
        <p className="lead">短編作品ごとの世界観、制作背景、本文を作品ページでご覧いただけます。</p>
      </section>

      <section className="grid three-cols">
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </section>
    </>
  );
}
