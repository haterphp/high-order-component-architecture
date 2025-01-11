import { HighOrderComponent, HighOrderComponentState, ICommonComponentProps, RenderComponent } from "../../core/Render";
import { SearchFormComponent } from "./components/SearchForm/SearchForm";
import { TodoAppState } from "./TodoAppState";

type TodoAppComponents =	'searchFormComponent'
							// | 'taskListComponent'

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
			searchFormComponent: (root) => new SearchFormComponent(root, this._state)
		}
	}
}