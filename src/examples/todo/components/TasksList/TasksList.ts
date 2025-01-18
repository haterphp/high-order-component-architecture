import { HighOrderComponent, HighOrderComponentState, RenderComponent, RenderComponentVariantsEnum } from "../../../../core/Render";
import { TodoAppState } from "../../TodoAppState";
import { TasksListLoadingRenderComponent } from "./renderers/TasksListLoading";

export class TasksListComponent extends HighOrderComponent<HighOrderComponentState> {
	private __applicationState: TodoAppState

	constructor(root: HTMLDivElement, applicationState: TodoAppState) {
		super({
			components: {
				loading: new TasksListLoadingRenderComponent(applicationState),
				content: new RenderComponent({ component: import('./renderers/TasksListContent.renderer') })
			},
			root,
			state: new HighOrderComponentState({
				renderComponentVariant: RenderComponentVariantsEnum.LOADING
			})
		})

		this.__applicationState = applicationState
	}
}