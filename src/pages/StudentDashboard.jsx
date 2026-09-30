import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function StudentDashboard() {
    return (
        <PageShell page="dashboard" auth="student">
            <div className="container">
                <div className="page-header">
                    <h1 id="welcomeMsg">
                        Welcome back!
                    </h1>
                    <p>
                        Here's what's happening with your learning
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="num" id="statEnrolled">
                            0
                        </div>
                        <div className="label">
                            Enrolled Courses
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statCompleted">
                            0
                        </div>
                        <div className="label">
                            Completed Courses
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statInProgress">
                            0
                        </div>
                        <div className="label">
                            In Progress
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statCertificates">
                            0
                        </div>
                        <div className="label">
                            Certificates Earned
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px"}}>
                    <h2 style={{fontSize: "20px"}}>
                        Continue Learning
                    </h2>
                    <a href="browse-courses.html" className="btn btn-secondary btn-sm">
                        Browse More Courses
                    </a>
                </div>
                <div className="grid grid-3" id="courseList"></div>
            </div>
            <LegacyPageScript src="/legacy/pages/student_dashboard.js" />
        </PageShell>
    );
}
