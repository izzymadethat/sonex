import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Archive, Ban, CheckCircle2, Circle } from "lucide-react";

const formGroupStyles = "flex flex-col gap-3 w-full mb-4";

const FormLabel = ({ children }) => {
  return (
    <Label className="text-sm font-bold text-secondary-foreground">
      {children}
    </Label>
  );
};

const EditProjectForm = ({ project }) => {
  const [titleInput, setTitleInput] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [paymentStatus, setPaymentStatus] = useState(project.paymentStatus);
  const [projectAmount, setProjectAmount] = useState(project.projectAmount);
  const [clients, setClients] = useState(project.clients); // Array of client objects
  const [comments, setComments] = useState(project.comments); // Array of comment objects
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Enable save changes button when any of the form fields change
  useEffect(() => {
    if (
      titleInput !== project.title ||
      description !== project.description ||
      status !== project.status ||
      paymentStatus !== project.paymentStatus ||
      projectAmount !== project.projectAmount
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [titleInput, description, status, paymentStatus, projectAmount]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="col-span-2 px-4 py-2 mx-auto text-sm border rounded-md border-primary text-muted-foreground hover:text-primary w-fit lg:mx-0 lg:mb-0 justify-self-end"
        >
          Edit Project Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project Details</DialogTitle>
        </DialogHeader>

        <div>
          <div className={formGroupStyles}>
            <FormLabel>Project Title</FormLabel>
            <Input value={titleInput} />
          </div>
          <div className={formGroupStyles}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description}></Textarea>
          </div>

          {/* Project Status */}
          <div className={formGroupStyles}>
            <FormLabel>Project Status</FormLabel>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={status[0].toUpperCase() + status.slice(1)}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="active"
                  className="cursor-pointer bg-primary/20"
                >
                  <span className="flex items-center gap-1">
                    <Circle size={16} /> Active
                  </span>
                </SelectItem>
                <SelectItem
                  value="completed"
                  className="cursor-pointer bg-green-600/30"
                >
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={16} /> Completed
                  </span>
                </SelectItem>
                <SelectItem
                  value="archived"
                  className="cursor-pointer bg-red-600/30"
                >
                  <span className="flex items-center gap-1">
                    <Archive size={16} /> Archived
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Status */}
          <div className={formGroupStyles}>
            <FormLabel>Payment Status</FormLabel>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    paymentStatus[0].toUpperCase() + paymentStatus.slice(1)
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid" className="cursor-pointer">
                  <span className="flex items-center gap-1">
                    <Circle size={16} /> Unpaid
                  </span>
                </SelectItem>
                <SelectItem
                  value="completed"
                  className="cursor-pointer bg-green-600/30"
                >
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={16} /> Paid
                  </span>
                </SelectItem>
                <SelectItem value="no-charge" className="cursor-pointer">
                  <span className="flex items-center gap-1">
                    <Ban size={16} /> No Charge
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Amount */}
          <div className={formGroupStyles}>
            <FormLabel>Project Amount</FormLabel>
            <Input value={projectAmount} type="number" />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="destructive">Close</Button>
            </DialogClose>
            <Button disabled={isSaveDisabled}>Edit Project</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditProjectForm;
