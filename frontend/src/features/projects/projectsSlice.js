import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Project 1",
    description: "This is the first project by the Demo User",
    userId: "6715ab202717cc5a1b693d34",
    status: "active",
    paymentStatus: "unpaid",
    projectAmount: 6000,
    amountPaid: 0,
    storageUsed: 2064,
    clients: [],
    createdAt: sub(new Date(), { days: 2, minutes: 48 }).toISOString(),
    updatedAt: sub(new Date(), { days: 2, minutes: 48 }).toISOString()
  },
  {
    id: 2,
    title: "Project 2",
    description:
      "This is the second project by the Demo User, that has been paid for",
    userId: "6715ab202717cc5a1b693d34",
    status: "active",
    paymentStatus: "paid",
    projectAmount: 8000,
    amountPaid: 8000,
    storageUsed: 8096,
    createdAt: sub(new Date(), { days: 20 }).toISOString(),
    updatedAt: sub(new Date(), { days: 5 }).toISOString()
  }
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {}
});

export const selectAllProjects = (state) => state.projects;

export default projectsSlice.reducer;
