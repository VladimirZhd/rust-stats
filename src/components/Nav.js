import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Nav = () => {
	const [user, setUser] = useState(null);
	const getUser = async () => {
		try {
			const user = await auth.currentUser;
			setUser(user);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	});

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav>
			<h2 className='home-wrapper'>
				<Link to='/'>Home</Link>
			</h2>
			<div className='login-wrapper'>
				{auth.currentUser ? (
					<>
						<Link to='profile'>Profile</Link>
						<button className='btn' onClick={handleSignOut}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to='/register'>Register</Link>
						<Link to='/login'>Login</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
