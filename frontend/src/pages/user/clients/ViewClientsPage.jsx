import { Eye, Pencil } from "lucide-react";
import React, { useState } from "react";

const clients = [
  {
    title: "Client 1",
    created: "2022-01-01",
    status: "Active",
  },
  {
    title: "Client 2",
    created: "2022-01-02",
    status: "Inactive",
  },
  {
    title: "Client 3",
    created: "2022-01-03",
    status: "Active",
  },
];

const ViewClientsPage = () => {
  const [selected, setSelected] = useState([]);
  return <p>ViewClients</p>;
};

export default ViewClientsPage;

// (
//   <div className="flex flex-col gap-3">
//       <h1 className="text-3xl font-bold uppercase">View Clients</h1>
//       <p className="text-sm italic">View and Manage all of your clients</p>
//       <Table
//         color="primary"
//         selectionMode="multiple"
//         aria-label="Sonex user's clients table"
//       >
//         <TableHeader>
//           <TableColumn>Title</TableColumn>
//           <TableColumn>Created</TableColumn>
//           <TableColumn>Status</TableColumn>
//           <TableColumn>Actions</TableColumn>
//         </TableHeader>
//         <TableBody>
//           {clients.map((client, key) => (
//             <TableRow
//               key={key}
//               onClick={() =>
//                 setSelected((prevKeys) =>
//                   prevKeys.includes(key)
//                     ? prevKeys.filter((k) => k !== key)
//                     : [...prevKeys, key]
//                 )
//               }
//             >
//               <TableCell>{client.title}</TableCell>
//               <TableCell>{client.created}</TableCell>
//               <TableCell>{client.status}</TableCell>
//               <TableCell className="flex gap-3">
//                 <Tooltip content="Edit client" color="primary">
//                   <Button isIconOnly size="sm" className="p-2">
//                     <Pencil />
//                   </Button>
//                 </Tooltip>
//                 <Tooltip content="View client" color="primary">
//                   <Button isIconOnly size="sm" className="p-2">
//                     <Eye />
//                   </Button>
//                 </Tooltip>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Pagination loop showControls total={5} initialPage={1} />
//     </div>
// )
