document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark the current page in the nav.
  var here = location.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (!target) return;
    var resolved = new URL(target, location.href).pathname;
    if (resolved === here || (resolved.endsWith('/') && here.endsWith(resolved))) {
      a.setAttribute('aria-current', 'page');
    }
  });
});
