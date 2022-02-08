import React from 'react';
import { useSelector } from 'react-redux';

const Stats = () => {
	const stats = useSelector((state) => state.stats.data);

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
			{!stats.message && (
				<div className='statistics'>
					<h2 className='stats-title'>Game Statistics</h2>
					<div className='stats'>
						<div className='kills'>
							<h3>Kills {total_kills}</h3>
							<p>Bear kills: {stats.kill_bear}</p>
							<p>Boar kills: {stats.kill_boar}</p>
							<p>Stag kills: {stats.kill_stag}</p>
							<p>Wolf kills: {stats.kill_wolf}</p>
							<p>Chicken kills: {stats.kill_chicken}</p>
							<p>Player kills: {stats.kill_player}</p>
							<p>Scientists kills: {stats.kill_scientist}</p>
						</div>
						<div className='deaths'>
							<h3>Deaths {stats.deaths}</h3>
							<p>Killed by wolf: {stats.death_wolf}</p>
							<p>Killed by bear: {stats.death_bear}</p>
							<p>Killed by trap: {stats.death_entity}</p>
							<p>Suicides: {stats.death_suicide}</p>
							<p>Killed by falling: {stats.death_fall}</p>
						</div>
						<div className='kds'>
							<h3>
								K/D{' '}
								{Math.round(
									(total_kills / stats.deaths) * 100
								) / 100}
							</h3>
							<p>
								K/D vs Bear:{' '}
								{Math.round(
									(stats.kill_bear / stats.death_bear) * 100
								) / 100}
							</p>
							<p>
								K/D vs Wolf:{' '}
								{Math.round(
									(stats.kill_wolf / stats.death_wolf) * 100
								) / 100}
							</p>
							<p>
								K/D vs Players:{' '}
								{Math.round(
									(stats.kill_player / stats.deaths) * 100
								) / 100}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Stats;
