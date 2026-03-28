import { WISHES } from './data/wishes.js';
import { PRIORITY_TRANSLATIONS } from './data/translations.js';

(() => {
  const id = new URLSearchParams(location.search).get('id');
  const wish = WISHES.find((w) => w.id === id);

  if (!wish) {
    document.title = 'Not Found';
    document.querySelector('#app').innerHTML =
      '<p>Wish not found.</p><a href="index.html">&larr; Back to list</a>';
    return;
  }

  document.title = `${wish.name} — Inna's Wishlist`;

  const img = document.querySelector('#detail-img');
  const title = document.querySelector('#detail-title');
  const desc = document.querySelector('#detail-desc');
  const price = document.querySelector('#detail-price');
  const priority = document.querySelector('#detail-priority');
  const link = document.querySelector('#detail-link');

  img.src = wish.image;
  img.alt = wish.name;
  title.textContent = wish.name;
  desc.textContent = wish.description;
  price.textContent = wish.price;
  priority.textContent = PRIORITY_TRANSLATIONS[wish.priority] || wish.priority;
  priority.dataset.level = wish.priority;

  if (wish.url) {
    link.href = wish.url;
  } else {
    link.remove();
  }

  addEventListener('pagereveal', (e) => {
    if (!e.viewTransition) return;
    img.style.viewTransitionName = `wish-img-${wish.id}`;
    title.style.viewTransitionName = `wish-title-${wish.id}`;
  });
})();
