import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

let min = 1;
const initialState = [
  {
    id: 1,
    name: "This is a wav file",
    type: "wav",
    dateAdded: sub(new Date(), { days: 7 }).toISOString(),
    projectId: 1
  },
  {
    id: 2,
    name: "This is a wav file",
    type: "wav",
    dateAdded: sub(new Date(), { days: 3, minutes: min + 30 }).toISOString(),
    projectId: 1
  },
  {
    id: 3,
    name: "This is a mp3 file",
    type: "mp3",
    dateAdded: sub(new Date(), { minutes: min + 30 }).toISOString(),
    projectId: 2
  },
  {
    id: 4,
    name: "This is a mp3 file",
    type: "mp3",
    dateAdded: sub(new Date(), { minutes: min + 30 }).toISOString(),
    projectId: 2
  }
];

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {}
});

export const selectProjectFiles = (state) => state.files;

export default filesSlice.reducer;
