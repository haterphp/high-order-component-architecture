import { Button, Heading, TextField } from '@radix-ui/themes'
import './ExampleForm.styles.css'
import { ICommonComponentProps } from '../../common/core'
import { useForm } from '../../common/utils/Form'
import { IExampleFormObject } from './ExampleFormState'

export default function ExampleFormRenderer(props: ICommonComponentProps): JSX.Element {
	const {handleOnFormSubmit, handleOnValueChanged} = useForm<IExampleFormObject>(props)

	return (
		<div className='example-form-wrapper'>
			<form className='example-form' onSubmit={handleOnFormSubmit}>
				<Heading mb="2" size="7" style={{ textTransform: 'uppercase' }}>Form example</Heading>

				<TextField.Root mb="2" placeholder="Please enter name" onChange={handleOnValueChanged('name')}>
				</TextField.Root>

				<Button type='submit'>Send</Button>
			</form>
		</div>
	)
}