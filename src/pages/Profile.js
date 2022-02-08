import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
	const user = useSelector((state) => state.acc.data);
	console.log(user);
	return (
		<>
			<h2>Welcome {user.name}</h2>
			<Link className='stats-link' to={`/user/${user.steamId}`}>
				See my stats
			</Link>
		</>
	);
};

export default Profile;
