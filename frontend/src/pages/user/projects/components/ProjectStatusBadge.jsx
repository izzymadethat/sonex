import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const ProjectStatusBadge = ({ projectStatus }) => {
  return (
    <Badge className="text-xs uppercase flex gap-1.5">
      <CheckCircle2 />
      {projectStatus[0].toUpperCase() + projectStatus.slice(1)}
    </Badge>
  );
};
export default ProjectStatusBadge;
