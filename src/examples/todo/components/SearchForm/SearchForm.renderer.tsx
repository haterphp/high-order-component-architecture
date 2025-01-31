import { TextField } from "@radix-ui/themes";
import { ChangeEventKeyBuilder, ICommonComponentProps, useRenderComponent } from "../../../../common/core";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, useState } from "react";
import { UPDATE_SEARCH_STRING } from "./SearchForm";

import './SearchForm.styles.css'

export default function SearchFormContentRenderer(props: ICommonComponentProps) {
	const { eventEmitter } = props

	const [inputValue, setInputValue] = useState('')

	useRenderComponent(props, {
		mount: () => { eventEmitter.addListener(ChangeEventKeyBuilder('searchString'), setInputValue) },
		unmount: () => { eventEmitter.removeListener(ChangeEventKeyBuilder('searchString'), setInputValue) },
	})

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault()
		eventEmitter.emit(UPDATE_SEARCH_STRING, event.target.value)
	}

	return (
		<div className="search_form">
			<TextField.Root className="search_form__input" placeholder="Search the task..." value={inputValue} onChange={handleOnChange}>
				<TextField.Slot>
					<MagnifyingGlassIcon height="16" width="16" />
				</TextField.Slot>
			</TextField.Root>
		</div>
	)
}