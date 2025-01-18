import { HighOrderComponentState, ICommonComponentProps, IRenderComponentPayload, RenderComponent } from "../../../../../core/Render";
import { TodoAppState } from "../../../TodoAppState";

export class TasksListLoadingRenderComponent extends RenderComponent<HighOrderComponentState> {
	private __applicationState: TodoAppState

	constructor(applicationState: TodoAppState) {
		super({ component: import('./TasksListLoading.renderer') })
		this.__applicationState = applicationState
	}

	public mount(): void {

	}
}