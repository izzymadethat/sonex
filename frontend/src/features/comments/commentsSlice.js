import axiosInstance from "@/store/csrf";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
REDUX MAP (in progress...)
  allComments: [
    {
      id: string,
      projectId: string,
      user: string (will be email until client auth is implemented)
      text: string,
      timestamp: string | null,
      type: enum ("revision" | "feedback"),
      isCompleted: boolean,
      createdAt: date,
      updatedAt: date,
      completedAt: date | null,
    }
  ],

  commentsByProject: {
    [projectId: string]: [
      {
        id: string,
        projectId: string,
        user: string (will be email until client auth is implemented)
        text: string,
        timestamp: string | null,
        type: enum ("revision" | "feedback"),
        isCompleted: boolean,
        createdAt: date,
        updatedAt: date,
        completedAt: date | null,
      }
    ]
  },

  currentComment: {
    id: string,
    projectId: string,
    user: string (will be email until client auth is implemented)
    text: string,
    timestamp: string | null,
    type: enum ("revision" | "feedback"),
    isCompleted: boolean,
    createdAt: date,
    updatedAt: date,
    completedAt: date | null,
  } | null;
  
  status: enum ("idle" | "loading" | "succeeded" | "failed"),
  error: string | null,
*/

// Get ALL comments that have been assigned to a user
export const fetchComments = createAsyncThunk(
  "comments/fetchProjectComments",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/comments");
      return response.data.Comments;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

export const fetchCommentsByProject = createAsyncThunk(
  "comments/fetchCommentsByProject",
  async (projectId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/projects/${projectId}/comments`
      );
      return response.data.Comments;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ projectId, comment }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `projects/${projectId}/comments`,
        comment
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (updatedCommentInfo, thunkAPI) => {
    const commentId = updatedCommentInfo.id;
    try {
      const response = await axiosInstance.put(
        `/comments/${commentId}`,
        updatedCommentInfo
      );
      return response.data.comment;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/comments/${commentId}`);
      return { commentId, projectId: response.data.comment.projectId };
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred");
    }
  }
);

const initialState = {
  allComments: [],
  commentsByProject: null,
  currentComment: null,
  status: "idle",
  error: null
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    unloadComments: (state) => {
      state.allComments = [];
      state.commentsByProject = null;
      state.currentComment = null;
      state.status = "idle";
      state.error = null;
    },
    setCurrentComment: (state, action) => {
      state.currentComment = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allComments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCommentsByProject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCommentsByProject.fulfilled, (state, action) => {
        state.status = "succeeded";

        // normalize comments by project id
        state.commentsByProject = {};
        action.payload.forEach((comment) => {
          if (!state.commentsByProject[comment.projectId]) {
            state.commentsByProject[comment.projectId] = [];
          }

          state.commentsByProject[comment.projectId].push(comment);
        });
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const comment = action.payload;
        state.status = "succeeded";
        state.allComments.push(comment);
        state.commentsByProject[comment.projectId] = comment;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        state.status = "succeeded";
        state.allComments.map((comment) => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          }
          return comment;
        });
        state.commentsByProject[updatedComment.projectId] = updatedComment;
        state.currentComment = updatedComment;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allComments = state.allComments.filter(
          (comment) => comment.id !== action.payload.commentId
        );
        // delete the comment from the commentsByProject object
        delete state.commentsByProject[action.payload.projectId];
        state.currentComment = null;
      });
  }
});

export const { unloadComments, setCurrentComment } = commentsSlice.actions;
export const selectAllComments = (state) => state.comments.allComments;
export const selectCommentsByProject = (state) =>
  state.comments.commentsByProject;
export default commentsSlice.reducer;
