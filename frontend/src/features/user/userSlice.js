import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "@/store/csrf";

const BASE_URL = "/api/auth/session";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          credential,
          password
        })
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

export const fetchUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  try {
    const res = await csrfFetch("/api/auth/session");
    const data = await res.json();
    return data.user;
  } catch (error) {
    return error.message || "an error occurred";
  }
});

// const initialState = {
//   id: "6715ab202717cc5a1b693d34",
//   firstName: "Demo",
//   lastName: "Lition",
//   username: "demo-user",
//   email: "demo@user.com",
//   role: "user",
//   storageUsed: 20248,
//   storageLimit: 512 * 1024,
//   subscriptionStatus: "active",
//   subscriptionEndDate: new Date("2024-12-31"),
//   status: "idle",
//   error: null
// };

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
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  }
});

export const selectUser = (state) => state.user.currentUser;
export default userSlice.reducer;
