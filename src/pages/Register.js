import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		steamId: '',
		error: '',
		loading: false,
	});

	const { email, password, steamId, error, loading } = data;
	const navigate = useNavigate();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!email || !password || !steamId) {
				setData({ ...data, error: 'All fields are required.' });
			}
			setData({ ...data, loading: true });
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const sumRes = await fetch(
				`http://localhost:8000/users/getSummaries?steam_id=${steamId}`
			);
			const sumData = await sumRes.json();
			await setDoc(doc(db, 'users', result.user.uid), {
				uid: result.user.uid,
				email: email,
				steamId: steamId,
				name: sumData.personaname,
			});
			setData({
				email: '',
				password: '',
				steamId: '',
				error: '',
				loading: false,
			});
			navigate('/login');
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};

	return (
		<>
			<form className='register-form' onSubmit={handleSubmit}>
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
				<div className='steamId'>
					<label htmlFor='steamId'>Steam Id</label>
					<input
						type='text'
						name='steamId'
						value={steamId}
						onChange={handleChange}
					/>
				</div>
				{error && <p className='error'>{error}</p>}
				<button type='submit' className='btn'>
					{loading ? 'Registering' : 'Register'}
				</button>
			</form>
		</>
	);
};

export default Register;
