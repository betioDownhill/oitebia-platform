import { WorkCard } from "../components/WorkCard";
import { studioData, workList } from "../data/store";
import { toAssetUrl } from "../lib/asset";

export function WorksPage() {
  return (
    <>
      <section className="panel intro">
        <h1>Works & Studio</h1>
        <p className="lead">
          作品一覧に加え、スタジオ活動状況とメンバー紹介を表示します。
          情報はビルド時に同期して公開します。
        </p>
        {studioData.fetchError ? <p className="warn">同期状態: {studioData.fetchError}</p> : null}
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
