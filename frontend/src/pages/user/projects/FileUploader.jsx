import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { uploadFiles } from "@/features/files/filesSlice";
import { convertFileSizeInBytestoMB } from "@/helper/equations";
import { toast } from "@/hooks/use-toast";
import { Inbox, Loader2, Trash2Icon, UploadCloud, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const FileUploader = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.files);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [rejects, setRejects] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Callback method to use for dz config when accepted files are dropped into drop area
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  //   Dropzone config
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    accept: { "audio/*": [] },
    onDrop
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast({
        title: "Error!",
        description: "File type(s) not accepted",
        variant: "destructive"
      });
    }
  }, [fileRejections]);

  // remove specific file before uploading
  const handleRemoveFile = (fileIndex) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== fileIndex));
  };

  // User able to remove ALL files before uploading
  const handleRemoveAllFiles = () => setFiles([]);

  const handleSubmitFilesToProject = async (e) => {
    e.preventDefault();

    const fileData = new FormData();
    const fileSizes = {};
    files.forEach((file) => {
      fileData.append("tracks", file);
      fileSizes[file.name] = file.size;
    });
    fileData.append("fileSizes", JSON.stringify(fileSizes));

    const data = {
      fileData,
      projectId
    };

    await dispatch(uploadFiles(data));
    setFiles([]);
  };

  return (
    <div>
      {/* If there are any files in queue, create the file card section to manage before uploading, (i.e. Delete file, delete all files)  */}
      {files.length > 0 && (
        <div className="max-w-5xl p-10 mx-auto my-4 border border-dashed rounded-lg">
          <div className="flex items-center justify-between mb-4 ">
            <h4 className="text-primary">Files to be uploaded...</h4>{" "}
            <Button onClick={handleSubmitFilesToProject}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                </>
              ) : (
                "Upload Files"
              )}
            </Button>
          </div>
          <Separator />
          <ul className="grid grid-cols-2 gap-4 my-4 lg:justify-center lg:grid-cols-4">
            {/* Show files waiting to be uploaded */}
            {files.map((file, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-center gap-1.5 p-3 w-full border xl:flex-row rounded-xl text-center xl:justify-between"
              >
                <div>
                  <p className="ml-4 text-xs font-bold ">
                    {file.name.slice(0, 12)}
                    {file.name.length > 12 && <span>...</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {convertFileSizeInBytestoMB(file.size).toFixed(2)}MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-fit"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Trash2Icon size={12} />
                </Button>
              </li>
            ))}
          </ul>
          {/* Show delete all button if more than one file in queue */}
          {files.length > 1 && (
            <div className="flex flex-col items-center justify-center gap-2 mt-4 lg:flex-row lg:justify-between lg:items-start">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 w-fit"
                  >
                    <Trash2Icon className="size-4" />
                    Remove all
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[60vw] lg:max-w-[30vw] mx-auto rounded-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Remove all files to be uploaded?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      These files have NOT been uploaded to your project. This
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Take me back</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemoveAllFiles()}>
                      Yes, delete all files
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
          )}
        </div>
      )}

      {/* Upload zone area */}
      <form>
        <div
          {...getRootProps()}
          className="min-h-[100px] border lg:border-none rounded-md p-4 max-w-5xl mx-auto flex flex-col gap-4 justify-center items-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex flex-col items-center justify-center w-full py-6 space-y-1 border border-dashed rounded-md cursor-pointer bg-primary/20">
              <Inbox className="w-8 h-8" />
              <p className="max-w-xs font-bold">Add files in this zone...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center w-full py-6 space-y-1 border border-dashed rounded-md cursor-pointer hover:bg-muted-foreground/10">
                <UploadCloud className="w-8 h-8" />
                <p className="max-w-xs font-bold">
                  Drop or click to add new files here ...
                </p>
              </div>
              <div className="max-w-md text-center">
                <p className="text-sm text-muted-foreground">
                  Accepted Files: Any audio files
                </p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    Max 50mb <b>PER</b> File (Will be changed in next major
                    update){" "}
                  </li>
                  <li>
                    For audio files: Since some browsers can&apos;t properly
                    stream at 32-bit, it&apos;s recommended to upload 24-bit or
                    lower
                  </li>
                </ul>
              </div>
            </>
          )}

          {isDragReject && (
            <p className="text-xl italic font-bold text-red-500">
              Only audio files are accepted!!!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default FileUploader;
