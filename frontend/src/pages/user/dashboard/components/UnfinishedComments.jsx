import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { selectAllProjects } from "@/store/projectSlice";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UnfinishedComment = ({ comment, projects }) => {
	const dispatch = useDispatch();
	const [clicked, setClicked] = useState(false);
	const [projectTitle, setProjectTitle] = useState("");

	useEffect(() => {
		const getProjectTitle = async () => {
			const project = projects.find((p) => p.id === comment.projectId);
			setProjectTitle(project.title);
		};
		getProjectTitle();
	}, [dispatch]);

	return (
		<Card
			className={
				"flex items-center w-full gap-2 p-4 rounded-md shadow-md cursor-pointer hover:bg-secondary/50"
			}
			variant={clicked ? "" : "secondary"}
			onClick={() => {
				setClicked(!clicked);
				// setTimeout(() => {
				//   dispatch(updateComment({ ...comment, isCompleted: clicked }));
				// }, 3500);
			}}
		>
			<span className={clicked ? "line-through" : ""}>
				{clicked ? (
					`Completed: ${comment.text}`
				) : (
					<>
						{comment.text} :{" "}
						<span className="font-bold uppercase">{projectTitle}</span>
					</>
				)}
			</span>
		</Card>
	);
};

const UnfinishedCommentsGrid = ({ unfinishedComments }) => {
	const projects = useSelector(selectAllProjects);
	return (
		<>
			{unfinishedComments.length > 0 ? (
				<div className="grid grid-cols-1 gap-2 min-h-[225px] max-h-[225px] lg:max-h-[300px] overflow-y-auto px-6 lg:px-0 relative">
					{unfinishedComments.map((comment) => (
						<UnfinishedComment
							key={comment.id}
							comment={comment}
							projects={projects}
						/>
					))}

					<Button className="absolute bottom-0 w-full">
						Mark all as completed
					</Button>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center border-dashed border min-h-[225px] rounded-md gap-2 mt-8">
					<span className="dark:text-primary">
						<CheckCircle size={48} />
					</span>
					<span className="text-lg text-muted-foreground">
						<em>Awesome!</em> No comments to review!
					</span>
				</div>
			)}
		</>
	);
};

const UnfinishedComments = ({ comments }) => {
	const unfinishedComments = comments.filter(
		(comment) => !comment.isCompleted && comment.type === "revision",
	);

	return (
		<div className="w-full p-6 border rounded-md shadow-md">
			<div className="mb-4">
				<h3 className="text-lg font-bold uppercase">Unfinished Tasks:</h3>
				<p className="italic">Don&apos;t leave your clients hanging!</p>
			</div>

			{/* Unfinished Comments Grid */}
			<UnfinishedCommentsGrid unfinishedComments={unfinishedComments} />
		</div>
	);
};
export default UnfinishedComments;
