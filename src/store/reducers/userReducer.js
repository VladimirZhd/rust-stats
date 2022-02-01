import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null,
	},
	reducers: {
		updateUser: (state, action) => {
			const records = action.payload;
			if (!records) {
				return;
			}

			state.data = records;
			state.lastRetrieved = new Date().getTime();
		},
		clearUser: (state) => {
			state.data = null;
			state.lastRetrieved = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
