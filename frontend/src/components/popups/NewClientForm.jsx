import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const NewClientFormPopup = () => {
  return (
    <div>
      <Card>
        <form>
          <CardHeader>
            <CardTitle>
              <h3 className="text-2xl font-bold">Add Client</h3>
              <p className="italic text-secondary-foreground">
                Enter a client to add them to your projects.
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label>First Name</Label>
              <Input type="text" placeholder="John Doe" name="firstName" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="johndoe@example.com"
                name="email"
              />
            </div>
            <Button>Add Client</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default NewClientFormPopup;
