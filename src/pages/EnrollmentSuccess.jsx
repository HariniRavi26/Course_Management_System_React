import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function EnrollmentSuccess() {
    return (
        <PageShell page="mycourses" auth="student">
            <div className="auth-wrap">
                <div className="auth-card" style={{textAlign: "center", maxWidth: "480px"}}>
                    <div style={{fontSize: "56px", marginBottom: "10px"}}>
                        🎉
                    </div>
                    <h2>
                        Enrollment Successful!
                    </h2>
                    <p className="sub" id="courseMsg">
                        You're all set to start learning.
                    </p>
                    <div style={{display: "flex", gap: "10px", marginTop: "20px"}}>
                        <a href="my-courses.html" className="btn btn-secondary" style={{flex: "1"}}>
                            My Courses
                        </a>
                        <a href="#" id="startBtn" className="btn btn-primary" style={{flex: "1"}}>
                            Start Learning
                        </a>
                    </div>
                </div>
            </div>
            <LegacyPageScript src="/legacy/pages/enrollment_success.js" />
        </PageShell>
    );
}
