import React, { useState } from 'react';
import Search from '../components/Search';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/userReducer';
import { updateStats } from '../store/reducers/statsReducer';
import { useNavigate } from 'react-router-dom';
import { updateTime } from '../store/reducers/timeReducer';

const Home = () => {
	const [data, setData] = useState({
		steamId: '',
		error: '',
		loading: false,
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { steamId, error, loading } = data;

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setData({ ...data, loading: true });
		let id = '';
		try {
			if (!steamId) {
				setData({ ...data, error: 'ID is required.', loading: false });
				return;
			}
			// Convert vanity id to numeric id
			if (steamId.length < 16) {
				const resId = await fetch(
					`http://localhost:8000/users/getSteamId?vanity_id=${steamId}`
				);
				const idData = await resId.json();
				if (idData.message) {
					setData({
						...data,
						error: idData.message,
						steamId: '',
						loading: false,
					});
					return;
				}
				id = idData.steamId;
				setData({ ...data, loading: false, steamId: '' });
			} else {
				id = steamId;
			}
			// Get player summaries
			const sumRes = await fetch(`http://localhost:8000/users/getSummaries?steam_id=${id}`);
			const sumData = await sumRes.json();
			dispatch(updateUser(sumData));
			setData({ ...data, loading: false, steamId: '', error: '' });

			// Get player stats
			const statsRes = await fetch(`http://localhost:8000/stats?steam_id=${id}`);
			const statsData = await statsRes.json();
			dispatch(updateStats(statsData));

			// Get all time played
			const numRes = await fetch(`http://localhost:8000/stats/time_played?steam_id=${id}`);
			const numData = await numRes.json();
			dispatch(updateTime(numData));
			navigate(`/user/${id}`);
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};

	return (
		<div className='home-wrapper'>
			<Search
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				steamId={steamId}
				error={error}
				loading={loading}
			/>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<p>Home</p>
		</div>
	);
};

export default Home;
