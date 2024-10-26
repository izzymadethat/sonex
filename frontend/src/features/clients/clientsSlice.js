import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    name: "John",
    email: "johndoe@example.com",
    isVerified: true,
    createdAt: sub(new Date(), { days: 39 }).toISOString()
  },
  {
    id: 2,
    name: "Jane",
    email: "janesmith@example.com",
    isVerified: true,
    createdAt: sub(new Date(), { days: 18 }).toISOString()
  }
];

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}
});

export const selectAllClients = (state) => state.clients;
export default clientsSlice.reducer;
