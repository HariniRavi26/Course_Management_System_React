(function () {
window.LMSReady.then(async function () {
const user = getCurrentUser();
    const params = new URLSearchParams(window.location.search);
    const course = getCourseById(params.get('id'));
    const moduleId = params.get('m');
    const mod = course ? course.modules.find(m => m.id === moduleId) : null;
    const content = document.getElementById('content');

    if (!course || !mod || !isEnrolled(user.email, course.id)) {
      content.innerHTML = '<p>Module not found or you are not enrolled. <a href="my-courses.html">Back to My Courses</a></p>';
    } else {
      renderModule();
    }

    function renderModule() {
      const idx = course.modules.findIndex(m => m.id === moduleId);
      const rec = getProgressRecord(user.email, course.id);
      const isDone = rec && rec.completedModules.includes(moduleId);
      const next = course.modules[idx + 1];

      content.innerHTML = `
        <div class="page-header">
          <a href="course-content.html?id=${course.id}" style="color:var(--primary);font-size:14px;">← Back to ${course.title}</a>
          <h1 style="margin-top:8px;">Module ${idx + 1}: ${mod.title}</h1>
        </div>
        <div class="learn-layout">
          <div class="sidebar">
            <h3>Modules</h3>
            ${course.modules.map((m, i) => `
              <a href="module.html?id=${course.id}&m=${m.id}">
                <div class="module-item ${m.id === moduleId ? 'active' : ''}">
                  <span>${rec && rec.completedModules.includes(m.id) ? '✅' : '📘'} ${i + 1}. ${m.title}</span>
                </div>
              </a>`).join('')}
          </div>
          <div>
            <div class="card"><div class="card-body">
              <h3 style="margin-bottom:12px;">📝 Module Notes</h3>
              <p style="color:var(--text);line-height:1.7;">${mod.notes}</p>
            </div></div>

            ${mod.materials && mod.materials.length ? `
            <div class="card" style="margin-top:16px;"><div class="card-body">
              <h3 style="margin-bottom:12px;">📎 Study Materials</h3>
              <ul>
                ${mod.materials.map(f => `<li style="padding:8px 0;border-bottom:1px solid var(--border);">📄 ${f}</li>`).join('')}
              </ul>
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
                ${mod.pdfUrl ? `<a class="btn btn-secondary" href="${mod.pdfUrl}" target="_blank" rel="noopener noreferrer">📄 View PDF</a>` : ''}
                ${mod.videoUrl ? `<a class="btn btn-primary" href="video-player.html?id=${course.id}&m=${moduleId}">▶ Watch Video</a>` : ''}
                <a class="btn btn-secondary" href="materials.html?id=${course.id}&m=${moduleId}">Open Materials</a>
              </div>
            </div></div>` : ''}

            <div style="margin-top:20px;display:flex;gap:10px;">
              <button class="btn ${isDone ? 'btn-secondary' : 'btn-success'}" id="completeBtn">${isDone ? '✔ Marked Complete' : 'Mark as Complete'}</button>
              ${next ? `<a href="module.html?id=${course.id}&m=${next.id}" class="btn btn-primary">Next Module →</a>` : `<a href="progress.html" class="btn btn-primary">View Progress →</a>`}
            </div>
          </div>
        </div>
      `;
      document.getElementById('completeBtn').addEventListener('click', function () {
        markModuleComplete(user.email, course.id, moduleId).then(renderModule).catch(function () { alert('Could not save progress. Please try again.'); });
      });
    }
});
})();
