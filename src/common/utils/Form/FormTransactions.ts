import { onAction } from "../Transactions/TransactionMarker"

export class FormTransactions {
	public static readonly onSubmit = onAction('onFormSubmitted')
	public static readonly onKeyChange = onAction(`onKeyChange`)
	public static readonly onKeyChanged = <TFormObject extends object, TKey extends keyof TFormObject = keyof TFormObject>(key: TKey) => onAction(`onKeyChanged.${key.toString()}`)
}