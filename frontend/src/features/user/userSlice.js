import { createSlice } from "@reduxjs/toolkit";
// import { csrfFetch } from "./csrf";

const BASE_URL = "/api/auth/session";

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (user, thunkAPI) => {
//     try {
//       const res = await csrfFetch(`${BASE_URL}/register`, {
//         method: "POST",
//         body: JSON.stringify(user)
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         return thunkAPI.rejectWithValue(data.errors || "Login failed");
//       }

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

const initialState = {
  id: "6715ab202717cc5a1b693d34",
  firstName: "Demo",
  lastName: "Lition",
  username: "demo-user",
  email: "demo@user.com",
  role: "user",
  storageUsed: 20248,
  storageLimit: 512 * 1024,
  subscriptionStatus: "active",
  subscriptionEndDate: new Date("2024-12-31")
  //   userLoading: false,
  //   error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
