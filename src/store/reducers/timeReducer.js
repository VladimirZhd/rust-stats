import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
	name: 'time',
	initialState: {
		data: null,
	},
	reducers: {
		updateTime: (state, action) => {
			const records = action.payload;

			if (!records) {
				return;
			}

			state.data = records;
			state.lastRetrieved = new Date().getTime();
		},
		clearTime: (state) => {
			state.data = null;
			state.lastRetrieved = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateTime, clearTime } = timeSlice.actions;

export default timeSlice.reducer;
