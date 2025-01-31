import { useInjectComponent, useRenderComponent } from '../../common/core'
import { ITodoAppComponentProps } from './TodoApp'
import './TodoApp.styles.css'

export default function TodoAppComponent(props: ITodoAppComponentProps): JSX.Element {
	useRenderComponent(props)

	const searchFormComponentRef = useInjectComponent(props.components.searchFormComponent)
	const tasksListComponentRef = useInjectComponent(props.components.taskListComponent)

	return (
		<div className='todo-app'>
			<div ref={searchFormComponentRef} className='todo-app__search_form'></div>
			<div ref={tasksListComponentRef} className='todo-app__tasks_list'></div>
		</div>
	)
}