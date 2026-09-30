(function () {
const user = getCurrentUser();
      const myCourses = getMyCourses(user.email);
      const list = document.getElementById('courseList');

      if (!myCourses.length) {
        list.outerHTML = '<p style="color:var(--muted);grid-column:1/-1;">You haven\'t enrolled in any courses yet. <a href="browse-courses.html">Browse courses</a></p>';
        return;
      }
      list.innerHTML = myCourses.map(c => {
        const pct = getProgressPercent(user.email, c.id);
        return `
        <div class="card">
          <div class="card-thumb">${c.title.charAt(0)}</div>
          <div class="card-body">
            <span class="tag">${c.category}</span>
            <h3 style="margin:10px 0 6px;">${c.title}</h3>
            <div class="progress-bar" style="margin:10px 0 4px;"><div style="width:${pct}%;"></div></div>
            <p style="color:var(--muted);font-size:13px;">${pct}% complete</p>
            <div style="display:flex;gap:8px;margin-top:14px;">
              <a href="course-content.html?id=${c.id}" class="btn btn-primary btn-sm">${pct > 0 ? 'Continue' : 'Start Learning'}</a>
              ${pct === 100 ? `<a href="certificate.html?id=${c.id}" class="btn btn-secondary btn-sm">Certificate</a>` : ''}
            </div>
          </div>
        </div>`;
      }).join('');
})();
