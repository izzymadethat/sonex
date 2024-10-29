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
import { Archive, Ban, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "@/features/projects/projectsSlice";

const formGroupStyles = "flex flex-col gap-3 w-full mb-4";

const FormLabel = ({ children }) => {
  return (
    <Label className="text-sm font-bold text-secondary-foreground">
      {children}
    </Label>
  );
};

const EditProjectForm = ({ project }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.projects);
  const [titleInput, setTitleInput] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [paymentStatus, setPaymentStatus] = useState(project.paymentStatus);
  const [projectAmount, setProjectAmount] = useState(project.projectAmount);
  const [clients, setClients] = useState(project.clients); // Array of client objects
  const [comments, setComments] = useState(project.comments); // Array of comment objects
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Enable save changes button when any of the form fields change
  useEffect(() => {
    if (
      titleInput !== project.title ||
      description !== project.description ||
      projectStatus !== project.status ||
      paymentStatus !== project.paymentStatus ||
      projectAmount !== project.projectAmount
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [titleInput, description, projectStatus, paymentStatus, projectAmount]);

  const handleProjectStatusChange = (value) => {
    setProjectStatus(value);
  };
  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const handleUpdateProject = async () => {
    const updatedForm = {
      id: project._id,
      title: titleInput,
      description: description,
      status: projectStatus,
      paymentStatus: paymentStatus,
      projectAmount: parseFloat(Number(projectAmount).toFixed(2))
    };
    await dispatch(updateProject(updatedForm));
    setIsOpen(false);
  };
  // TODO: Set functionality to reset to original values when cancel button is clicked

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
          <div className={formGroupStyles}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Textarea>
          </div>

          {/* Project Status */}
          <div className={formGroupStyles}>
            <FormLabel>Project Status</FormLabel>
            <Select
              value={projectStatus}
              onValueChange={handleProjectStatusChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    projectStatus[0].toUpperCase() + projectStatus.slice(1)
                  }
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
            <Select
              value={paymentStatus}
              onValueChange={handlePaymentStatusChange}
            >
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
                  value="paid"
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
            <Input
              value={projectAmount}
              type="number"
              onChange={(e) => setProjectAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isSaveDisabled || status === "loading"}
              onClick={handleUpdateProject}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="mr-0.5 animate-spin" />
                  <span>"Updating Project..."</span>{" "}
                </>
              ) : (
                "Edit Project"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditProjectForm;
