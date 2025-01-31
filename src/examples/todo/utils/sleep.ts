export const sleep = (delay: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

export const sleepWithCallback = (delay: number, callback: (...args: any[]) => void, ...args: any[]): Promise<void> => {
	return sleep(delay).then(callback.bind(callback, ...args))
}