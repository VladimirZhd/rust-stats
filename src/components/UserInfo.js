/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateStats } from '../store/reducers/statsReducer';
import { updateTime } from '../store/reducers/timeReducer';
import { updateUser } from '../store/reducers/userReducer';
import Heart from './svg/Heart';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateAccount } from '../store/reducers/accReducer';

const UserInfo = () => {
	const userStatus = {
		0: 'Offline',
		1: 'Online',
		2: 'Busy',
		3: 'Away',
		4: 'Snooze',
		5: 'Looking to trade',
		6: 'Looking to play',
	};
	let user = useSelector((state) => state.user.data);
	let time = useSelector((state) => state.time.data);
	let stats = useSelector((state) => state.stats.data);
	const acc = useSelector((state) => state.acc.data);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user || user.steamid !== id) {
			getUser();
		}
	}, []);

	const getUser = async () => {
		try {
			const userRes = await fetch(
				`http://localhost:8000/users/getSummaries?steam_id=${id}`
			);
			const userData = await userRes.json();
			user = userData;
			dispatch(updateUser(userData));

			const timeRes = await fetch(
				`http://localhost:8000/stats/time_played?steam_id=${id}`
			);
			const timeData = await timeRes.json();
			dispatch(updateTime(timeData));
			time = timeData;

			const statsRes = await fetch(
				`http://localhost:8000/stats?steam_id=${id}`
			);
			const statsData = statsRes.json();
			dispatch(updateStats(statsData));
			stats = statsData;
		} catch (error) {
			console.log(error);
		}
	};
	const hours = Math.floor(time.total_time / 60);
	const minutes = time.total_time % 60;

	const addToFavorites = async (e) => {
		const favId = e.target.parentNode.id;
		let favorites = [];
		const self = await (
			await getDoc(doc(db, 'users', auth.currentUser.uid))
		).data();
		if (!self.favorites) {
			favorites = [favId];
		} else {
			favorites = self.favorites;
			favorites.push(favId);
		}

		await updateDoc(doc(db, 'users', auth.currentUser.uid), {
			favorites: favorites,
		});

		getDoc(doc(db, 'users', auth.currentUser.uid)).then((user) => {
			dispatch(updateAccount(user.data()));
		});
	};
	return (
		<>
			<div className='info'>
				<div className='name-container'>
					<img src={user.avatarfull} alt='avatar' />
					<p className='name'>
						{user.personaname}{' '}
						{auth.currentUser && acc.steamId !== id && (
							<label
								onClick={addToFavorites}
								id={id}
								htmlFor='heart'>
								<Heart id={id} />
							</label>
						)}
					</p>
					<p className={`user-status-${user.personastate}`}>
						{userStatus[user.personastate]}
					</p>
					{user.personastate === 0 && (
						<p>
							Was online:&nbsp;
							<Moment fromNow>
								{new Date(user.lastlogoff * 1000)}
							</Moment>
						</p>
					)}
					{user.realname && <p>Real name: {user.realname}</p>}
					{user.loccountrycode && (
						<p>Country: {user.loccountrycode}</p>
					)}
					{user.timecreated && (
						<p>
							Joined Steam:&nbsp;
							<Moment fromNow>
								{new Date(user.timecreated * 1000)}
							</Moment>
						</p>
					)}
					<div className='time_played'>
						<p>
							Played: {hours} hours, {minutes} minutes
						</p>
					</div>
				</div>
			</div>
			{stats.message && <p className='error'>{stats.message}</p>}
		</>
	);
};

export default UserInfo;
