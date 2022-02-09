import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAccount } from '../store/reducers/accReducer';

const Login = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
	});
	const { email, password, error, loading } = data;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!email || !password) {
				setData({ ...data, error: 'All fields are required.' });
			}
			await signInWithEmailAndPassword(auth, email, password);
			const user = await getDoc(doc(db, 'users', auth.currentUser.uid));
			dispatch(updateAccount(user.data()));
			navigate('/profile');
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};
	return (
		<>
			<form className='login-form' onSubmit={handleSubmit}>
				<h1>Login</h1>
				<div className='email'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className='password'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
				</div>
				{error && <p className='error'>{error}</p>}
				<button type='submit' className='btn'>
					{loading ? 'Logging in' : 'Login'}
				</button>
			</form>
		</>
	);
};

export default Login;
