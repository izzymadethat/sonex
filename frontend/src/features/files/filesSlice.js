import axiosInstance from "@/store/csrf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 
REDUX MAP (in progress...)
const initialState = {
  files: [
    {
      id: string,
      name: string,
      projectId: string (VERY IMPORTANT!!),
      userId: string (VERY IMPORTANT!!),
      type: string,
      size: number,
      duration: number (in seconds),
      downloadUrl: string (May come from AWS S3) | null,
      playbackUrl: string (May come from AWS S3),
      createdAt: date,
      updatedAt: date (not needed, as you will only be able to upload, playback and delete files),
    }
  ],
  isLoading: false,
  error: null,
}
*/

export const fetchProjectFiles = createAsyncThunk(
  "files/fetchProjectFiles",
  async (projectId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/projects/${projectId}/uploads`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadFiles = createAsyncThunk(
  "files/uploadFiles",
  async ({ fileData, projectId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/projects/${projectId}/uploads`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response.data.Files;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleFile = createAsyncThunk(
  "files/getSingleFile",
  async ({ projectId, fileName }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/projects/${projectId}/uploads/${fileName}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ projectId, fileName }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/projects/${projectId}/uploads/${fileName}`
      );
      return response.data.fileId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projectFiles: [],
  currentTrack: null,
  isLoading: false,
  error: null
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    unloadFiles: (state) => {
      state.projectFiles = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectFiles = action.payload;
      })
      .addCase(fetchProjectFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectFiles = state.projectFiles.concat(action.payload);
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.projectFiles = state.projectFiles.filter(
          (project) => project._id !== action.payload
        );
      });
  }
});

export const selectProjectFiles = (state) => state.files.projectFiles;

export default filesSlice.reducer;
