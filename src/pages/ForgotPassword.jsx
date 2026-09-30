import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function ForgotPassword() {
    return (
        <PageShell page="forgot" auth="public">
            <div className="auth-wrap">
                <div className="auth-card">
                    <h2>
                        Forgot Password
                    </h2>
                    <p className="sub">
                        Enter your email and we'll help you reset it
                    </p>
                    <form id="forgotForm" action="reset-password.html" method="get" onSubmit={(e) => window.validateForgotForm(e)} novalidate="">
                        <div className="form-group">
                            <label>
                                Email Address
                            </label>
                            <input type="email" id="email" name="email" placeholder="you@example.com" />
                            <div className="error-text" id="emailError"></div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Send Reset Link
                        </button>
                    </form>
                    <div className="switch">
                        <a href="login.html">
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
            
        </PageShell>
    );
}
