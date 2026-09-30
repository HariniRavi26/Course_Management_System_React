import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function CourseDetails() {
    return (
        <PageShell page="browse" auth="student">
            <div className="container" id="content"></div>
            <LegacyPageScript src="/legacy/pages/course_details.js" />
        </PageShell>
    );
}
