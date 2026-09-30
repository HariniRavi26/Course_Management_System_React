import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Login() {
    return (
        <PageShell page="login" auth="public">
            <div className="auth-wrap">
                <div className="auth-card">
                    <h2>
                        Welcome Back
                    </h2>
                    <p className="sub">
                        Login to continue learning
                    </p>
                    <div className="alert alert-info" style={{fontSize: "13px"}}>
                        Demo logins — Student:
                        <b>
                            student@lms.com / student123
                        </b>
                        <br />
                        Admin:
                        <b>
                            admin@lms.com / admin123
                        </b>
                    </div>
                    <form id="loginForm" action="student-dashboard.html" method="get" onSubmit={(e) => window.validateLoginForm(e)} novalidate="">
                        <div className="form-group">
                            <label>
                                Email Address
                            </label>
                            <input type="email" id="email" name="email" placeholder="you@example.com" />
                            <div className="error-text" id="emailError"></div>
                        </div>
                        <div className="form-group">
                            <label>
                                Password
                            </label>
                            <input type="password" id="password" name="password" placeholder="Your password" />
                            <div className="error-text" id="passwordError"></div>
                        </div>
                        <div style={{textAlign: "right", marginBottom: "16px"}}>
                            <a href="forgot-password.html" style={{fontSize: "13px", color: "var(--primary)"}}>
                                Forgot Password?
                            </a>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>
                    </form>
                    <div className="switch">
                        Don't have an account?
                        <a href="register.html">
                            Register here
                        </a>
                    </div>
                </div>
            </div>
            
        </PageShell>
    );
}
