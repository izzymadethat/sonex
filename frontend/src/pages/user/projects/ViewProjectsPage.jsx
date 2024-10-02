import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from "@nextui-org/react";
import { m } from "framer-motion";
import {
  ChevronDownIcon,
  Eye,
  Pencil,
  PlusIcon,
  Search,
  Trash,
  Trash2
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { VerticalDotsIcon } from "../../../components/misc/VerticalDotsIcon";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  {
    name: "Title",
    uid: "title",
    sortable: true
  },
  {
    name: "Status",
    uid: "status",
    sortable: true
  },
  {
    name: "Payment Status",
    uid: "paymentStatus",
    sortable: true
  },
  {
    name: "Project Amount",
    uid: "projectAmount"
  },
  {
    name: "Amount Paid",
    uid: "amountPaid"
  }
];

const projects = [
  {
    id: 1,
    title: "Project 1",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 2,
    title: "Project 2",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 3,
    title: "Project 3",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 4,
    title: "Project 4",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 5,
    title: "Project 5",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 6,
    title: "Project 6",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 7,
    title: "Project 7",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 8,
    title: "Project 8",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 9,
    title: "Project 9",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 10,
    title: "Project 10",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 11,
    title: "Project 11",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 12,
    title: "Project 12",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  },
  {
    id: 13,
    title: "Project 13",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 1000,
    amountPaid: 500
  },
  {
    id: 14,
    title: "Project 14",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 1000,
    amountPaid: 0
  }
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Completed", uid: "completed" },
  { name: "Archived", uid: "archived" }
];

const statusColorMap = {
  active: "success",
  completed: "primary",
  archived: "error"
};

const INITIAL_VISIBLE_COLUMNS = ["title", "status", "paymentStatus"];

const ViewProjectsPage = () => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending"
  });
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const totalPages = Math.ceil(projects.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProjects = [...projects];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
        project.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProjects = filteredProjects.filter((project) => {
        Array.from(statusFilter).includes(project.status);
      });
    }

    return filteredProjects;
  }, [projects, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const renderCell = useCallback((project, columnKey) => {
    const cellValue = project[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <Dropdown>
            <DropdownTrigger>
              <h4>{cellValue}</h4>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Clients</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );

      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[project.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>
                  <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader>Are you sure?</ModalHeader>
                          <ModalBody>
                            <p>
                              Are you sure you want to delete this project? This
                              CAN&apos;T be undone!
                            </p>
                          </ModalBody>
                          <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                              Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                              Delete Project
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1"
            }}
            placeholder="Search by title..."
            size="sm"
            startContent={<Search className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {projects.length} projects
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    projects.length,
    hasSearchFilter
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background"
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={totalPages}
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, totalPages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none"
      ]
    }),
    []
  );

  return (
    <Table
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background"
        }
      }}
      // classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ViewProjectsPage;
