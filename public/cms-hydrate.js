(function () {
  var pageId = document.body.getAttribute('data-page-id');
  if (!pageId) return;

  function applyFields(scopeFields) {
    if (!scopeFields) return;
    Object.keys(scopeFields).forEach(function (key) {
      var f = scopeFields[key];
      if (!f || typeof f.value !== 'string') return;
      var els = document.querySelectorAll('[data-cms="' + cssEscape(key) + '"]');
      els.forEach(function (el) {
        var fieldType = el.getAttribute('data-cms-field') || 'text';
        if (fieldType === 'text') el.textContent = f.value;
        else if (fieldType === 'html') el.innerHTML = f.value;
        else el.setAttribute(fieldType, f.value);
      });
    });
  }

  function cssEscape(str) {
    return String(str).replace(/["\\]/g, '\\$&');
  }

  function fetchScope(id) {
    return fetch('/api/content/' + encodeURIComponent(id))
      .then(function (r) {
        return r.ok ? r.json() : { fields: {} };
      })
      .catch(function () {
        return { fields: {} };
      });
  }

  Promise.all([fetchScope('global'), fetchScope(pageId)]).then(function (results) {
    applyFields(results[0] && results[0].fields);
    applyFields(results[1] && results[1].fields);
  });
})();
