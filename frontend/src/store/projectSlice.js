import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      createdAt: date,
      updatedAt: date,
  },
  status: enum ("idle" | "loading" | "succeeded" | "failed")  
*/

export const getProjects = createAsyncThunk("project/fetchCurrentUserProjects", async (_, thunkAPI) => {
	try {
		const response = await axiosInstance.get(BASE_URL);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); // Use response data for error messages
	}
});

export const getSingleProject = createAsyncThunk("projects/getSingleProject", async (projectId, thunkAPI) => {
	try {
		const response = await axiosInstance.get(`/projects/${projectId}/public`);
		return response.data.project;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const createProject = createAsyncThunk("projects/createProject", async (project, thunkAPI) => {
	try {
		const response = await axiosInstance.post(BASE_URL, project); // Pass project directly
		return response.data; // Return the created project data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const updateProject = createAsyncThunk("projects/updateProject", async (project, thunkAPI) => {
	try {
		const response = await axiosInstance.put(`${BASE_URL}/${project.id}`, project); // Pass project directly
		return response.data; // Return the updated project data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

export const deleteProject = createAsyncThunk("projects/deleteProject", async (projectId, thunkAPI) => {
	try {
		await axiosInstance.delete(`${BASE_URL}/${projectId}`); // No need to capture response for delete
		return projectId; // Return the ID of the deleted project
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || error.message);
	}
});

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
		findProjectById: (state, action) => {
			const { projectId } = action.payload;
			const project = state.allProjects.find((p) => p._id === projectId);
			if (project) {
				return project;
			}
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
				const index = state.allProjects.findIndex((project) => project._id === action.payload._id);
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
				state.allProjects = state.allProjects.filter((project) => project._id !== action.payload);
				if (state.currentProject?._id === action.payload) {
					state.currentProject = null;
				}
			});
	},
});

export const { unloadProjects, findProjectById } = projectsSlice.actions;
export const selectAllProjects = (state) => state.projects.allProjects;
export const selectProjectById = (state, projectId) => state.projects.allProjects.find((p) => p._id === projectId);
export const selectCurrentProject = (state) => state.projects.currentProject;
export default projectsSlice.reducer;
