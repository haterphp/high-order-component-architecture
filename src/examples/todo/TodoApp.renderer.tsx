import { useInjectComponent, useRenderComponent } from '../../core/Render'
import { ITodoAppComponentProps } from './TodoApp'
import './TodoApp.styles.css'

export default function TodoAppComponent(props: ITodoAppComponentProps): JSX.Element {
	useRenderComponent(props)

	const searchFormComponentRef = useInjectComponent(props.components.searchFormComponent)

	return (
		<div className='todo-app'>
			<div ref={searchFormComponentRef} className='todo-app__search_form'></div>
		</div>
	)
}