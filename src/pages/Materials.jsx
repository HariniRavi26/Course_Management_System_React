import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Materials() {
    return (
        <PageShell page="mycourses" auth="student">
            <div className="container" id="content"></div>
            <LegacyPageScript src="/legacy/pages/materials.js" />
        </PageShell>
    );
}
