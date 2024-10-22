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

const NewProjectFormPopup = () => {
  return (
    <section className="mt-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">New Project</CardTitle>
            <CardDescription>
              Create a new project, then share with your client(s)!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-8">
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="destructive" type="button">
              <Link to="..">Cancel</Link>
            </Button>
            <Button type="submit" disabled>
              Create Project
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default NewProjectFormPopup;
