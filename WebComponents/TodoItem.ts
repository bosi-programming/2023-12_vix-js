export interface TodoItemProps {
  itemId: number;
  text: string;
  completed: boolean;
}

class TodoItem extends HTMLElement implements TodoItemProps {
  itemId: number = 0;
  text: string = '';
  completed: boolean = false;
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['completed'];
  }

  attributeChangedCallback(_: string, oldValue: boolean, newValue: boolean) {
    if (oldValue === newValue) {
      return;
    }

    this.completed = newValue;
  }

  connectedCallback() {
    this.itemId = Number(this.getAttribute('data-itemId')) || 0;
    this.text = this.getAttribute('data-text') || '';
    this.completed = this.getAttribute('data-completed') === 'true' ? true : false;
    const { itemId, text, completed } = this;

    this.shadow.innerHTML = `
      <div>
        <input id="todo-${itemId}" type="checkbox" bind:checked="${completed}" />
        <label for="todo-${itemId}">${text}</label>
        <button aria-label="delete ${text}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M10.707,1.293a1,1,0,0,0-1.414,0L6,4.586,2.707,1.293A1,1,0,0,0,1.293,2.707L4.586,6,1.293,9.293a1,1,0,1,0,1.414,1.414L6,7.414l3.293,3.293a1,1,0,0,0,1.414-1.414L7.414,6l3.293-3.293A1,1,0,0,0,10.707,1.293Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    `;

    const checkbox = this.shadow.querySelector('input');
    const button = this.shadow.querySelector('button');

    checkbox?.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('toggle', { detail: { id: itemId } }));
    });

    button?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete', { detail: { id: itemId } }));
    });
  }

  disconnectedCallback() {
    const checkbox = this.shadow.querySelector('input');
    const button = this.shadow.querySelector('button');

    checkbox?.removeEventListener('change', () => { });
    button?.removeEventListener('click', () => { });
  }
}

customElements.define('todo-item', TodoItem);
