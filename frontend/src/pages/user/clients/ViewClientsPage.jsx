import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
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
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { selectAllClients } from "@/features/clients/clientsSlice";

export default function ViewProjectsPage() {
  const clients = useSelector(selectAllClients);
  console.log(clients);

  return (
    <section>
      <h3 className="mb-4 text-2xl font-bold">Clients</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Client Since</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.createdAt.toLocaleString()}</TableCell>
              <TableCell className="flex justify-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Eye />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View client</p>
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
                      <p>Delete client</p>
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
            <TableCell className="text-right">{clients.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
