import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Notifications() {
    return (
        <PageShell page="notif" auth="student">
            <div className="container" style={{maxWidth: "700px"}}>
                <div className="page-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <h1>
                            Notifications
                        </h1>
                        <p>
                            Stay updated on your courses and account
                        </p>
                    </div>
                    <button className="btn btn-secondary btn-sm" id="markAllBtn">
                        Mark all as read
                    </button>
                </div>
                <div id="notifList" style={{borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)"}}></div>
            </div>
            <LegacyPageScript src="/legacy/pages/notifications.js" needsCourses={false} />
        </PageShell>
    );
}
