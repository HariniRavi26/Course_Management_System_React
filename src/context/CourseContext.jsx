import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";

/* =========================================================
   COURSE CONTEXT
   Single source of truth for course data.

     React component / legacy page script
              |
        CourseContext  (this file)
              |
        Axios  (src/services/api.js)
              |
        http://localhost:5000/courses   (JSON Server)
              |
        mock-api/db.json

   Exposes: courses, loading, error,
            fetchCourses(), addCourse(), updateCourse(), deleteCourse()
========================================================= */

const CourseContext = createContext(null);

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const withModules = (course) => ({ ...course, modules: course.modules || [] });

function friendlyMessage(err) {
    if (err && err.response) {
        return `The Mock API returned an error (${err.response.status}). Please try again.`;
    }
    return "Could not reach the Mock API at http://localhost:5000. Start it with \"npm run mock-api\" and try again.";
}

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mirrors `courses` so the write functions always see the latest list,
    // even when several are called back-to-back.
    const coursesRef = useRef([]);

    // The one place where the course list changes: React state AND the
    // synchronous cache (window.CourseBridge, created in legacy/js/data.js)
    // that the existing page scripts read through getCourses()/getCourseById().
    const commit = useCallback((next) => {
        coursesRef.current = next;
        setCourses(next);
        if (window.CourseBridge) window.CourseBridge.courses = next;
    }, []);

    /* ---- GET /courses ---- */
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get("/courses");
            commit(data.map(withModules));
        } catch (err) {
            setError(friendlyMessage(err));
        } finally {
            setLoading(false);
        }
    }, [commit]);

    /* ---- POST /courses ---- */
    const addCourse = useCallback(async (course) => {
        try {
            const payload = withModules({ ...course, id: course.id ?? newId() });
            const { data } = await api.post("/courses", payload);
            commit([...coursesRef.current, withModules(data)]);
            return data;
        } catch (err) {
            throw new Error(friendlyMessage(err));
        }
    }, [commit]);

    /* ---- PUT /courses/:id ---- */
    const updateCourse = useCallback(async (id, updates) => {
        try {
            const existing = coursesRef.current.find((c) => String(c.id) === String(id));
            const payload = withModules({ ...existing, ...updates, id: existing ? existing.id : id });
            const { data } = await api.put(`/courses/${payload.id}`, payload);
            commit(coursesRef.current.map((c) => (String(c.id) === String(id) ? withModules(data) : c)));
            return data;
        } catch (err) {
            throw new Error(friendlyMessage(err));
        }
    }, [commit]);

    /* ---- DELETE /courses/:id ---- */
    const deleteCourse = useCallback(async (id) => {
        try {
            await api.delete(`/courses/${id}`);
            commit(coursesRef.current.filter((c) => String(c.id) !== String(id)));
        } catch (err) {
            throw new Error(friendlyMessage(err));
        }
    }, [commit]);

    // Load once when the app starts (and again on every full page load).
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Let the legacy data.js functions addCourse/updateCourse/deleteCourse
    // (used by the existing Add/Edit Course forms) call through to this context.
    useEffect(() => {
        if (window.CourseBridge) {
            window.CourseBridge.api = { addCourse, updateCourse, deleteCourse };
        }
    }, [addCourse, updateCourse, deleteCourse]);

    const value = useMemo(
        () => ({ courses, loading, error, fetchCourses, addCourse, updateCourse, deleteCourse }),
        [courses, loading, error, fetchCourses, addCourse, updateCourse, deleteCourse]
    );

    return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourses() {
    const ctx = useContext(CourseContext);
    if (!ctx) throw new Error("useCourses must be used inside <CourseProvider>");
    return ctx;
}
