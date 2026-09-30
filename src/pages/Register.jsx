import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Register() {
    return (
        <PageShell page="register" auth="public">
            <div className="auth-wrap">
                <div className="auth-card">
                    <h2>
                        Create Account
                    </h2>
                    <p className="sub">
                        Sign up to start learning today
                    </p>
                    <form id="registerForm" action="student-dashboard.html" method="get" onSubmit={(e) => window.validateRegisterForm(e)} novalidate="">
                        <div className="form-group">
                            <label>
                                Full Name
                            </label>
                            <input type="text" id="name" name placeholder="John Doe" />
                            <div className="error-text" id="nameError"></div>
                        </div>
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
                            <input type="password" id="password" name="password" placeholder="At least 6 characters" />
                            <div className="error-text" id="passwordError"></div>
                        </div>
                        <div className="form-group">
                            <label>
                                Confirm Password
                            </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" />
                            <div className="error-text" id="confirmPasswordError"></div>
                        </div>
                        <div className="form-group">
                            <label>
                                I am registering as
                            </label>
                            <select id="role" name="role">
                                <option value="student">
                                    Student
                                </option>
                                <option value="admin">
                                    Admin / Instructor
                                </option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Create Account
                        </button>
                    </form>
                    <div className="switch">
                        Already have an account?
                        <a href="login.html">
                            Login here
                        </a>
                    </div>
                </div>
            </div>
            
        </PageShell>
    );
}
