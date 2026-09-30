import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Progress() {
    return (
        <PageShell page="dashboard" auth="student">
            <div className="container">
                <div className="page-header">
                    <h1>
                        My Progress
                    </h1>
                    <p>
                        Track how far you've come in each course
                    </p>
                </div>
                <div id="content"></div>
            </div>
            <LegacyPageScript src="/legacy/pages/progress.js" />
        </PageShell>
    );
}
