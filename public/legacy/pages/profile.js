(function () {
// ---- Wire the new modules together on this page ----

    function paintProfile(state) {
      const user = state.user;
      if (!user) return; // navigation.js's guardPage() will redirect before this matters

      document.getElementById('avatarInitial').textContent = user.name.charAt(0).toUpperCase();
      document.getElementById('profileName').textContent = user.name;
      document.getElementById('profileEmail').textContent = user.email;
      document.getElementById('profileRole').textContent = user.role === 'admin' ? 'Admin' : 'Student';
      document.getElementById('nameInput').value = user.name;

      if (user.role === 'admin') {
        document.getElementById('statPrimaryLabel').textContent = 'Courses Managed';
        document.getElementById('statPrimary').textContent = getCourses().length;
        document.getElementById('statSecondaryLabel').textContent = 'Total Enrollments';
        document.getElementById('statSecondary').textContent = getData(KEYS.enrollments).length;
      } else {
        const myCourses = getMyCourses(user.email);
        const percents = myCourses.map(function (c) { return getProgressPercent(user.email, c.id); });
        document.getElementById('statPrimaryLabel').textContent = 'Enrolled Courses';
        document.getElementById('statPrimary').textContent = myCourses.length;
        document.getElementById('statSecondaryLabel').textContent = 'Certificates Earned';
        document.getElementById('statSecondary').textContent = percents.filter(function (p) { return p === 100; }).length;
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      // navigation.js already called AppState... no - navigation.js doesn't know about AppState,
      // it uses its own state internally via its (unmodified) code. So this page manages its
      // OWN AppState instance for its own demo purposes, independent of navigation.js.
      AppState.refresh();
      paintProfile(AppState.getState());

      // Reactive UI: whenever AppState changes, this page repaints itself automatically.
      AppState.subscribe(paintProfile);

      document.getElementById('saveNameBtn').addEventListener('click', function () {
        const newName = document.getElementById('nameInput').value.trim();
        if (newName.length < 2) {
          ToastModule.show('Name must be at least 2 characters.', 'error');
          return;
        }
        const current = AppState.getState().user;
        const collection = current.role === 'admin' ? 'admins' : 'students';
        fetch('http://localhost:5000/' + collection + '/' + current.id, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name: newName}) })
          .then(function(r){ if(!r.ok) throw new Error(); return r.json(); })
          .then(function(saved){ setCurrentUser(Object.assign({}, saved, {role: current.role})); AppState.setState({ user: Object.assign({}, current, saved, { role: current.role }) }); ToastModule.show('Profile updated!', 'success'); })
          .catch(function(){ ToastModule.show('Could not update profile.', 'error'); });
      });

      document.getElementById('changePasswordBtn').addEventListener('click', function () {
        ModalModule.open('Change Password', `
          <div class="form-group"><label>New Password</label><input type="password" id="newPasswordField"></div>
          <button class="btn btn-primary btn-sm" id="confirmPasswordBtn">Update Password</button>
        `);
        document.getElementById('confirmPasswordBtn').addEventListener('click', function () {
          const pw = document.getElementById('newPasswordField').value;
          if (pw.length < 6) { ToastModule.show('Password must be at least 6 characters.', 'error'); return; }
          resetPasswordFor(AppState.getState().user.email, pw).then(function(result){
            ModalModule.close();
            ToastModule.show(result.ok ? 'Password updated!' : result.message, result.ok ? 'success' : 'error');
          }).catch(function(){ ToastModule.show('Could not update password.', 'error'); });
        });
      });
    });
})();
