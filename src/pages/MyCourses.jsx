import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function MyCourses() {
    return (
        <PageShell page="mycourses" auth="student">
            <div className="container">
                <div className="page-header">
                    <h1>
                        My Courses
                    </h1>
                    <p>
                        Continue where you left off
                    </p>
                </div>
                <div className="grid grid-3" id="courseList"></div>
            </div>
            <LegacyPageScript src="/legacy/pages/my_courses.js" />
        </PageShell>
    );
}
