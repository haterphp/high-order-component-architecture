import { HighOrderComponent, ICommonComponentProps, IHighOrderComponentPayload } from "../../core";
import { FormState } from "./FormState";
import { FormTransactions } from "./FormTransactions";

export type OnSubmitActionFunction = (() => void)

export class FormComponent<
	TFormStateObject extends object,
	TComponentProps extends ICommonComponentProps = ICommonComponentProps,
	TFormState extends FormState<TFormStateObject> = FormState<TFormStateObject>,
> extends HighOrderComponent<TFormState, TComponentProps> {
	constructor(payload: IHighOrderComponentPayload<TFormState, TComponentProps>) {
		super(payload)
	}

	public injected(): void {
		super.injected()

		this._eventEmitter.addListener(FormTransactions.onKeyChange, this._state.setFormObjectValueByKey.bind(this._state))

		for (const listener of this._getOnSubmitActions()) {
			this._eventEmitter.addListener(FormTransactions.onSubmit, listener.bind(listener))
		}
	}

	protected _getOnSubmitActions(): OnSubmitActionFunction[] {
		return []
	}
}