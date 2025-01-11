import { HighOrderComponentState, IHighOrderComponentState } from "../../core/Render";

interface ITodoAppStateObject extends IHighOrderComponentState {
	originalTasks: unknown[];
	tasks: unknown[];
}

export class TodoAppState extends HighOrderComponentState<ITodoAppStateObject> {
	constructor(){
		super({ tasks: [], originalTasks: [] })
	}

	public setOriginalTasks(): void {}

	public addOriginalTask(): void {}

	public setTasks(): void {}
}