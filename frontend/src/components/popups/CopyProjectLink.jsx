import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const CopyProjectLink = ({ project }) => {
  // Copy link when copy button is clicked
  const [copyLink] = useState(
    `https//sonexaudio.app/project/${project._id}?client_view=true`
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleAllowUserToCopyLink = () => {
    navigator.clipboard.writeText(copyLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this Project</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view your project as a
            client.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {project.name} share link
            </Label>
            <Input id="link" value={copyLink} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className={`px-3 ${isCopied ? "cursor-not-allowed" : ""}`}
            disable={isCopied}
            onClick={handleAllowUserToCopyLink}
          >
            {isCopied ? (
              <>
                <span className="sr-only">Project is copied</span>
                <span className="flex gap-1">
                  <CheckCircle size={4} /> Copied!
                </span>
              </>
            ) : (
              <>
                <span className="sr-only">Copy Project Link Button</span>{" "}
                <CopyIcon className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyProjectLink;
