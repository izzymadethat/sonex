import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { extractStateError, handlePending, handleRejected } from "@/lib/stateFunctions";

// Login user with given credentials
export const loginUser = createAsyncThunk("user/loginUser", async (userCred, thunkAPI) => {
	try {
		const response = await axiosInstance.post("/auth/session", userCred);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
	}
});

// Fetch current user's data
export const restoreUser = createAsyncThunk("user/restoreUser", async (_, thunkAPI) => {
	try {
		const res = await axiosInstance.get("/auth/session");
		return res.data.user;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
	}
});

export const createUser = createAsyncThunk("user/createUser", async (user, thunkAPI) => {
	try {
		const res = await axiosInstance.post("/users", user);
		if (!res.data.user) throw new Error("User not created");
		return res.data.user;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
	}
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ user, id }, thunkAPI) => {
	try {
		const res = await axiosInstance.put(`/users/${id}`, user);
		await thunkAPI.dispatch(restoreUser());
		return res.data.user;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
	}
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
	try {
		const res = await axiosInstance.delete("/auth/session");
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
	}
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, thunkAPI) => {
	try {
		const res = await axiosInstance.delete(`/users/${userId}`);
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(extractStateError(error));
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
    connectAccountId: string,
    subscriptionStatus: enum ("active", "inactive"),
    subscriptionStartDate: date,
    subscriptionEndDate: date,
  } | null
  error: null | string
*/
const initialState = {
	currentUser: null,
	error: null,
	status: "idle",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.currentUser = action.payload.user;
				state.error = null;
			})
			.addCase(restoreUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.currentUser = action.payload;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.currentUser = { ...state.currentUser, ...action.payload };
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.currentUser = null;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.currentUser = null;
				state.error = null;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.error = null;
			})
			.addCase(loginUser.pending, handlePending)
			.addCase(restoreUser.pending, handlePending)
			.addCase(updateUser.pending, handlePending)
			.addCase(createUser.pending, handlePending)
			.addCase(loginUser.rejected, handleRejected)
			.addCase(restoreUser.rejected, handleRejected)
			.addCase(updateUser.rejected, handleRejected)
			.addCase(logoutUser.rejected, handleRejected)
			.addCase(deleteUser.rejected, handleRejected)
			.addCase(createUser.rejected, handleRejected);
	},
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
