document.addEventListener('DOMContentLoaded', function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  var img = lightbox.querySelector('.lightbox-img');
  var caption = lightbox.querySelector('.lightbox-caption');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    var item = items[current];
    img.src = item.getAttribute('data-full');
    img.alt = item.querySelector('img').alt;
    caption.textContent = item.getAttribute('data-caption') || '';
  }

  function open(index) {
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    items[current].focus();
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () { open(index); });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});
