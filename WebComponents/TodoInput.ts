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

      const data = new FormData(e.target as HTMLFormElement);
      console.log(data, e.target);

      this.dispatchEvent(new CustomEvent('add', { detail: data.get('todo') }));
      const target = e.target as HTMLFormElement
      target.reset()
    });
  }
}

customElements.define('todo-input', TodoInput);
