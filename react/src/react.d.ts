import { TodoItemProps } from "../../WebComponents/TodoItem";

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements extends JSX.IntrinsicElements {
      'todo-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement & TodoItemProps>>;
      'todo-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLFormElement>>;
    }
  }
}
