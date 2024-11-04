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
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, selectProjectFiles } from "@/features/files/filesSlice";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { convertFileSizeInBytestoMB } from "@/helper/equations";

const UploadDropDownMenu = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Trigger file input dialog for files
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Trigger file input dialog for folders
  const handleFolderSelect = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click();
    }
  };
  return (
    <>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        style={{ display: "none" }}
        multiple
      />
      <input
        type="file"
        ref={folderInputRef}
        onChange={onFileSelect}
        style={{ display: "none" }}
        webkitdirectory="" // Enables folder selection
        directory="" // Needed for folder selection
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Add new</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Add new...</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleFileSelect}
          >
            <File /> File
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleFolderSelect}
          >
            <Folder /> Folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const FileTable = ({ projectId }) => {
  const dispatch = useDispatch();
  const allFiles = useSelector(selectProjectFiles);
  const files = allFiles
    .slice()
    .filter((file) => String(file.projectId) === String(projectId))
    .map((f) => {
      const date = parseISO(f.createdAt);
      const timePeriod = formatDistanceToNow(date);
      const timeAgo = `${timePeriod} ago`;

      // Return a new object with the updated dateAdded field
      return { ...f, dateAdded: timeAgo };
    });

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log("Selected files:", selectedFiles);
    // Process the selected files (e.g., add to state, upload to server, etc.)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase">Project Files</h3>
            {/* TODO: <UploadDropDownMenu onFileSelect={handleFileSelect} /> */}
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
                  <Label>File Size (in Mb)</Label>
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
              <TableRow key={file._id}>
                <TableCell>
                  <Link to={`/project/${projectId}/track/${file.name}`}>
                    {file.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {file.type === "wave" ? "wav" : file.type}
                </TableCell>
                <TableCell>
                  {convertFileSizeInBytestoMB(file.size).toFixed(2)} Mb
                </TableCell>
                <TableCell>{file.dateAdded}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      dispatch(deleteFile({ projectId, fileName: file.name }))
                    }
                  >
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

// const LegacyDropDownMenu = () => {
//   return (
//     <Select>
//       <SelectTrigger className="max-w-[120px]">
//         <SelectValue placeholder="New..." />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="newFile" className="flex gap-2 cursor-pointer">
//           File
//         </SelectItem>
//         <SelectItem value="newFolder" className="flex gap-2 cursor-pointer">
//           Folder
//         </SelectItem>
//       </SelectContent>
//     </Select>
//   );
// };
