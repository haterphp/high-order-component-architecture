import { ChangeEventKeyBuilder, HighOrderComponent, RenderComponent } from "../../../../core/Render";
import { TodoAppState } from "../../TodoAppState";
import { SearchFormComponentState } from "./SearchFormState";

export const UPDATE_SEARCH_STRING = 'update_searchString'

export class SearchFormComponent extends HighOrderComponent<SearchFormComponentState> {
	private __applicationState: TodoAppState

	constructor(root: HTMLDivElement, applicationState: TodoAppState) {
		super({
			root,
			components: {
				content: new RenderComponent({ component: import('./SearchForm.renderer') })
			},
			state: new SearchFormComponentState(),
		})

		this.__applicationState = applicationState
	}

	public injected(): void {
		super.injected()

		this._eventEmitter.addListener(UPDATE_SEARCH_STRING, this._state.updateSearchString.bind(this._state))
		this._eventEmitter.addListener(ChangeEventKeyBuilder('searchString'), this.__filterTaskBySearchString.bind(this))
	}

	private __filterTaskBySearchString(searchString: string): void {
		console.log(searchString)
	}
}