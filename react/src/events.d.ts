interface CustomEventMap {
  "add": CustomEvent<string>;
  "toggle": CustomEvent<{ id: number }>;
  "delete": CustomEvent<{ id: number }>;
}
declare global {
  interface HTMLFormElement {
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
  interface HTMLDivElement {
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}
export { }; //keep that for TS compiler.
