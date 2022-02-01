import React from 'react';
import Stats from '../components/Stats';
import UserInfo from '../components/UserInfo';

const StatsPage = ({ userInfo, stats }) => {
	return (
		<>
			<div className='stats_page_container'>
				<UserInfo userInfo={userInfo} />
				<Stats stats={stats} />
			</div>
		</>
	);
};

export default StatsPage;
