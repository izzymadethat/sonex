import axiosInstance from "@/store/csrf";
import { createSlice, createAsyncThunk, isPlain } from "@reduxjs/toolkit";

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
      console.error(error);
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
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleFile = createAsyncThunk(
  "files/getSingleFile",
  async ({ projectId, fileName }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/projects/${projectId}/uploads/${fileName}/stream`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.errors?.server ||
          error.response?.data.message ||
          "An unknown error occurred."
      );
    }
  }
);

// May not add this to global state
// export const downloadFile = createAsyncThunk(
//   "files/downloadFile",
//   async ({ projectId, fileName }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(
//         `/projects/${projectId}/uploads/${fileName}/download`
//       );
//       return response.data.downloadUrl;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data.errors?.server || "An unknown error occurred."
//       );
//     }
//   }
// );

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ projectId, fileName }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/projects/${projectId}/uploads/${fileName}`
      );
      thunkAPI.dispatch(fetchProjectFiles(projectId));
      thunkAPI.dispatch(fetchCommentsByProject(projectId));
      thunkAPI.dispatch(fetchProjectFiles(projectId));
      return response.data.fileId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data?.errors?.server || "An unknown error occurred."
      );
    }
  }
);

const initialState = {
  projectFiles: [],
  currentTrack: {
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    streamUrl: ""
  },
  isLoading: false,
  error: null
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    unloadFiles: (state) => {
      state.projectFiles = [];
      state.isLoading = initialState.isLoading;
      state.error = null;
    },
    setPlaying: (state) => {
      if (state.currentTrack) {
        state.currentTrack.isPlaying = true;
      }
    },
    setPaused: (state) => {
      if (state.currentTrack) {
        state.currentTrack.isPlaying = false;
      }
    },
    loadTrack: (state, action) => {
      state.currentTrack = {
        ...action.payload,
        currentTime: 0,
        isPlaying: false,
        duration: 0
      };
    },
    setCurrentTime: (state, action) => {
      state.currentTrack.currentTime = action.payload;
    },
    setTrackDuration: (state, action) => {
      state.currentTrack.duration = action.payload;
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
        state.projectFiles = [...state.projectFiles, ...action.payload];
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.projectFiles = state.projectFiles.filter(
          (file) => file._id !== action.payload
        );
      })
      .addCase(getSingleFile.fulfilled, (state, action) => {
        state.currentTrack = {
          ...action.payload,
          currentTime: 0,
          isPlaying: false,
          duration: 0
        };
      });
  }
});

export const {
  unloadFiles,
  setPlaying,
  setPaused,
  loadTrack,
  setCurrentTime,
  setTrackDuration
} = filesSlice.actions;
export const selectProjectFiles = (state) => state.files.projectFiles;
export const selectCurrentTrack = (state) => state.files.currentTrack;

export default filesSlice.reducer;
