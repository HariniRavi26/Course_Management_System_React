(function () {
const params = new URLSearchParams(window.location.search);
    const course = getCourseById(params.get('id'));
    if (course) {
      document.getElementById('courseMsg').textContent = `You've successfully enrolled in "${course.title}".`;
      document.getElementById('startBtn').href = `course-content.html?id=${course.id}`;
    }
})();
