class TodoInput extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadow.innerHTML = `
      <form>
        <input type="text" name="todo" placeholder="What needs to be done?" />
      </form>
    `;

    const form = this.shadow.querySelector('form');

    if (!form) {
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target as unknown as HTMLFormElement
      const data = new FormData(target);
      this.dispatchEvent(new CustomEvent('add', { detail: data.get('todo') }));
      target.reset()
    });
  }

  disconnectedCallback() {
    const form = this.shadow.querySelector('form');
    form?.removeEventListener('submit', () => {});
  }
}

customElements.define('todo-input', TodoInput);
