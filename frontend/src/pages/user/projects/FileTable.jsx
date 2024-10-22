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
import { Folder } from "lucide-react";

const FileTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold uppercase">Project Files</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>No files uploaded yet.</TableCaption>
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
            {/* TODO: Add file table rows */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default FileTable;
