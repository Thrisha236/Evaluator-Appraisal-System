import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!employeeId.trim() || !password.trim()) {
      setError("Please enter both Employee ID and Password.");
      return;
    }

    if (!captchaToken) {
      setError("Please complete the security check.");
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="login-page">
      
      {/* LEFT SIDE */}
      <div className="login-left">

        {/* ✅ FIXED LOGO (no circle, bigger like reference) */}
        <img 
          src="/logo.png" 
          alt="CBIT Logo" 
          className="login-logo"
        />

        <div className="login-college-name">
          Chaitanya Bharathi<br />Institute of Technology
        </div>

        <div className="login-college-sub">
          Performance Appraisal System
        </div>

        <p className="login-tagline">
          "Empowering academic excellence<br />
          through transparent evaluation<br />
          and continuous growth."
        </p>

        <span className="login-est">EST. 1979</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-form-box">

          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your evaluator portal</p>

          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. EVAL2025001"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CAPTCHA */}
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label className="form-label" style={{ alignSelf: 'flex-start' }}>
                Security Check
              </label>

              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(val) => setCaptchaToken(val)}
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error" style={{ marginBottom: '15px' }}>
                ⚠ {error}
              </div>
            )}

            <button className="login-btn" type="submit">
              Sign In
            </button>

          </form>

          <p className="login-footer">
            Chaitanya Bharathi Institute of Technology © Academic Performance Appraisal System
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;