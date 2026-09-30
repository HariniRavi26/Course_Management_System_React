import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function ResetPassword() {
    return (
        <PageShell page="reset" auth="public">
            <div className="auth-wrap">
                <div className="auth-card">
                    <h2>
                        Reset Password
                    </h2>
                    <p className="sub">
                        Create a new password for your account
                    </p>
                    <div className="alert alert-success">
                        Email verified! Set a new password below.
                    </div>
                    <form id="resetForm" action="login.html" method="get" onSubmit={(e) => window.validateResetForm(e)} novalidate="">
                        <div className="form-group">
                            <label>
                                Email Address
                            </label>
                            <input type="email" id="email" name="email" placeholder="you@example.com" />
                            <div className="error-text" id="emailError"></div>
                        </div>
                        <div className="form-group">
                            <label>
                                New Password
                            </label>
                            <input type="password" id="password" name="password" placeholder="At least 6 characters" />
                            <div className="error-text" id="passwordError"></div>
                        </div>
                        <div className="form-group">
                            <label>
                                Confirm New Password
                            </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" />
                            <div className="error-text" id="confirmPasswordError"></div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Reset Password
                        </button>
                    </form>
                    <div className="switch">
                        <a href="login.html">
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
            <LegacyPageScript src="/legacy/pages/reset_password.js" needsCourses={false} />
        </PageShell>
    );
}
