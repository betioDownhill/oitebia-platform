import { workList } from "../data/store";
import { WorkCard } from "../components/WorkCard";

export function WorksPage() {
  return (
    <>
      <section className="panel intro" style={{ marginTop: "2rem" }}>
        <h1>作品一覧</h1>
        <p className="lead">短編作品ごとの世界観、制作背景、本文を作品ページでご覧いただけます。</p>
      </section>

      <div className="works-showcase" style={{ marginTop: "1rem" }}>
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </>
  );
}
