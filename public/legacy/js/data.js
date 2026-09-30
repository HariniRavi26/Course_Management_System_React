/* =========================================================
   LMS DATA MODULE - JSON SERVER / MOCK API VERSION
   Courses and all student/admin activity are persisted in
   mock-api/db.json. localStorage is used only for the current
   browser session, not as the application database.
========================================================= */
const DataModule = (function () {
  const API = 'http://localhost:5000';
  const KEYS = {
    users: 'students',
    admins: 'admins',
    enrollments: 'enrollments',
    progress: 'progress',
    ratings: 'ratings',
    savedCourses: 'savedCourses',
    notifications: 'notifications',
    achievements: 'achievements'
  };

  const cache = {
    students: [], admins: [], enrollments: [], progress: [], ratings: [],
    savedCourses: [], notifications: [], achievements: []
  };

  const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const now = () => new Date().toISOString();
  const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

  async function request(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).message || ''; } catch (_) {}
      throw new Error(detail || `Mock API error (${res.status})`);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  async function refreshCollection(name) {
    cache[name] = await request(`/${name}`);
    return cache[name];
  }

  async function loadAll() {
    try {
      await Promise.all(Object.keys(cache).map(refreshCollection));
      window.dispatchEvent(new Event('lms-data-ready'));
      return true;
    } catch (err) {
      console.error(err);
      window.dispatchEvent(new CustomEvent('lms-data-error', { detail: err.message }));
      return false;
    }
  }

  // All page scripts that use cached MockAPI data wait for this promise.
  window.LMSReady = loadAll();

  function getData(key) {
    return Array.isArray(cache[key]) ? cache[key] : [];
  }
  function setData(key, value) {
    cache[key] = Array.isArray(value) ? value : [];
  }

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('lms_user') || 'null');
  }
  function setCurrentUser(user) {
    localStorage.setItem('lms_user', JSON.stringify({
      id: user.id, name: user.name, email: user.email, role: user.role,
      studentId: user.studentId, adminId: user.adminId
    }));
  }
  function logout() {
    localStorage.removeItem('lms_user');
    window.location.href = 'login.html';
  }

  async function findAccount(email) {
    const e = normalizeEmail(email);
    const student = cache.students.find(u => normalizeEmail(u.email) === e);
    if (student) return { ...student, role: 'student' };
    const admin = cache.admins.find(u => normalizeEmail(u.email) === e);
    if (admin) return { ...admin, role: 'admin' };
    const [students, admins] = await Promise.all([
      request(`/students?email=${encodeURIComponent(e)}`),
      request(`/admins?email=${encodeURIComponent(e)}`)
    ]);
    const account = students[0] || admins[0];
    return account ? { ...account, role: students[0] ? 'student' : 'admin' } : null;
  }

  async function registerUser(name, email, password, role = 'student') {
    await window.LMSReady;
    const e = normalizeEmail(email);
    const existing = await findAccount(e);
    if (existing) return { ok: false, message: 'An account with this email already exists.' };

    const base = { name: name.trim(), email: e, password, phone: '', status: 'active', createdAt: now() };
    let newUser;
    if (role === 'admin') {
      newUser = { ...base, id: uid('ADM'), adminId: uid('ADMIN') };
      const saved = await request('/admins', { method: 'POST', body: JSON.stringify(newUser) });
      cache.admins.push(saved);
      setCurrentUser({ ...saved, role: 'admin' });
    } else {
      newUser = { ...base, id: uid('STU'), studentId: uid('STUDENT'), department: 'Computer Science', dept: 'Computer Science' };
      const saved = await request('/students', { method: 'POST', body: JSON.stringify(newUser) });
      cache.students.push(saved);
      setCurrentUser({ ...saved, role: 'student' });
      await addNotification(e, 'Welcome to the LMS Portal!', 'Start exploring courses and begin learning today.');
    }
    return { ok: true, user: { ...newUser, role } };
  }

  async function loginUser(email, password) {
    await window.LMSReady;
    const account = await findAccount(email);
    if (!account || account.password !== password) return { ok: false, message: 'Incorrect email or password.' };
    setCurrentUser(account);
    return { ok: true, user: account };
  }

  async function resetPasswordFor(email, newPassword) {
    await window.LMSReady;
    const e = normalizeEmail(email);
    const student = cache.students.find(u => normalizeEmail(u.email) === e);
    const admin = cache.admins.find(u => normalizeEmail(u.email) === e);
    const collection = student ? 'students' : admin ? 'admins' : null;
    const account = student || admin;
    if (!account) return { ok: false, message: 'No account found with that email.' };
    const saved = await request(`/${collection}/${account.id}`, {
      method: 'PATCH', body: JSON.stringify({ password: newPassword })
    });
    cache[collection] = cache[collection].map(x => String(x.id) === String(account.id) ? saved : x);
    return { ok: true };
  }

  /* ---------------- COURSES (CourseContext owns the API) ---------------- */
  const CourseBridge = { courses: [], api: null };
  window.CourseBridge = CourseBridge;
  function getCourses() { return CourseBridge.courses; }
  function getCourseById(id) { return CourseBridge.courses.find(c => String(c.id) === String(id)); }
  function callCourseApi(method, args) {
    if (!CourseBridge.api) return Promise.reject(new Error('Course service is not ready yet. Please try again.'));
    return CourseBridge.api[method].apply(null, args);
  }
  function addCourse(course) { return callCourseApi('addCourse', [course]); }
  function updateCourse(id, updates) { return callCourseApi('updateCourse', [id, updates]); }
  function deleteCourse(id) { return callCourseApi('deleteCourse', [id]); }

  /* ---------------- ENROLLMENTS ---------------- */
  function isEnrolled(email, courseId) {
    const e = normalizeEmail(email);
    return getData('enrollments').some(x => normalizeEmail(x.email) === e && String(x.courseId) === String(courseId));
  }
  async function enrollInCourse(email, courseId) {
    await window.LMSReady;
    if (isEnrolled(email, courseId)) return { ok: false, message: 'You are already enrolled in this course.' };
    const record = await request('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ id: uid('ENR'), email: normalizeEmail(email), courseId: String(courseId), date: now(), status: 'active' })
    });
    cache.enrollments.push(record);
    await addNotification(email, 'Enrollment Successful', 'You have successfully enrolled in a new course.');
    return { ok: true, enrollment: record };
  }
  function getMyCourses(email) {
    const e = normalizeEmail(email);
    return getData('enrollments').filter(x => normalizeEmail(x.email) === e)
      .map(x => getCourseById(x.courseId)).filter(Boolean);
  }

  /* ---------------- PROGRESS ---------------- */
  function getProgressRecord(email, courseId) {
    const e = normalizeEmail(email);
    return getData('progress').find(p => normalizeEmail(p.email) === e && String(p.courseId) === String(courseId));
  }
  function getProgressPercent(email, courseId) {
    const course = getCourseById(courseId);
    if (!course || !course.modules || !course.modules.length) return 0;
    const rec = getProgressRecord(email, courseId);
    return Math.round(((rec ? rec.completedModules.length : 0) / course.modules.length) * 100);
  }
  async function markModuleComplete(email, courseId, moduleId) {
    await window.LMSReady;
    let rec = getProgressRecord(email, courseId);
    if (!rec) {
      rec = { id: uid('PROG'), email: normalizeEmail(email), courseId: String(courseId), completedModules: [], lastUpdated: now() };
      const saved = await request('/progress', { method: 'POST', body: JSON.stringify(rec) });
      cache.progress.push(saved);
      rec = saved;
    }
    if (!rec.completedModules.includes(moduleId)) rec.completedModules.push(moduleId);
    rec.lastUpdated = now();
    const saved = await request(`/progress/${rec.id}`, { method: 'PATCH', body: JSON.stringify({ completedModules: rec.completedModules, lastUpdated: rec.lastUpdated }) });
    cache.progress = cache.progress.map(x => String(x.id) === String(rec.id) ? saved : x);

    const course = getCourseById(courseId);
    if (course && saved.completedModules.length === course.modules.length) {
      await addNotification(email, 'Course Completed!', `Congratulations! You completed "${course.title}". Your certificate is ready.`);
      await createAchievement(email, courseId, course.title);
    }
    return saved;
  }

  /* ---------------- RATINGS ---------------- */
  function getRating(email, courseId) {
    const e = normalizeEmail(email);
    return getData('ratings').find(r => normalizeEmail(r.email) === e && String(r.courseId) === String(courseId));
  }
  async function rateCourse(email, courseId, rating, review = '') {
    await window.LMSReady;
    const existing = getRating(email, courseId);
    const payload = { email: normalizeEmail(email), courseId: String(courseId), rating: Number(rating), review, date: now() };
    if (existing) {
      const saved = await request(`/ratings/${existing.id}`, { method: 'PATCH', body: JSON.stringify(payload) });
      cache.ratings = cache.ratings.map(x => String(x.id) === String(existing.id) ? saved : x);
      return saved;
    }
    const saved = await request('/ratings', { method: 'POST', body: JSON.stringify({ id: uid('RAT'), ...payload }) });
    cache.ratings.push(saved);
    return saved;
  }
  function getCourseRatingSummary(courseId) {
    const rows = getData('ratings').filter(r => String(r.courseId) === String(courseId));
    if (!rows.length) return { count: 0, average: 0 };
    return { count: rows.length, average: Math.round(rows.reduce((a, r) => a + Number(r.rating || 0), 0) / rows.length * 10) / 10 };
  }

  /* ---------------- SAVED COURSES ---------------- */
  function isCourseSaved(email, courseId) {
    return getData('savedCourses').some(x => normalizeEmail(x.email) === normalizeEmail(email) && String(x.courseId) === String(courseId));
  }
  async function toggleSavedCourse(email, courseId) {
    await window.LMSReady;
    const existing = getData('savedCourses').find(x => normalizeEmail(x.email) === normalizeEmail(email) && String(x.courseId) === String(courseId));
    if (existing) {
      await request(`/savedCourses/${existing.id}`, { method: 'DELETE' });
      cache.savedCourses = cache.savedCourses.filter(x => String(x.id) !== String(existing.id));
      return { saved: false };
    }
    const saved = await request('/savedCourses', { method: 'POST', body: JSON.stringify({ id: uid('SAVE'), email: normalizeEmail(email), courseId: String(courseId), date: now() }) });
    cache.savedCourses.push(saved);
    return { saved: true };
  }
  function getSavedCourses(email) {
    return getData('savedCourses').filter(x => normalizeEmail(x.email) === normalizeEmail(email)).map(x => getCourseById(x.courseId)).filter(Boolean);
  }

  /* ---------------- NOTIFICATIONS ---------------- */
  async function addNotification(email, title, message) {
    await window.LMSReady;
    const saved = await request('/notifications', {
      method: 'POST', body: JSON.stringify({ id: uid('NOT'), email: normalizeEmail(email), title, message, read: false, date: now() })
    });
    cache.notifications.unshift(saved);
    return saved;
  }
  function getNotifications(email) {
    return getData('notifications').filter(n => normalizeEmail(n.email) === normalizeEmail(email));
  }
  function getUnreadCount(email) { return getNotifications(email).filter(n => !n.read).length; }
  async function markAllNotificationsRead(email) {
    await window.LMSReady;
    const rows = getNotifications(email).filter(n => !n.read);
    await Promise.all(rows.map(n => request(`/notifications/${n.id}`, { method: 'PATCH', body: JSON.stringify({ read: true }) })));
    cache.notifications = cache.notifications.map(n => normalizeEmail(n.email) === normalizeEmail(email) ? { ...n, read: true } : n);
  }

  /* ---------------- ACHIEVEMENTS ---------------- */
  function getAchievements(email) { return getData('achievements').filter(a => normalizeEmail(a.email) === normalizeEmail(email)); }
  async function createAchievement(email, courseId, courseTitle) {
    if (getAchievements(email).some(a => String(a.courseId) === String(courseId))) return null;
    const saved = await request('/achievements', {
      method: 'POST',
      body: JSON.stringify({ id: uid('ACH'), email: normalizeEmail(email), courseId: String(courseId), title: 'Course Completed', description: `Completed ${courseTitle}`, date: now() })
    });
    cache.achievements.push(saved);
    return saved;
  }

  return {
    KEYS, getData, setData, uid,
    getCurrentUser, setCurrentUser, logout, registerUser, loginUser, resetPasswordFor,
    getCourses, getCourseById, addCourse, updateCourse, deleteCourse,
    isEnrolled, enrollInCourse, getMyCourses,
    getProgressRecord, getProgressPercent, markModuleComplete,
    getRating, rateCourse, getCourseRatingSummary,
    isCourseSaved, toggleSavedCourse, getSavedCourses,
    addNotification, getNotifications, getUnreadCount, markAllNotificationsRead,
    getAchievements, createAchievement
  };
})();
Object.assign(window, DataModule);
