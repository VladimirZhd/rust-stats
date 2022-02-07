import { createSlice } from '@reduxjs/toolkit';

export const accSlice = createSlice({
	name: 'account',
	initialState: {
		data: null,
	},
	reducers: {
		updateAccount: (state, action) => {
			const records = action.payload;
			if (!records) {
				return;
			}

			state.data = records;
			state.lastRetrieved = new Date().getTime();
		},
		clearAccount: (state) => {
			state.data = null;
			state.lastRetrieved = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateAccount, clearAccount } = accSlice.actions;

export default accSlice.reducer;
