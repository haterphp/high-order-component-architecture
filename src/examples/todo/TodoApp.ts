import { HighOrderComponent, HighOrderComponentState, ICommonComponentProps, RenderComponent } from "../../common/core";
import { SearchFormComponent } from "./components/SearchForm/SearchForm";
import { TasksListComponent } from "./components/TasksList/TasksList";
import { TodoAppState } from "./TodoAppState";

type TodoAppComponents =	'searchFormComponent'
							| 'taskListComponent'

export interface ITodoAppComponentProps extends ICommonComponentProps {
	components: Record<TodoAppComponents, (root: HTMLDivElement) => HighOrderComponent<HighOrderComponentState>>
}

export class TodoApp extends HighOrderComponent<TodoAppState, ITodoAppComponentProps> {
	constructor(root: HTMLElement) {
		super({
			root,
			state: new TodoAppState(),
			components: {
				content: new RenderComponent<TodoAppState, ITodoAppComponentProps>({
					component: import('./TodoApp.renderer')
				})
			}
		})
	}

	protected _getComponentProps(): ITodoAppComponentProps {
		return { components: this.__defineChildComponents(), ...super._getComponentProps() }
	}

	private __defineChildComponents(): ITodoAppComponentProps['components'] {
		return {
			searchFormComponent: (root) => new SearchFormComponent(root, this._state),
			taskListComponent: (root) => new TasksListComponent(root, this._state)
		}
	}
}