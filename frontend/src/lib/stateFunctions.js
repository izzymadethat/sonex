export const extractStateError = (error) => {
	return (
		error.response?.data?.errors?.server ||
		error.response?.data?.errors?.login ||
		error.response?.data?.errors ||
		error.message ||
		"An unknown error occurred."
	);
};

export const handleRejected = (state, action) => {
	state.status = "failed";
	state.error = action.payload;
};

export const handlePending = (state) => {
	state.status = "loading";
	state.error = null;
};
