import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card";

import { convertStorageInMBtoGB } from "@/helper/equations";
import FileTable from "./FileTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";

const ViewSingleProjectPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    state.projects.find((p) => String(p.id) === params.projectId)
  );
  return (
    <section className="m-8 space-y-8">
      {/* Project Details */}
      <div className="grid items-center justify-between grid-cols-1 space-y-4 lg:space-y-0 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center col-span-3 gap-4 lg:items-start">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <Badge className="text-xs">
              {project.status[0].toUpperCase() + project.status.slice(1)}
            </Badge>
            <Badge
              className={`text-xs ${
                project.paymentStatus === "paid"
                  ? "bg-green-500 text-green-50 flex items-center hover:bg-green-600"
                  : ""
              }`}
            >
              {project.paymentStatus === "paid" && <CheckCircle2 />}
              {project.paymentStatus[0].toUpperCase() +
                project.paymentStatus.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>

        {/* Edit project button. TODO: Convert to modal*/}
        <Link
          to="#"
          className="col-span-2 px-4 py-2 mx-auto text-sm border rounded-md border-primary text-muted-foreground hover:text-primary w-fit lg:mx-0 lg:mb-0 justify-self-end "
        >
          Edit Project Details
        </Link>
      </div>
      <div className="flex w-full">
        <Input
          readOnly
          placeholder={`https://sonex.app/project/${project.id}?client_view=true`}
          className="w-full"
        />
        <Button>Copy Client Link</Button>
      </div>

      {/* Project Overview and Stats */}
      <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">
                Project Balance
              </CardTitle>
              <CardDescription className="text-lg font-extrabold text-muted-foreground">
                ${project.projectAmount.toFixed(2)}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-xl">Storage Used</CardTitle>
              <CardDescription className="text-lg font-extrabold text-muted-foreground">
                {convertStorageInMBtoGB(project.storageUsed).toFixed(2)}Gb /
                256Gb
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      <FileTable />
    </section>
  );
};

export default ViewSingleProjectPage;
