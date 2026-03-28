import { PRIORITY_TRANSLATIONS } from '../data/translations.js';

class WishCard extends HTMLElement {
    static observedAttributes = [
        'name', 'price', 'priority', 'category', 'image', 'url', 'description', 'id'
    ];

    connectedCallback() {
        const tpl = document.getElementById('wish-card-tpl');
        this.appendChild(tpl.content.cloneNode(true));
        this.#render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.#render();
    }

    #render() {
        const id = this.getAttribute('id');

        this.querySelector('a').href = id ? `wish.html?id=${id}` : '#';

        const img = this.querySelector('img');
        img.src = this.getAttribute('image') ?? '';
        img.alt = this.getAttribute('name') ?? '';
        if (id) img.style.viewTransitionName = `wish-img-${id}`;

        const h2 = this.querySelector('h2');
        h2.textContent = this.getAttribute('name') ?? '';
        if (id) h2.style.viewTransitionName = `wish-title-${id}`;

        this.querySelector('.price').textContent = this.getAttribute('price') ?? '';

        const priority = this.querySelector('.priority');
        const priorityLevel = this.getAttribute('priority') ?? '';
        priority.textContent = PRIORITY_TRANSLATIONS[priorityLevel];
        priority.dataset.level = priorityLevel;
    }
}

customElements.define('wish-card', WishCard);