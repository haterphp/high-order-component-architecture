import { TodoAppState } from "../TodoAppState"
import { sleep, sleepWithCallback } from "../utils/sleep"

const STORAGE_KEY = 'todoApp_todos'

export class TodoRepository<TTodoTaskItem = unknown> {
	private __storage: Storage

	private __state: TodoAppState

	constructor(state: TodoAppState) {
		this.__storage = window.localStorage
		this.__state = state

		this.__defineStorage()
	}

	public async getAllTasks(): Promise<void> {
		const data = this.__storage.getItem(STORAGE_KEY)
		if (data === null) return Promise.reject()

		return sleepWithCallback(1500, this.__state.setOriginalTasks.bind(this.__state), this.__deserializeData(data))
	}

	public async syncTasks(tasks: TTodoTaskItem[]): Promise<void> {
		this.__storage.setItem(STORAGE_KEY, this.__serializeData(tasks))
		return Promise.resolve()
	}

	private __defineStorage(): void {
		if (this.__storage.getItem(STORAGE_KEY) === null) {
			this.__storage.setItem(STORAGE_KEY, this.__serializeData([]))
		}
	}

	private __serializeData(data: TTodoTaskItem[]): string {
		return JSON.stringify(data)
	}

	private __deserializeData(data: string): TTodoTaskItem[] {
		return JSON.parse(data)
	}
}