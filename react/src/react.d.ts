import { TodoItemAttributes } from "../../WebComponents/TodoItem";

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements extends JSX.IntrinsicElements {
      'todo-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement & TodoItemAttributes>>;
      'todo-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>>;
    }
  }
}
