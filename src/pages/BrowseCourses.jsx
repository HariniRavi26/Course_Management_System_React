import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

export default function BrowseCourses() {
    const { courses, loading, error, fetchCourses } = useCourses();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");

    const categories = useMemo(() => [...new Set(courses.map(c => c.category))], [courses]);
    const filtered = useMemo(() => courses.filter(c => {
        const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = !category || c.category === category;
        return matchesQuery && matchesCategory;
    }), [courses, query, category]);

    return (
        <PageShell page="browse" auth="student">
            <div className="container">
                <div className="page-header">
                    <h1>Browse Courses</h1>
                    <p>Discover courses to boost your skills</p>
                </div>
                <div style={{display:"flex",gap:"12px",marginBottom:"24px",flexWrap:"wrap"}}>
                    <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search courses..." style={{flex:2,minWidth:"200px"}} />
                    <select value={category} onChange={e => setCategory(e.target.value)} style={{flex:1,minWidth:"160px"}}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                {loading && <div className="alert alert-info">Loading courses...</div>}
                {!loading && error && (
                    <div className="alert alert-error">
                        {error} <button type="button" className="btn btn-secondary btn-sm" onClick={fetchCourses}>Retry</button>
                    </div>
                )}
                {!loading && !error && (
                    <div className="grid grid-3">
                        {filtered.map(course => <CourseCard key={course.id} course={course} />)}
                        {!filtered.length && <p style={{color:"var(--muted)"}}>No courses match your search.</p>}
                    </div>
                )}
            </div>
        </PageShell>
    );
}
