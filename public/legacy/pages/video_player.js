(function () {
const user = getCurrentUser();
    const params = new URLSearchParams(window.location.search);
    const course = getCourseById(params.get('id'));
    const moduleId = params.get('m');
    const mod = course ? course.modules.find(m => m.id === moduleId) : null;
    const content = document.getElementById('content');

    if (!course || !mod) {
      content.innerHTML = '<p>Video not found.</p>';
    } else {
      content.innerHTML = `
        <a href="module.html?id=${course.id}&m=${moduleId}" style="color:var(--primary);font-size:14px;">← Back to Module</a>
        <h1 style="margin:12px 0 16px;">${mod.videoTitle}</h1>
        <div class="video-wrap" style="max-width:900px;">
          <div class="card" style="padding:24px;text-align:center;">
            <div style="font-size:50px;">▶</div>
            <h3>${mod.videoTitle}</h3>
            <p style="margin:12px 0;">Open the YouTube learning results for this module.</p>
            ${mod.videoUrl ? `<a class="btn btn-primary" href="${mod.videoUrl}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>` : '<p>No video link available.</p>'}
          </div>
        </div>
        <div style="max-width:900px;margin-top:16px;display:flex;justify-content:space-between;">
          <a href="module.html?id=${course.id}&m=${moduleId}" class="btn btn-secondary">Back to Module</a>
          <button class="btn btn-success" id="watchedBtn">Mark as Watched</button>
        </div>
      `;
      document.getElementById('watchedBtn').addEventListener('click', function () {
        markModuleComplete(user.email, course.id, moduleId).then(function(){ alert('Marked complete!'); }).catch(function(){ alert('Could not save progress.'); });
      });
    }
})();
