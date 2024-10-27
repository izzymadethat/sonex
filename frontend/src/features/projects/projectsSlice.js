import axiosInstance from "@/store/csrf";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import { sub } from "date-fns";
const BASE_URL = "/projects";

/* 
Redux Map (in progress...)
  allProjects: [
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
  },
  status: enum ("idle" | "loading" | "succeeded" | "failed")  
*/

export const getProjects = createAsyncThunk(
  "project/fetchCurrentUserProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BASE_URL);
      return response.data; // Directly return the data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Use response data for error messages
    }
  }
);

export const getSingleProject = createAsyncThunk(
  "projects/getSingleProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/${projectId}`);
      return response.data; // Return the project data directly
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(BASE_URL, project); // Pass project directly
      return response.data; // Return the created project data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/${project.id}`,
        project
      ); // Pass project directly
      return response.data; // Return the updated project data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${BASE_URL}/${projectId}`); // No need to capture response for delete
      return projectId; // Return the ID of the deleted project
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  allProjects: [],
  currentProject: null,
  status: "idle",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    unloadProjects: (state) => {
      state.allProjects = [];
      state.currentProject = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // when getting all spots succeeds
      .addCase(getProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload.Projects;
      })
      // when getting a single spot succeeds
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      // while spot is being added to the database
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      // when new spot has been added to the database
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProjects.push(action.payload);
      })
      // while spot is being updated in the database
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      // when spot has been updated in the database
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.allProjects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.allProjects[index] = action.payload;
          state.currentProject = action.payload;
        }
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProjects = state.allProjects.filter(
          (project) => project._id !== action.payload
        );
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      });
  },
});

export const { unloadProjects } = projectsSlice.actions;
export const selectAllProjects = (state) => state.projects.allProjects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export default projectsSlice.reducer;
