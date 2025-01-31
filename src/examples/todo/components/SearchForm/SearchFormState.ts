import { HighOrderComponentState, IHighOrderComponentState } from "../../../../common/core";

interface ISearchFormComponentStateObject extends IHighOrderComponentState {
	searchString: string
}

export class SearchFormComponentState extends HighOrderComponentState<ISearchFormComponentStateObject> {
	constructor(){
		super({ searchString: '' })
	}

	public updateSearchString(value: string): void {
		this._setStateValue('searchString', () => value)
	}
}