import { Theme } from "@radix-ui/themes";
import { useInjectComponent } from "./core/Render/Component/useInjectComponent";
import { ITodoAppComponentProps, TodoApp } from "./examples/todo/TodoApp";
import { TodoAppState } from "./examples/todo/TodoAppState";

export default function App() {
  const todoAppComponentRef = useInjectComponent<HTMLDivElement, TodoAppState, ITodoAppComponentProps>(
    (root: HTMLDivElement) => new TodoApp(root)
  );

  return (
	<Theme>
		<div ref={todoAppComponentRef} style={{ width: '100%', height: '100%' }} />
	</Theme>
  );
}
