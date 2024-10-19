import React, { useState } from "react";

import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Project 1",
    created: new Date().toLocaleDateString(),
    status: "Active"
  },
  {
    title: "Project 2",
    created: new Date("2024-03-12").toLocaleDateString(),
    status: "Active"
  },
  {
    title: "Project 3",
    created: new Date().toLocaleDateString(),
    status: "Inactive"
  },
  {
    title: "Project 4",
    created: new Date().toLocaleDateString(),
    status: "Inactive"
  }
];

export default function App() {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">Projects</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={index}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.created}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell className="flex justify-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Eye />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="text-white bg-red-600">
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="mt-4">
          <TableRow>
            <TableCell colSpan={3}>Total Projects</TableCell>
            <TableCell className="text-right">{projects.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

// (
//   <div className="flex flex-col gap-3">
//   <h1 className="text-3xl font-bold uppercase">Projects</h1>
//   <p className="text-sm italic">View and Manage all of your projects</p>
//   <Table
//     color="primary"
//     selectionMode="multiple"
//     aria-label="Sonex user's projects table"
//   >
//     <TableHeader>
//       <TableColumn>Title</TableColumn>
//       <TableColumn>Created</TableColumn>
//       <TableColumn>Status</TableColumn>
//       <TableColumn>Actions</TableColumn>
//     </TableHeader>
//     <TableBody>
//       {projects.map((project, key) => (
//         <TableRow
//           key={key}
//           onClick={() =>
//             setSelected((prevKeys) =>
//               prevKeys.includes(key)
//                 ? prevKeys.filter((k) => k !== key)
//                 : [...prevKeys, key]
//             )
//           }
//         >
//           <TableCell>{project.title}</TableCell>
//           <TableCell>{project.created}</TableCell>
//           <TableCell>{project.status}</TableCell>
//           <TableCell className="flex gap-3">
//             <Tooltip content="Edit project" color="primary">
//               <Button isIconOnly size="sm" className="p-2">
//                 <Pencil />
//               </Button>
//             </Tooltip>
//             <Tooltip content="View project" color="primary">
//               <Button isIconOnly size="sm" className="p-2">
//                 <Eye />
//               </Button>
//             </Tooltip>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
//   <Pagination loop showControls total={5} initialPage={1} />
// </div>
// )
