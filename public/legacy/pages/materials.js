(function () {
const params = new URLSearchParams(window.location.search);
    const course = getCourseById(params.get('id'));
    const moduleId = params.get('m');
    const mod = course ? course.modules.find(m => m.id === moduleId) : null;
    const content = document.getElementById('content');

    if (!course || !mod) {
      content.innerHTML = '<p>Materials not found.</p>';
    } else {
      content.innerHTML = `
        <a href="module.html?id=${course.id}&m=${moduleId}" style="color:var(--primary);font-size:14px;">← Back to Module</a>
        <h1 style="margin:12px 0 16px;">Study Materials — ${mod.title}</h1>
        <div class="card" style="max-width:600px;">
          <div class="card-body">
            ${mod.materials.map(f => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">
                <span>📄 ${f}</span>
                ${mod.pdfUrl ? `<a href="${mod.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Open PDF</a>` : '<span class="help-text">Unavailable</span>'}
              </div>`).join('')}
          </div>
        </div>
      `;
    }
})();
