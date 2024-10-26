import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "@/store/csrf";

const BASE_URL = "/api/auth/session";

// Login user with given credentials
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          credential,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.errors?.login || "Failed to login");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "an error occurred");
    }
  }
);

// Fetch current user's data
// TODO: add and do more with fields in database so I can store more data
export const fetchUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  try {
    const res = await csrfFetch("/api/auth/session");
    const data = await res.json();
    return data.user;
  } catch (error) {
    return error.message || "an error occurred";
  }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const res = await csrfFetch("/api/auth/session", {
      method: "DELETE",
    });
    const data = await res.json();
  } catch (error) {
    return error.message || "an error occurred";
  }
});

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
  error: null,
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
        state.currentUser = { ...action.payload.user };
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
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
