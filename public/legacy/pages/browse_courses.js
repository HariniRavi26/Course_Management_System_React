(function () {
const user = getCurrentUser();
    const allCourses = getCourses();
    const cats = [...new Set(allCourses.map(c => c.category))];
    document.getElementById('categoryFilter').innerHTML += cats.map(c => `<option value="${c}">${c}</option>`).join('');

    function render() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const cat = document.getElementById('categoryFilter').value;
      const filtered = allCourses.filter(c => c.title.toLowerCase().includes(q) && (!cat || c.category === cat));
      document.getElementById('courseList').innerHTML = filtered.map(c => {
        const enrolled = user && isEnrolled(user.email, c.id);
        return `
        <div class="card">
          <div class="card-thumb">${c.title.charAt(0)}</div>
          <div class="card-body">
            <span class="tag">${c.category}</span>
            <h3 style="margin:10px 0 6px;">${c.title}</h3>
            <p style="color:var(--muted);font-size:14px;">By ${c.instructor} · ${c.modules.length} modules</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
              <span class="price">$${c.price}</span>
              <a href="course-details.html?id=${c.id}" class="btn btn-primary btn-sm">${enrolled ? 'Continue' : 'View Course'}</a>
            </div>
          </div>
        </div>`;
      }).join('') || '<p style="color:var(--muted);">No courses match your search.</p>';
    }
    document.getElementById('searchInput').addEventListener('input', render);
    document.getElementById('categoryFilter').addEventListener('change', render);
    document.addEventListener('DOMContentLoaded', render);
})();
