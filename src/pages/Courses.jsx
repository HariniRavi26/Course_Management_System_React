import { useState } from "react";
import PageShell from "../components/PageShell";
import { useCourses } from "../context/CourseContext";

export default function Courses() {
    const { courses, loading, error, fetchCourses, deleteCourse } = useCourses();
    const [actionError, setActionError] = useState("");

    async function removeCourse(id) {
        if (!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) return;
        setActionError("");
        try {
            await deleteCourse(id);
        } catch (err) {
            setActionError(err.message);
        }
    }

    return (
        <PageShell page="manage" auth="admin">
            <div className="container">
                <div className="page-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <h1>
                            Manage Courses
                        </h1>
                        <p>
                            Add, edit, or remove courses from your portal
                        </p>
                    </div>
                    <a href="add-course.html" className="btn btn-primary">
                        + Add New Course
                    </a>
                </div>
                {actionError && <div className="alert alert-error">{actionError}</div>}
                <table>
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Instructor
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Modules
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody id="courseTableBody">
                        {loading && (
                            <tr><td colSpan="6" style={{textAlign: "center", color: "var(--muted)"}}>Loading courses...</td></tr>
                        )}
                        {!loading && error && (
                            <tr><td colSpan="6" style={{textAlign: "center", color: "var(--danger)"}}>
                                {error} <button type="button" className="btn btn-secondary btn-sm" onClick={fetchCourses}>Retry</button>
                            </td></tr>
                        )}
                        {!loading && !error && !courses.length && (
                            <tr><td colSpan="6" style={{textAlign: "center", color: "var(--muted)"}}>No courses found.</td></tr>
                        )}
                        {!loading && !error && courses.map(c => (
                            <tr key={c.id}>
                                <td><b>{c.title}</b></td>
                                <td>{c.category}</td>
                                <td>{c.instructor}</td>
                                <td>${c.price}</td>
                                <td>{c.modules.length}</td>
                                <td>
                                    <a href={`course-details.html?id=${c.id}`} className="btn btn-secondary btn-sm">View</a>{" "}
                                    <a href={`edit-course.html?id=${c.id}`} className="btn btn-primary btn-sm">Edit</a>{" "}
                                    <button className="btn btn-danger btn-sm" onClick={() => removeCourse(c.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageShell>
    );
}
