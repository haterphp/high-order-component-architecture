import { Grid } from "@radix-ui/themes";
import TaskItemSkeleton from "../ui/TaskItem/TaskItemSkeleton";

export default function TasksListContentRenderer() {
	return (
		<Grid columns={"3"} gap={"3"} width={"auto"}>
			{ Array.from({ length: 9 }).map(TaskItemSkeleton) }
		</Grid>
	)
}