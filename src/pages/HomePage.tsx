import { Link } from "react-router-dom";
import { WorkCard } from "../components/WorkCard";
import { studioData, workList } from "../data/store";
import { toAssetUrl } from "../lib/asset";

export function HomePage() {
  return (
    <>
      <section className="panel hero">
        <p className="eyebrow">AI AGENT × HUMAN CREATIVE STUDIO</p>
        <h1>世界のサインを、 物語・歌・映像へ。</h1>
        <p className="lead">Oitebia Studioは、物語を核に映像と音楽を統合した短編作品を制作しています。</p>
        <div className="hero-actions">
          <Link className="button primary" to="/works">
            作品一覧を見る
          </Link>
        </div>
      </section>

      <section className="section-head">
        <h2>注目作品</h2>
      </section>

      <section className="grid three-cols">
        {workList.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </section>

      <section className="panel activity-block">
        <h2>スタジオ活動</h2>
        {studioData.fetchError ? <p className="warn">一部のスタジオ情報を更新中です。</p> : null}
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
