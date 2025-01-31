import { ChangeEvent, ChangeEventHandler, FormEvent } from "react";
import { ICommonComponentProps, useRenderComponent } from "../../core";
import { FormTransactions } from "./FormTransactions";

interface IUseFormReturns<TFormObject> {
	handleOnFormSubmit(event: FormEvent): void
	handleOnValueChanged(key: keyof TFormObject): ChangeEventHandler<HTMLInputElement>
}

const getInputValue = (event: ChangeEvent<HTMLInputElement>) => {
	return event.target.value
}

export const useForm = <TFormObject extends object>(props: ICommonComponentProps): IUseFormReturns<TFormObject> => {
	useRenderComponent(props)

	const handleOnFormSubmit: IUseFormReturns<TFormObject>['handleOnFormSubmit'] = (event): void  => {
		event.preventDefault()
		props.eventEmitter.emit(FormTransactions.onSubmit)
	}

	const handleOnValueChanged: IUseFormReturns<TFormObject>['handleOnValueChanged'] = (key) => {
		return (event) => {
			event.preventDefault()
			props.eventEmitter.emit(FormTransactions.onKeyChange, { key, value: getInputValue(event) })
		}
	}

	return { handleOnFormSubmit, handleOnValueChanged }
}