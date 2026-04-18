import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header({ evaluatorName = "Evaluator A" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle =
    location.pathname === "/home"
      ? "Dashboard"
      : location.pathname === "/evaluate"
      ? "Evaluate Faculty"
      : "";

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-brand">CBIT Evaluator</span>
        <span className="header-divider">|</span>
        <span className="header-page">{pageTitle}</span>
      </div>
      <div className="header-right">
        <button className="btn btn-outline" onClick={() => navigate("/home")}>
          🏠 Home
        </button>
        <button className="btn btn-danger" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;
