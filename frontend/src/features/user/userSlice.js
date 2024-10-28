import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/store/csrf";

const BASE_URL = "/auth/session";

// Login user with given credentials
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/session", {
        credential,
        password
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred");
    }
  }
);

// Fetch current user's data
// TODO: add and do more with fields in database so I can store more data
export const fetchUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/session"); // Use .get() for clarity
      return res.data.user; // Directly return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data.errors?.message || "An error occurred"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/auth/session"); // Use .delete() for clarity
      return res.data; // Optionally return any response data if needed
    } catch (error) {
      return rejectWithValue(
        error.response?.data.errors?.message || "An error occurred"
      );
    }
  }
);

/* 
REDUX MAP (in progress)
  currentUser: {
    id: string | objectId,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: enum ("admin" | "user" | "client"),
    storageUsed: number (in gigabytes),
    storageLimit: number (in gigabytes) <- total storage limit,
    connectAccountId: string,
    subscriptionStatus: enum ("active", "inactive"),
    subscriptionStartDate: date,
    subscriptionEndDate: date,
  } | null

  status: "idle" | "loading" | "succeeded" | "failed"
  error: null | string
*/
const initialState = {
  currentUser: null,
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = { ...action.payload };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = "idle";
      });
  }
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
