(function () {
// Carry the email through from forgot-password.html?email=...
        var qp = new URLSearchParams(window.location.search);
        if (qp.get('email')) document.getElementById('email').value = qp.get('email');
})();
