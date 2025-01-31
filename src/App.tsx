import { Theme } from "@radix-ui/themes";
import { useInjectComponent } from "./common/core/Component/useInjectComponent";
import { ITodoAppComponentProps, TodoApp } from "./examples/todo/TodoApp";

import { TodoAppState } from "./examples/todo/TodoAppState";
import { ExampleFormComponent } from "./examples/form/ExampleFormComponent";

export default function App() {
  const todoAppComponentRef = useInjectComponent<HTMLDivElement, TodoAppState, ITodoAppComponentProps>(
    (root: HTMLDivElement) => new TodoApp(root)
  );

  const exampleFormComponentRef = useInjectComponent<HTMLDivElement>(
    (root: HTMLDivElement) => new ExampleFormComponent(root)
  );

  return (
	<Theme>
		<div ref={exampleFormComponentRef} style={{ width: '100%', height: '100%' }} />
	</Theme>
  );
}
