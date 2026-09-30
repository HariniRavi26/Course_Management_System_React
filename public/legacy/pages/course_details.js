(function () {
window.LMSReady.then(async function () {
const params = new URLSearchParams(window.location.search);
    const course = getCourseById(params.get('id')) || getCourses()[0];
    const user = getCurrentUser();
    const content = document.getElementById('content');

    if (!course) {
      content.innerHTML = '<p>Course not found. <a href="browse-courses.html">Back to courses</a></p>';
    } else {
      const enrolled = user.role === 'student' && isEnrolled(user.email, course.id);
      let actionButton;
      if (user.role === 'admin') {
        actionButton = `<a href="edit-course.html?id=${course.id}" class="btn btn-primary btn-block">Edit This Course</a>`;
      } else if (enrolled) {
        actionButton = `<a href="course-content.html?id=${course.id}" class="btn btn-success btn-block">Continue Learning</a>`;
      } else {
        actionButton = `<button class="btn btn-primary btn-block" id="enrollBtn">Enroll Now - $${course.price}</button>`;
      }

      content.innerHTML = `
        <div style="background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;padding:40px;border-radius:var(--radius);margin-bottom:24px;">
          <span class="tag" style="background:rgba(255,255,255,.2);color:#fff;">${course.category}</span>
          <h1 style="margin:12px 0 8px;">${course.title}</h1>
          <p style="opacity:.9;">By ${course.instructor} · ${course.modules.length} modules</p>
        </div>
        <div class="learn-layout">
          <div>
            <div class="card"><div class="card-body">
              <h3 style="margin-bottom:10px;">About this course</h3>
              <p style="color:var(--muted);">${course.description}</p>
            </div></div>
            <div class="card" style="margin-top:16px;"><div class="card-body">
              <h3 style="margin-bottom:10px;">Course Curriculum</h3>
              <ul>${course.modules.map((m, i) => `<li class="module-item"><span>📘 Module ${i + 1}: ${m.title}</span></li>`).join('')}</ul>
            </div></div>
          </div>
          <div class="sidebar">
            <div style="font-size:28px;font-weight:700;color:var(--primary);margin-bottom:14px;">$${course.price}</div>
            ${actionButton}
            ${user.role === 'student' ? `
              <button class="btn btn-secondary btn-block" id="saveCourseBtn" style="margin-top:8px;">${isCourseSaved(user.email, course.id) ? '★ Saved Course' : '☆ Save Course'}</button>
              <div class="card" style="margin-top:12px;"><div class="card-body">
                <div id="ratingSummary" class="help-text" style="margin-bottom:8px;"></div>
                <div style="display:flex;gap:8px;align-items:center;">
                  <select id="courseRating" style="flex:1;"><option value="">Rate course</option><option value="5">★★★★★ 5</option><option value="4">★★★★ 4</option><option value="3">★★★ 3</option><option value="2">★★ 2</option><option value="1">★ 1</option></select>
                  <button class="btn btn-secondary btn-sm" id="rateCourseBtn">Rate</button>
                </div>
              </div></div>
            ` : ''}
            <div class="help-text" style="margin-top:14px;">✔ Lifetime access<br>✔ Certificate on completion<br>✔ Downloadable materials</div>
          </div>
        </div>
      `;

      const summary = getCourseRatingSummary(course.id);
      const ratingSummary = document.getElementById('ratingSummary');
      if (ratingSummary) ratingSummary.textContent = summary.count ? `★ ${summary.average}/5 (${summary.count} rating${summary.count === 1 ? '' : 's'})` : 'No ratings yet';

      const saveBtn = document.getElementById('saveCourseBtn');
      if (saveBtn) saveBtn.addEventListener('click', function () {
        toggleSavedCourse(user.email, course.id).then(function (result) {
          saveBtn.textContent = result.saved ? '★ Saved Course' : '☆ Save Course';
        }).catch(function () { alert('Could not update saved course.'); });
      });

      const rateBtn = document.getElementById('rateCourseBtn');
      if (rateBtn) rateBtn.addEventListener('click', function () {
        const value = document.getElementById('courseRating').value;
        if (!value) { alert('Please select a rating.'); return; }
        rateCourse(user.email, course.id, value).then(function () {
          const s = getCourseRatingSummary(course.id);
          if (ratingSummary) ratingSummary.textContent = `★ ${s.average}/5 (${s.count} rating${s.count === 1 ? '' : 's'})`;
          alert('Rating saved.');
        }).catch(function () { alert('Could not save rating.'); });
      });

      const enrollBtn = document.getElementById('enrollBtn');
      if (enrollBtn) {
        enrollBtn.addEventListener('click', function () {
          enrollInCourse(user.email, course.id).then(function (result) {
            window.location.href = result.ok ? `enrollment-success.html?id=${course.id}` : 'browse-courses.html';
          }).catch(function () {
            alert('Could not save enrollment. Please make sure Mock API is running.');
          });
        });
      }
    }
});
})();
