import { RenderComponent } from "../../common/core";
import { FormComponent, OnSubmitActionFunction } from "../../common/utils/Form";
import { ExampleFormState, IExampleFormObject } from "./ExampleFormState";

export class ExampleFormComponent extends FormComponent<IExampleFormObject> {
	constructor(root: HTMLDivElement) {
		super({
			state: new ExampleFormState(),
			components: {
				content: new RenderComponent({ component: import('./ExampleForm.renderer') })
			},
			root
		})
	}

	protected _getOnSubmitActions(): OnSubmitActionFunction[] {
		return [this.__onFormSended.bind(this)]
	}

	private __onFormSended(): void {
		console.log('formObject: ', this._state.stateObject.formObject)
	}
}