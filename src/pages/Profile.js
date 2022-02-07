import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((state) => state.acc.data);
	console.log(user);
	return (
		<>
			<h2>Welcome {user.name}</h2>
		</>
	);
};

export default Profile;
