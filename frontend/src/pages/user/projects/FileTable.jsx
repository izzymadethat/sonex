import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableCaption
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { File, Folder, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { selectProjectFiles } from "@/features/files/filesSlice";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";

const FileTable = ({ projectId }) => {
  const allFiles = useSelector(selectProjectFiles);
  const files = allFiles
    .slice()
    .filter((file) => String(file.projectId) === String(projectId))
    .map((f) => {
      const date = parseISO(f.dateAdded);
      const timePeriod = formatDistanceToNow(date);
      const timeAgo = `${timePeriod} ago`;

      // Return a new object with the updated dateAdded field
      return { ...f, dateAdded: timeAgo };
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase">Project Files</h3>
            <Select>
              <SelectTrigger className="max-w-[120px]">
                <SelectValue placeholder="New..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="newFile"
                  className="flex gap-2 cursor-pointer"
                >
                  File
                </SelectItem>
                <SelectItem
                  value="newFolder"
                  className="flex gap-2 cursor-pointer"
                >
                  Folder
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          {/* <TableCaption>No files uploaded yet.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Label>Name</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Label>File Type</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Label>Date Added</Label>
                </div>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell
                colSpan={4}
                onClick={() => alert("Navigating...")}
                className="cursor-pointer "
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <Folder className="text-primary" />
                  <Label className="cursor-pointer"> / Client Uploads</Label>
                </div>
              </TableCell>
            </TableRow>
            {/* All files from project */}
            {files.map((file) => (
              <TableRow key={file.id} className="cursor-pointer">
                <TableCell>
                  <Link to="#">{file.name}</Link>
                </TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.dateAdded}</TableCell>
                <TableCell>
                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* File Uploader */}
        <div className="mt-4">
          <FileUploader />
        </div>
      </CardContent>
    </Card>
  );
};
export default FileTable;
