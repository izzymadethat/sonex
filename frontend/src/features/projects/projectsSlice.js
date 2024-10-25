import { csrfFetch } from "@/store/csrf";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const BASE_URL = "/api/projects";

/* 
Redux Map (in progress...)
projects: [
  {
    id: string,
    title: string,
    description: string,
    userId: string | ObjectId,
    status: enum ("active" | "completed" | "archived"),
    paymentStatus: enum ("unpaid" | "paid" | "no-charge"),
    projectAmount: number,
    amountPaid: number,
    storageUsed: number,
    clients: array of strings | array of ObjectIds,
    createdAt: date,
    updatedAt: date,
  },
] 
currentProject: {
  id: string,
    title: string,
    description: string,
    userId: string | ObjectId,
    status: enum ("active" | "completed" | "archived"),
    paymentStatus: enum ("unpaid" | "paid" | "no-charge"),
    projectAmount: number,
    amountPaid: number,
    storageUsed: number,
    clients: array of strings | array of ObjectIds,
    createdAt: date,
    updatedAt: date,
}  
*/

export const getProjects = createAsyncThunk(
  "project/fetchCurrentUserProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(BASE_URL);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue for custom error messages
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // For network or other unhandled errors
    }
  }
);

export const getSingleProject = createAsyncThunk(
  "projects/getSingleProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(`${BASE_URL}/${projectId}`);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Use rejectWithValue for custom error messages
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allProjects: [],
  currentProject: null
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload.Projects;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      });
  }
});

export const selectAllProjects = (state) => state.projects.allProjects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export default projectsSlice.reducer;
