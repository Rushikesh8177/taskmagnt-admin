import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./component/login";
import RegisterPage from "./component/Registion";
import TaskPage from "./pages/TaskPage";
import ProjectPage from "./pages/ProjectPage";
import UserPage from "./pages/UserPage";
import VerifyPage from "./component/VerifyPage";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0 p-5 text-center" style={{ maxWidth: "450px" }}>
        <h1 className="fw-bold text-primary mb-3">Welcome, {user.name}</h1>
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-circle border border-3 border-primary shadow-sm mb-4"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        )}
        <p className="text-secondary">You’re successfully logged in 🎉</p>
        <button
          onClick={logout}
          className="btn btn-danger mt-4 px-4 py-2 fw-semibold rounded-pill shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      {/* 💙 Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top"
        style={{ letterSpacing: "0.5px" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            AuthApp
          </Link>

          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white fw-semibold">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-white fw-semibold">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white fw-semibold">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link text-white fw-semibold">
                      Tasks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/projects" className="nav-link text-white fw-semibold">
                      Projects
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user" className="nav-link text-white fw-semibold">
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={logout}
                      className="btn btn-light text-primary fw-semibold rounded-pill px-3 py-1"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ✨ Main Content */}
      <div className="py-5 bg-gradient" style={{ minHeight: "calc(100vh - 56px)" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/verify" element={<VerifyPage />} /> 
        </Routes>
      </div>

      {/* 🌈 Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto shadow-sm">
        <p className="mb-0">
          © {new Date().getFullYear()} <strong>AuthApp</strong> | Crafted with ❤️
        </p>
      </footer>
    </Router>
  );
}

// ✅ Wrap App in AuthProvider so all components can access AuthContext
export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
