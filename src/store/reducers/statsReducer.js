import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
	name: 'stats',
	initialState: {
		data: null,
	},
	reducers: {
		updateStats: (state, action) => {
			const records = action.payload;

			if (!records) {
				return;
			}

			state.data = records;
			state.lastRetrieved = new Date().getTime();
		},
		clearStats: (state) => {
			state.data = null;
			state.lastRetrieved = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateStats, clearStats } = statsSlice.actions;

export default statsSlice.reducer;
