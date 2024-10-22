import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    text: "Take the reverb off the guitar",
    projectId: 1,
    timestamp: "02:48",
    type: "revision",
    isCompleted: false
  },
  {
    id: 2,
    text: "Add a bass boost to the 808",
    projectId: 2,
    timestamp: "01:12",
    type: "revision",
    isCompleted: false
  },
  {
    id: 3,
    text: "This is a great project!",
    projectId: 1,
    timestamp: null,
    type: "general feedback",
    isCompleted: true
  }
];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {}
});

export const selectAllComments = (state) => state.comments;
export default commentsSlice.reducer;
