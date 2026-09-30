import PageShell from "../components/PageShell";
import LegacyPageScript from "../components/LegacyPageScript";

export default function AddCourse() {
    return (
        <PageShell page="manage" auth="admin">
            <div className="container" style={{maxWidth: "750px"}}>
                <div className="page-header">
                    <h1>
                        Add New Course
                    </h1>
                    <p>
                        Fill in the details below to publish a new course
                    </p>
                </div>
                <form id="courseForm" onSubmit={(e) => window.validateCourseForm(e)} novalidate="" style={{background: "var(--card)", padding: "26px", borderRadius: "var(--radius)", border: "1px solid var(--border)"}}>
                    <div className="form-group">
                        <label>
                            Course Title
                        </label>
                        <input type="text" id="title" name="title" placeholder="e.g. Complete JavaScript Course" />
                        <div className="error-text" id="titleError"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            Category
                        </label>
                        <input type="text" id="category" name="category" placeholder="e.g. Development, Design, Marketing" />
                        <div className="error-text" id="categoryError"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            Instructor Name
                        </label>
                        <input type="text" id="instructor" name="instructor" placeholder="e.g. Jane Smith" />
                        <div className="error-text" id="instructorError"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            Price (USD)
                        </label>
                        <input type="number" id="price" name="price" min="0" placeholder="e.g. 49" />
                        <div className="error-text" id="priceError"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            Description
                        </label>
                        <textarea id="description" name="description" placeholder="What will students learn in this course?"></textarea>
                        <div className="error-text" id="descriptionError"></div>
                    </div>
                    <div className="form-group">
                        <label>
                            Course Modules
                        </label>
                        <div id="modulesWrap">
                            <div style={{display: "flex", gap: "8px", marginBottom: "8px"}}>
                                <input type="text" id="module1" name="module1" placeholder="Module 1 title" value="Introduction" />
                            </div>
                            <div className="error-text" id="module1Error"></div>
                            <div style={{display: "flex", gap: "8px", marginBottom: "8px"}}>
                                <input type="text" name="module2" placeholder="Module 2 title" value="Getting Started" />
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary btn-sm" id="addModuleBtn">
                            + Add Module
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Publish Course
                    </button>
                </form>
            </div>
            <LegacyPageScript src="/legacy/pages/add_course.js" />
        </PageShell>
    );
}
