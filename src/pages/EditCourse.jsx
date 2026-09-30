import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function EditCourse() {
    return (
        <PageShell page="manage" auth="admin">
            <div className="container" style={{maxWidth: "750px"}}>
                <div className="page-header">
                    <h1>
                        Edit Course
                    </h1>
                    <p>
                        Update the course details below
                    </p>
                </div>
                <div id="formWrap"></div>
            </div>
            <LegacyPageScript src="/legacy/pages/edit_course.js" />
        </PageShell>
    );
}
