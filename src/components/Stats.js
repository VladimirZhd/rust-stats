import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Backstab from './svg/Backstab';
import Deaths from './svg/Deaths';
import KillDeath from './svg/KillDeath';
import Bear from './svg/Bear';
import Boar from './svg/Boar';
import Stag from './svg/Stag';
import Wolf from './svg/Wolf';
import Chicken from './svg/Chicken';
import Player from './svg/Player';
import Scientists from './svg/Scientists';
import Fall from './svg/Fall';
import Suicide from './svg/Suicide';
import Trap from './svg/Trap';
import Ore from './svg/Ore';
import Wood from './svg/Wood';
import Scrap from './svg/Scrap';
import Headshot from './svg/Headshot';
import Other from './svg/Other';
import Wounded from './svg/Wounded';
import Healed from './svg/Healed';
import Assists from './svg/Assists';

const Stats = () => {
	const stats = useSelector((state) => state.stats.data);

	const deathsByPlayer =
		stats.deaths -
		stats.death_wolf -
		stats.death_bear -
		stats.death_entity -
		stats.death_suicide -
		stats.death_fall;
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
							<div className='stat-title'>
								<Backstab />
								<h3>Kills {total_kills}</h3>
							</div>
							<p>
								<Bear /> Bear kills: {stats.kill_bear}
							</p>
							<p>
								<Boar /> Boar kills: {stats.kill_boar}
							</p>
							<p>
								<Stag /> Stag kills: {stats.kill_stag}
							</p>
							<p>
								<Wolf /> Wolf kills: {stats.kill_wolf}
							</p>
							<p>
								<Chicken /> Chicken kills: {stats.kill_chicken}
							</p>
							<p>
								<Player /> Player kills: {stats.kill_player}
							</p>
							<p>
								<Scientists /> Scientists kills:{' '}
								{stats.kill_scientist}
							</p>
						</div>
						<div className='deaths'>
							<div className='stat-title'>
								<Deaths />
								<h3>Deaths {stats.deaths}</h3>
							</div>
							<p>
								<Player /> Killed by players: {deathsByPlayer}
							</p>
							<p>
								<Wolf /> Killed by wolf: {stats.death_wolf}
							</p>
							<p>
								<Bear /> Killed by bear: {stats.death_bear}
							</p>
							<p>
								<Trap /> Killed by trap: {stats.death_entity}
							</p>
							<p>
								<Suicide /> Suicides: {stats.death_suicide}
							</p>
							<p>
								<Fall /> Killed by falling: {stats.death_fall}
							</p>
						</div>
						<div className='kds'>
							<div className='stat-title'>
								<KillDeath />
								<h3>
									K/D{' '}
									{Math.round(
										(stats.kill_player / deathsByPlayer) *
											100
									) / 100}
								</h3>
							</div>
							<p>
								<Bear /> K/D vs Bear:{' '}
								{Math.round(
									(stats.kill_bear / stats.death_bear) * 100
								) / 100}
							</p>
							<p>
								<Wolf /> K/D vs Wolf:{' '}
								{Math.round(
									(stats.kill_wolf / stats.death_wolf) * 100
								) / 100}
							</p>
						</div>
						<div className='harvesting'>
							<div className='stat-title'>
								<Ore />
								<h3>Resources harvested</h3>
							</div>
							<p>
								<Wood /> Wood:{' '}
								{stats.harvested_wood.toLocaleString(
									undefined,
									{ maximumFractionDigits: 2 }
								)}
							</p>
							<p>
								<Ore
									style={{ width: '25px', height: '25px' }}
								/>{' '}
								Metal ore:{' '}
								{stats['acquired_metal.ore'].toLocaleString(
									undefined,
									{ maximumFractionDigits: 2 }
								)}
							</p>
							<p>
								<Scrap /> Scrap:{' '}
								{stats.acquired_scrap.toLocaleString(
									undefined,
									{ maximumFractionDigits: 2 }
								)}
							</p>
						</div>
						<div className='other'>
							<div className='stat-title'>
								<Other />
								<h3>Other stats</h3>
								<p>
									<Headshot /> Headshots:{' '}
									{Math.round(
										(stats.headshot / stats.bullet_fired) *
											100
									)}
									%
								</p>
								<p>
									<Wounded /> Wounded: {stats.wounded}
								</p>
								<p>
									<Assists /> Assists:{' '}
									{stats.wounded_assisted}
								</p>
								<p>
									<Healed /> Revived: {stats.wounded_healed}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Stats;
