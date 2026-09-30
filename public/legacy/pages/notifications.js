(function () {
window.LMSReady.then(async function () {
const user = getCurrentUser();

    function timeAgo(dateStr) {
      const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
      if (diff < 60) return 'just now';
      if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
      if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
      return Math.floor(diff / 86400) + 'd ago';
    }

    function render() {
      const notifs = getNotifications(user.email).sort((a, b) => new Date(b.date) - new Date(a.date));
      document.getElementById('notifList').innerHTML = notifs.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}">
          <div class="notif-icon">🔔</div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;">
              <b>${n.title}</b>
              <span class="help-text">${timeAgo(n.date)}</span>
            </div>
            <p style="color:var(--muted);font-size:14px;margin-top:4px;">${n.message}</p>
          </div>
        </div>`).join('') || '<p style="padding:20px;color:var(--muted);">No notifications yet.</p>';
    }
    document.getElementById('markAllBtn').addEventListener('click', function () {
      markAllNotificationsRead(user.email).then(render).catch(function(){ alert('Could not update notifications.'); });
    });
    render();
});
})();
