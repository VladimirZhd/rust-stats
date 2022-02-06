import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './reducers/statsReducer';
import timeReducer from './reducers/timeReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
	reducer: {
		user: userReducer,
		stats: statsReducer,
		time: timeReducer,
	},
});
