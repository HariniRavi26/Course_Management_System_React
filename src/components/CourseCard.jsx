import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
    const enrolled = window.getCurrentUser && window.getCurrentUser() && window.isEnrolled(window.getCurrentUser().email, course.id);
    return (
        <div className="card">
            <div className="card-thumb">{course.title.charAt(0)}</div>
            <div className="card-body">
                <span className="tag">{course.category}</span>
                <h3 style={{margin:"10px 0 6px"}}>{course.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"14px"}}>By {course.instructor} · {course.modules.length} modules</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"14px"}}>
                    <span className="price">${course.price}</span>
                    <Link to={`/course-details?id=${encodeURIComponent(course.id)}`} className="btn btn-primary btn-sm">{enrolled ? "Continue" : "View Course"}</Link>
                </div>
            </div>
        </div>
    );
}
