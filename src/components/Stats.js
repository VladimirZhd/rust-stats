import React from 'react';
import { useSelector } from 'react-redux';

const Stats = () => {
	const stats = useSelector((state) => state.stats.data);
	console.log(stats);

	const total_kills =
		stats.kill_bear +
		stats.kill_boar +
		stats.kill_chicken +
		stats.kill_player +
		stats.kill_scientist +
		stats.kill_stag +
		stats.kill_wolf;
	return (
		<>
			<h2 className='stats-title'>Game Statistics</h2>
			<div className='statistics'>
				<div className='kills'>
					<p className='total_kills'>Total kills: {total_kills}</p>
				</div>
			</div>
		</>
	);
};

export default Stats;
