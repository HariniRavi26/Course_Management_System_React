(function () {
const user = getCurrentUser();
      document.getElementById('welcomeMsg').textContent = 'Welcome back, ' + user.name + '!';

      const courses = getCourses();
      const enrollments = getData(KEYS.enrollments);
      const progress = getData(KEYS.progress);
      const registeredStudents = getData(KEYS.users).length;

      document.getElementById('statCourses').textContent = courses.length;
      document.getElementById('statStudents').textContent = registeredStudents;
      document.getElementById('statEnrollments').textContent = enrollments.length;
      document.getElementById('statCompletions').textContent = progress.filter(p => {
        const c = getCourseById(p.courseId);
        return c && p.completedModules.length === c.modules.length;
      }).length;

      document.getElementById('courseList').innerHTML = courses.map(c => `
        <div class="card">
          <div class="card-thumb">${c.title.charAt(0)}</div>
          <div class="card-body">
            <span class="tag">${c.category}</span>
            <h3 style="margin:10px 0 6px;">${c.title}</h3>
            <p style="color:var(--muted);font-size:13px;">${c.modules.length} modules · $${c.price}</p>
            <div style="display:flex;gap:8px;margin-top:14px;">
              <a href="course-details.html?id=${c.id}" class="btn btn-secondary btn-sm">View</a>
              <a href="edit-course.html?id=${c.id}" class="btn btn-primary btn-sm">Edit</a>
            </div>
          </div>
        </div>
      `).join('') || '<p style="color:var(--muted);">No courses yet. Add your first course!</p>';

      const studentRows = getData(KEYS.users);
      const enrollmentRows = getData(KEYS.enrollments);
      const adminRows = getData(KEYS.admins);
      const panel = document.createElement('div');
      panel.className = 'card';
      panel.style.marginTop = '24px';
      panel.innerHTML = `<div class="card-body">
        <h2 style="font-size:20px;margin-bottom:14px;">Registered Students</h2>
        ${studentRows.length ? `<div style="overflow:auto;"><table style="width:100%;border-collapse:collapse;"><thead><tr><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Student</th><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Email</th><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Enrollments</th></tr></thead><tbody>${studentRows.map(s => `<tr><td style="padding:10px;border-bottom:1px solid var(--border);">${s.name}</td><td style="padding:10px;border-bottom:1px solid var(--border);">${s.email}</td><td style="padding:10px;border-bottom:1px solid var(--border);">${enrollmentRows.filter(e => e.email === s.email).length}</td></tr>`).join('')}</tbody></table></div>` : '<p style="color:var(--muted);">No students have registered yet.</p>'}
        <div style="margin-top:20px;"><h3 style="font-size:16px;margin-bottom:10px;">Registered Admins / Instructors</h3>${adminRows.length ? `<div style="overflow:auto;"><table style="width:100%;border-collapse:collapse;"><thead><tr><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Name</th><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Email</th><th style="text-align:left;padding:10px;border-bottom:1px solid var(--border);">Status</th></tr></thead><tbody>${adminRows.map(a => `<tr><td style="padding:10px;border-bottom:1px solid var(--border);">${a.name}</td><td style="padding:10px;border-bottom:1px solid var(--border);">${a.email}</td><td style="padding:10px;border-bottom:1px solid var(--border);">${a.status || 'active'}</td></tr>`).join('')}</tbody></table></div>` : '<p style="color:var(--muted);">No admins have registered yet.</p>'}</div>
      </div>`;
      document.getElementById('courseList').parentElement.appendChild(panel);
})();
