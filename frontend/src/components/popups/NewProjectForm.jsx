import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
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

const NewProjectFormPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
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
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Describe the project. 200 characters max"
                maxLength={200}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Project Cost</Label>
              <Input name="project-cost" placeholder="0" type="number" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Expected Date</Label>
              <Input name="due-date" type="date" />
            </div>
          </div>
        </section>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" disabled>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectFormPopup;
