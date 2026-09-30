(function () {
const user = getCurrentUser();
      document.getElementById('welcomeMsg').textContent = 'Welcome back, ' + user.name + '!';

      const myCourses = getMyCourses(user.email);
      const percents = myCourses.map(c => getProgressPercent(user.email, c.id));

      document.getElementById('statEnrolled').textContent = myCourses.length;
      document.getElementById('statCompleted').textContent = percents.filter(p => p === 100).length;
      document.getElementById('statInProgress').textContent = percents.filter(p => p > 0 && p < 100).length;
      document.getElementById('statCertificates').textContent = percents.filter(p => p === 100).length;

      const list = document.getElementById('courseList');
      if (!myCourses.length) {
        list.outerHTML = '<p style="color:var(--muted);grid-column:1/-1;">You haven\'t enrolled in any courses yet. <a href="browse-courses.html">Browse courses</a> to get started.</p>';
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
            <a href="course-content.html?id=${c.id}" class="btn btn-primary btn-sm" style="margin-top:10px;display:inline-block;">${pct > 0 ? 'Continue' : 'Start'}</a>
          </div>
        </div>`;
      }).join('');
})();
