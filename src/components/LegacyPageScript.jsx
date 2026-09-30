import { useEffect, useRef, useState } from "react";
import { useCourses } from "../context/CourseContext";

/* Runs one of the original page scripts (public/legacy/pages/*.js).
   Those scripts read courses synchronously (getCourses/getCourseById), so by
   default the script is started only AFTER CourseContext has loaded the courses
   from the Mock API. Pages that never use course data (login, register, ...)
   pass needsCourses={false} and start immediately, exactly as before. */
export default function LegacyPageScript({ src, needsCourses = true }) {
    const { loading, error, fetchCourses } = useCourses();
    const [dataReady, setDataReady] = useState(false);
    useEffect(() => {
        if (!window.LMSReady) { setDataReady(true); return; }
        window.LMSReady.then(() => setDataReady(true));
    }, []);
    const ready = dataReady && (!needsCourses || (!loading && !error));
    const ran = useRef(false);

    useEffect(() => {
        if (!src || !ready || ran.current) return;
        ran.current = true;
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, [src, ready]);

    if (needsCourses && loading) {
        return <div className="container"><div className="alert alert-info">Loading courses...</div></div>;
    }
    if (needsCourses && error) {
        return <div className="container">
            <div className="alert alert-error">
                {error}{" "}
                <button type="button" className="btn btn-secondary btn-sm" onClick={fetchCourses}>Retry</button>
            </div>
        </div>;
    }
    return null;
}
