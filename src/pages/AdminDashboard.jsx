import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function AdminDashboard() {
    return (
        <PageShell page="dashboard" auth="admin">
            <div className="container">
                <div className="page-header">
                    <h1 id="welcomeMsg">
                        Welcome back!
                    </h1>
                    <p>
                        Here's an overview of your course portal
                    </p>
                </div>
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="num" id="statCourses">
                            0
                        </div>
                        <div className="label">
                            Total Courses
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statStudents">
                            0
                        </div>
                        <div className="label">
                            Registered Students
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statEnrollments">
                            0
                        </div>
                        <div className="label">
                            Total Enrollments
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statCompletions">
                            0
                        </div>
                        <div className="label">
                            Course Completions
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px"}}>
                    <h2 style={{fontSize: "20px"}}>
                        Your Courses
                    </h2>
                    <a href="add-course.html" className="btn btn-primary">
                        + Add New Course
                    </a>
                </div>
                <div className="grid grid-3" id="courseList"></div>
            </div>
            <LegacyPageScript src="/legacy/pages/admin_dashboard.js" />
        </PageShell>
    );
}
