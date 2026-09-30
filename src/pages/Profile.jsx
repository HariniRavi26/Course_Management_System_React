import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function Profile() {
    return (
        <PageShell page="profile" auth="student">
            {/* Same nav shell as every other page - rendered by your EXISTING navigation.js, unmodified */}
            <div className="container" style={{maxWidth: "700px"}}>
                <div className="page-header">
                    <h1>
                        My Profile
                    </h1>
                    <p>
                        View your account details and update your display name
                    </p>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div style={{display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px"}}>
                            <div className="card-thumb" style={{width: "70px", height: "70px", borderRadius: "50%", fontSize: "26px", flexShrink: "0"}} id="avatarInitial"></div>
                            <div>
                                <h2 id="profileName" style={{marginBottom: "4px"}}></h2>
                                <p style={{color: "var(--muted)"}} id="profileEmail"></p>
                                <span className="tag" id="profileRole"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                Display Name
                            </label>
                            <input type="text" id="nameInput" />
                        </div>
                        <button className="btn btn-primary" id="saveNameBtn">
                            Save Changes
                        </button>
                        <button className="btn btn-secondary" id="changePasswordBtn" style={{marginLeft: "8px"}}>
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="stats-row" style={{marginTop: "24px"}}>
                    <div className="stat-card">
                        <div className="num" id="statPrimary">
                            0
                        </div>
                        <div className="label" id="statPrimaryLabel">
                            Enrolled Courses
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="num" id="statSecondary">
                            0
                        </div>
                        <div className="label" id="statSecondaryLabel">
                            Certificates Earned
                        </div>
                    </div>
                </div>
            </div>
            {/* Your existing, UNMODIFIED files - gives this page the same nav + login guard as every other page */}
            {/* New, additive files for this task */}
            <LegacyPageScript src="/legacy/pages/profile.js" />
        </PageShell>
    );
}
