import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";
import { useCourses } from "../context/CourseContext";

export default function Home() {
    const { courses, loading, error, fetchCourses } = useCourses();
    return (
        <PageShell page="home" auth="public">
            <header style={{background: "linear-gradient(135deg,var(--primary),var(--secondary))", color: "#fff", padding: "70px 20px", textAlign: "center"}}>
                <h1 style={{fontSize: "36px", marginBottom: "14px"}}>
                    Learn New Skills, Anytime, Anywhere
                </h1>
                <p style={{fontSize: "16px", opacity: ".9", maxWidth: "600px", margin: "0 auto 26px"}}>
                    Join thousands of learners on our course management portal. Browse courses, track your progress and earn certificates.
                </p>
                <a href="browse-courses.html" className="btn" style={{background: "#fff", color: "var(--primary)"}}>
                    Browse Courses
                </a>
                <a href="register.html" className="btn" style={{background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid #fff"}}>
                    Get Started Free
                </a>
            </header>
            <div className="container">
                <div className="page-header" style={{textAlign: "center"}}>
                    <h1>
                        Featured Courses
                    </h1>
                    <p>
                        Hand-picked courses to help you get started
                    </p>
                </div>
                {loading && <div className="alert alert-info">Loading courses...</div>}
                {!loading && error && (
                    <div className="alert alert-error">
                        {error} <button type="button" className="btn btn-secondary btn-sm" onClick={fetchCourses}>Retry</button>
                    </div>
                )}
                {!loading && !error && (
                    <div className="grid grid-3">
                        {courses.slice(0, 3).map(course => (
                            <div className="card" key={course.id}>
                                <div className="card-thumb">
                                    {course.title.charAt(0)}
                                </div>
                                <div className="card-body">
                                    <span className="tag">
                                        {course.category}
                                    </span>
                                    <h3 style={{margin: "10px 0 6px"}}>
                                        {course.title}
                                    </h3>
                                    <p style={{color: "var(--muted)", fontSize: "14px"}}>
                                        {`By ${course.instructor}`}
                                    </p>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px"}}>
                                        <span className="price">
                                            ${course.price}
                                        </span>
                                        <a href={`course-details.html?id=${course.id}`} className="btn btn-primary btn-sm">
                                            View Course
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="footer-note">
                © 2026 LMS Portal. Built for learning.
            </div>
            
        </PageShell>
    );
}
