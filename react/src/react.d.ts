declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'todo-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    }
  }
}
