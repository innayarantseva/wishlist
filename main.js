import { WISHES } from './data/wishes.js';
import './components/WishCard.js';
import './components/CategoryFilter.js';

const grid = document.querySelector('.wish-grid');
const filter = document.querySelector('category-filter');

const categories = [...new Set(WISHES.map((w) => w.category))].sort();
filter.setAttribute('categories', JSON.stringify(categories));

for (const wish of WISHES) {
  const card = document.createElement('wish-card');
  for (const [key, value] of Object.entries(wish)) {
    card.setAttribute(key, value);
  }
  grid.append(card);
}

filter.addEventListener('filter', (event) => {
  const { category } = event.detail;
  const cards = grid.querySelectorAll('wish-card');

  const update = () => {
    for (const card of cards) {
      card.hidden = !!category && card.getAttribute('category') !== category;
    }
  };

  document.startViewTransition?.(update) ?? update();
});
