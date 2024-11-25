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
import { createProject, getProjects } from "@/store/projectSlice";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const NewProjectFormPopup = ({ triggerElement }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.projects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectCost, setProjectCost] = useState("0");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // reset form fields when dialog is closed or form is submitted
  const resetFormFields = () => {
    setTitle("");
    setDescription("");
    setProjectCost("0");
    setDate("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetFormFields();
    }
  }, [isOpen]);


  const handleErrorsFromState = () => {
    const stateErrors = {};
    setErrors({});
    if (error.title) {
      stateErrors.title = error.title;
    }

    if (error.description) {
      stateErrors.description = error.description;
    }

    if (error.projectAmount) {
      stateErrors.projectAmount = error.projectAmount;
    }

    return stateErrors;
  };

  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format

    if (date && !dateRegex.test(date)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Please enter a valid date in YYYY-MM-DD format."
      }));
    } else if (selectedDate < currentDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "The selected date cannot be in the past."
      }));
    } else {
      setErrors((prevErrors) => {
        const { date, ...rest } = prevErrors; // Remove date error if it exists
        return rest;
      });
    }
  }, [date]);

  const handleCreateNewProject = async () => {
    setErrors({});
    const projectInfo = {
      title,
      description,
      projectAmount: projectCost ? parseFloat(Number(projectCost).toFixed(2)) : "",
      date
    };


    try {
      const result = await dispatch(createProject(projectInfo));

      if (createProject.rejected.match(result)) {
        const stateErrors = handleErrorsFromState();
        if (Object.keys(stateErrors).length > 0) {
          setErrors(stateErrors);
        }
        return;
      }

      await dispatch(getProjects());
      setIsOpen(false);
      toast({
        title: "Project Created",
        description: "Your project has been created",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message
      });
    }

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
              <Label>Title <span className="text-red-500">*</span></Label>
              <Input
                required
                type="text"
                name="title"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <p className="text-xs italic text-muted-foreground">minimum of 3 characters</p>
                {errors.title && (
                  <p className="text-sm bg-red-500">{errors.title}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description <span className="text-red-500">*</span></Label>
              <Textarea
                name="description"
                placeholder="Describe the project. 200 characters max"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-2">
                <p className="text-xs italic text-muted-foreground">minimum of 3 characters</p>
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

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
              {errors.date && (
                <p className="text-sm text-red-500">Date can not be in the past</p>
              )}
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
            disabled={!title || !description || title.length < 3 || status === "loading"}
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
