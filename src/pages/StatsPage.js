import React from 'react';
import Stats from '../components/Stats';
import UserInfo from '../components/UserInfo';

const StatsPage = () => {
	return (
		<>
			<div className='stats_page_container'>
				<UserInfo />
				<Stats />
			</div>
		</>
	);
};

export default StatsPage;
