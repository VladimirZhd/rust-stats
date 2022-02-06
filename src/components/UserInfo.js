/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

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
	const time = useSelector((state) => state.time.data);
	const stats = useSelector((state) => state.stats.data);

	const hours = Math.floor(time.total_time / 60);
	const minutes = time.total_time % 60;
	return (
		<>
			<div className='info'>
				<img src={user.avatarfull} alt='avatar' />
				<div className='name-container'>
					<p className='name'>{user.personaname}</p>
					<p className={`user-status-${user.personastate}`}>
						{userStatus[user.personastate]}
					</p>
					{user.personastate === 0 && (
						<p>
							Was online:&nbsp;
							<Moment fromNow>{new Date(user.lastlogoff * 1000)}</Moment>
						</p>
					)}
					{user.realname && <p>Real name: {user.realname}</p>}
					{user.loccountrycode && <p>{user.loccountrycode}</p>}
					{user.timecreated && (
						<p>
							Joined Steam:&nbsp;
							<Moment fromNow>{new Date(user.timecreated * 1000)}</Moment>
						</p>
					)}
				</div>
				<div className='time_played'>
					<p>
						Played: {hours} hours, {minutes} minutes
					</p>
				</div>
				<div className='time'></div>
			</div>
			{stats.message && <p className='error'>{stats.message}</p>}
		</>
	);
};

export default UserInfo;
