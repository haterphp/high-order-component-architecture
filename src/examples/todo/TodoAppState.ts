import { ChangeEventKeyBuilder, HighOrderComponentState, IHighOrderComponentState } from "../../common/core";

interface ITodoAppStateObject extends IHighOrderComponentState {
	originalTasks: unknown[];
	tasks: unknown[];
}

export class TodoAppState extends HighOrderComponentState<ITodoAppStateObject> {
	constructor(){
		super({ tasks: [], originalTasks: [] })
	}

	public injected(): void {
		this._eventEmitter.addListener(ChangeEventKeyBuilder('originalTasks'), this.setTasks.bind(this))
	}

	public setOriginalTasks(tasks: unknown[]): void {
		this._setStateValue('originalTasks', () => tasks)
	}

	public addOriginalTask(task: unknown): void {
		this._setStateValue('originalTasks', (tasks) => tasks.concat(task))
	}

	public setTasks(tasks: unknown[]): void {
		console.log(tasks, 'something happening here')
	}
}