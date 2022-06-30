import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{ id: "0", name: "Musleh Khan" },
	{ id: "1", name: "Mujahid Khan" },
	{ id: "2", name: "Musahid Khan" },
];

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
