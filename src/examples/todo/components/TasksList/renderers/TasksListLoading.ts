import { HighOrderComponentState, RenderComponent, RenderComponentVariantsEnum } from "../../../../../common/core";
import { TodoRepository } from "../../../repositories/TodoRepository";
import { TodoAppState } from "../../../TodoAppState";

export class TasksListLoadingRenderComponent extends RenderComponent<HighOrderComponentState> {
	private __dataRepository: TodoRepository

	constructor(applicationState: TodoAppState) {
		super({ component: import('./TasksListLoading.renderer') })

		this.__dataRepository = new TodoRepository(applicationState)
	}

	public mount(): void {
		this.__dataRepository.getAllTasks()
			.then(this._state.updateRenderComponent.bind(this._state, RenderComponentVariantsEnum.CONTENT))
	}
}