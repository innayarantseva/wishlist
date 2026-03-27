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

        const pri = this.querySelector('.priority');
        pri.textContent = this.getAttribute('priority') ?? '';
        pri.dataset.level = this.getAttribute('priority') ?? '';
    }
}

customElements.define('wish-card', WishCard);