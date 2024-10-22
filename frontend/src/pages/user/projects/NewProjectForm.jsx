import {
  CardDescription,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";

const NewProjectForm = () => {
  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>New Project</CardTitle>
          <CardDescription>
            Create a new project, then share with your client(s)!
          </CardDescription>
        </CardHeader>
      </form>
    </Card>
  );
};
export default NewProjectForm;
