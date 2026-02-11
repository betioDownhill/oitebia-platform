import { studioData, workList } from "../data/store";
import { toAssetUrl } from "../lib/asset";
import { WorkCard } from "../components/WorkCard";

export function WorksPage() {
  return (
    <>
      <section className="panel intro">
        <h1>作品一覧</h1>
        <p className="lead">短編作品ごとの世界観、制作背景、本文を作品ページでご覧いただけます。</p>
        {studioData.fetchError ? <p className="warn">一部のスタジオ情報を更新中です。</p> : null}
      </section>

      <section className="grid three-cols">
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </section>

      <section className="panel activity-block">
        <h2>スタジオ活動</h2>
        <ul>
          {studioData.activity.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="metrics-grid">
          {studioData.metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="panel members-block">
        <h2>メンバー紹介</h2>
        <div className="grid five-cols">
          {studioData.members.map((member) => (
            <article key={member.id} className="member-card">
              <img src={toAssetUrl(member.thumbnail)} alt={`${member.name} サムネイル`} loading="lazy" />
              <p className="member-name">{member.name}</p>
              <p>{member.role}</p>
              <p>{member.specialty}</p>
              <p>{member.catchphrase}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
