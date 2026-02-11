import { toAssetUrl } from "../lib/asset";

export function HeroFluid() {
  return (
    <div className="hero-fluid" aria-hidden="true">
      <iframe
        className="hero-fluid-frame"
        src={toAssetUrl("/fluid-bg/index.html")}
        loading="eager"
        title=""
        tabIndex={-1}
      />
    </div>
  );
}
