import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createProject, getProjects } from "@/features/projects/projectsSlice";
import { Loader2 } from "lucide-react";

const NewProjectFormPopup = ({ triggerElement }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.projects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectCost, setProjectCost] = useState("0");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateNewProject = async () => {
    const projectInfo = {
      title,
      description,
      projectAmount: parseFloat(Number(projectCost).toFixed(2)),
      date
    };

    await dispatch(createProject(projectInfo));
    await dispatch(getProjects());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          <DialogDescription>
            {" "}
            Create a new project, then share with your client(s)!
          </DialogDescription>
        </DialogHeader>

        <section>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                required
                type="text"
                name="title"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Describe the project. 200 characters max"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Project Cost</Label>
              <Input
                name="project-cost"
                placeholder="0"
                type="number"
                value={projectCost}
                onChange={(e) => setProjectCost(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Expected Date</Label>
              <Input
                name="due-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </section>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleCreateNewProject}
            disabled={!title || title.length < 6 || status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={24} className="mr-0.5 animate-spin" />
                <span>Creating Project...</span>
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectFormPopup;
