import { Link } from "react-router-dom";
import { HeroFluid } from "../components/HeroFluid";
import { WorkCard } from "../components/WorkCard";
import { studioData, workList } from "../data/store";
import { toAssetUrl } from "../lib/asset";

export function HomePage() {
  return (
    <>
      {/* Hero — full viewport, immersive */}
      <section className="hero-full">
        <HeroFluid />
        <div className="hero-center">
          <img
            src={toAssetUrl("/images/logo.png")}
            alt="Oitebia Studio"
            className="hero-logo"
          />
          <p className="hero-eyebrow">AI Agent × Human Creative Studio</p>
          <h1 className="hero-headline">
            世界のサインを、<br />物語・歌・映像へ。
          </h1>
          <p className="hero-sub">
            物語を核に、映像と音楽を統合した短編作品を制作するクリエイティブスタジオ。
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/works">
              作品を見る
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* Works — series-agnostic */}
      <section className="section" id="works">
        <div className="section-header">
          <h2>Works</h2>
          <Link to="/works" className="section-link">すべて見る →</Link>
        </div>
        <div className="works-showcase">
          {workList.slice(0, 3).map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </section>

      {/* About — studio vision */}
      <section className="section">
        <div className="about-grid">
          <div className="about-text">
            <p className="about-eyebrow">About</p>
            <h2>五人の才能が、<br />一つの物語を紡ぐ。</h2>
            <p className="about-desc">
              Oitebia Studioは、小説・音楽・映像・デザインの専門家が集い、
              一つの物語を多角的に創り上げるクリエイティブスタジオです。
              AI技術と人間の感性を融合させ、新しいエンターテイメント体験を追求しています。
            </p>
          </div>
          <div className="about-stats">
            {studioData.metrics.map((metric) => (
              <div key={metric.label} className="stat-item">
                <span className="stat-value">{metric.value}</span>
                <span className="stat-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="section">
        <div className="section-header">
          <h2>Members</h2>
        </div>
        <div className="members-grid">
          {studioData.members.map((member) => (
            <article key={member.id} className="member-card">
              <div className="member-avatar">
                <img
                  src={toAssetUrl(member.thumbnail)}
                  alt={`${member.name}`}
                  loading="lazy"
                />
              </div>
              <div className="member-info">
                <p className="member-name">{member.name}</p>
                <p className="member-role">{member.role}</p>
                <p className="member-quote">「{member.catchphrase}」</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
