import { HighOrderComponentState, IHighOrderComponentState } from "../../core";
import { FormTransactions } from "./FormTransactions";

export type SetFormObjectValueByKeyAction<
	TFormObject extends object,
	TKey extends keyof TFormObject = keyof TFormObject
> = { key: TKey, value: TFormObject[TKey] }

interface IFormStateObject<TFormObject extends object> extends IHighOrderComponentState {
	formObject: TFormObject
}

export class FormState<TFormObject extends object = object> extends HighOrderComponentState<IFormStateObject<TFormObject>> {
	public get formObject(): TFormObject {
		return this._stateObject.formObject
	}

	public setFormObjectValueByKey(payload: SetFormObjectValueByKeyAction<TFormObject>): void {
		const { key, value } = payload

		if (key === undefined || value === undefined) {
			throw new Error(`Incorrent payload in ${this.constructor.name}; Need to pass object like - "{ key: ..., value: ... }"`)
		}

		this._stateObject.formObject[key] = value

		// Emit data about key changes
		this._eventEmitter.emit(FormTransactions.onKeyChanged<TFormObject>(key), value)
	}
}