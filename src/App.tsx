import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { WorksPage } from "./pages/WorksPage";
import { WorkDetailPage } from "./pages/WorkDetailPage";
import { NovelDetailPage } from "./pages/NovelDetailPage";

export function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <header className="site-header">
        <div className="container nav-wrap">
          <div className="brand">Oitebia Studio</div>
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
        <div className="container">Oitebia Studio / Founded 2026</div>
      </footer>
    </div>
  );
}
