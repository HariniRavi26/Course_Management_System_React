(function () {
let extraModuleCount = 2;
    document.getElementById('addModuleBtn').addEventListener('click', function () {
      extraModuleCount++;
      const row = document.createElement('div');
      row.style = 'display:flex;gap:8px;margin-bottom:8px;';
      row.innerHTML = `<input type="text" name="module${extraModuleCount}" placeholder="Module ${extraModuleCount} title">
        <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>`;
      document.getElementById('modulesWrap').appendChild(row);
    });
})();
