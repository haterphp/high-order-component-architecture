export const onAction = (transactionName: string): string => `action.${transactionName}`
export const onRequest = (transactionName: string): string => `request.${transactionName}`