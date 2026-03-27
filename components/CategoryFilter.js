const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

class CategoryFilter extends HTMLElement {
    static observedAttributes = ['categories'];

    connectedCallback() {
        this.addEventListener('click', (event) => {
            const button = event.target.closest('[data-category]');
            if (!button) return;

            const buttons = this.querySelectorAll('button');

            for (const b of buttons) {
                b.classList.toggle('active', b === button);
            }

            this.dispatchEvent(new CustomEvent('filter', {
                detail: { category: button.dataset.category },
                bubbles: true,
            }));
        });

        this.#render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.#render();
    }

    #render() {
        const categoriesString = this.getAttribute('categories');
        if (!categoriesString) return;

        this.replaceChildren();

        const categories = JSON.parse(categoriesString);
        const filters = [['All', ''], ...categories.map((c) => [capitalize(c), c])]

        for (const [label, value] of filters) {
            const button = document.createElement('button');

            button.type = 'button';
            button.textContent = label;
            button.dataset.category = value;

            if (!value) button.classList.add('active');

            this.append(button);
        }
    }
}

customElements.define('category-filter', CategoryFilter);
