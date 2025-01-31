import { FormState } from "../../common/utils/Form";

export interface IExampleFormObject {
	name: string
	age: number
	isAgree: boolean
}

export class ExampleFormState extends FormState<IExampleFormObject> {
	constructor() {
		super({
			formObject: {
				name: '',
				age: 0,
				isAgree: false,
			}
		})
	}
}