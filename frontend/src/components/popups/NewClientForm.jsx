import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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

const NewClientFormPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h3 className="text-2xl font-bold">Add Client</h3>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm italic text-secondary-foreground">
              Enter a client to add them to your projects.
            </p>
          </DialogDescription>
        </DialogHeader>
        <section>
          <div>
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
          </div>
        </section>
        <DialogFooter>
          <div className="flex items-center justify-between gap-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button disabled>Add Client</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewClientFormPopup;
