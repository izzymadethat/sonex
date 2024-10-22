import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    isVerified: true,
    createdAt: sub(new Date(), { days: 39 })
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    isVerified: true,
    createdAt: sub(new Date(), { days: 18 })
  }
];

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}
});

export const selectAllClients = (state) => state.clients;
export default clientsSlice.reducer;
