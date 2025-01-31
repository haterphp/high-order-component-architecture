import { Grid } from "@radix-ui/themes";
import TaskItemSkeleton from "../ui/TaskItem/TaskItemSkeleton";
import { ICommonComponentProps, useRenderComponent } from "../../../../../common/core";

export default function TasksListlLoadingRenderer(props: ICommonComponentProps) {
	useRenderComponent(props)
	return (
		<Grid columns={"3"} gap={"3"} width={"auto"}>
			{ Array.from({ length: 9 }).map((_, i) => <TaskItemSkeleton key={i.toString()}/>) }
		</Grid>
	)
}