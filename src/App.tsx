import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WorksPage } from "./pages/WorksPage";
import { WorkDetailPage } from "./pages/WorkDetailPage";
import { NovelDetailPage } from "./pages/NovelDetailPage";
import { toAssetUrl } from "./lib/asset";

export function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <header className="site-header">
        <div className="container nav-wrap">
          <NavLink to="/" className="brand" aria-label="Oitebia Studio トップページ">
            <img src={toAssetUrl("/images/logo.png")} alt="Oitebia Studio" className="brand-logo" />
            <span className="brand-text">Oitebia Studio</span>
          </NavLink>
          <nav>
            <ul className="nav-list">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "current" : ""}`} end>
                  Top
                </NavLink>
              </li>
              <li>
                <NavLink to="/works" className={({ isActive }) => `nav-link ${isActive ? "current" : ""}`}>
                  作品一覧
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="container main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
          <Route path="/novels" element={<Navigate to="/works" replace />} />
          <Route path="/novels/:slug" element={<NovelDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <img src={toAssetUrl("/images/logo.png")} alt="" className="footer-logo" aria-hidden="true" />
          <p>Oitebia Studio / Founded 2026</p>
          <p className="footer-tagline">AI Agent × Human Creative Studio</p>
        </div>
      </footer>
    </div>
  );
}
