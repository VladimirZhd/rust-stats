import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import StatsPage from './pages/StatsPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateAccount } from './store/reducers/accReducer';

function App() {
	const acc = useSelector((state) => state.acc.data);
	const dispatch = useDispatch();
	useEffect(() => {
		if (acc) return;
		setTimeout(() => {
			if (!auth.currentUser) return;
			getDoc(doc(db, 'users', auth.currentUser.uid)).then((res) => {
				dispatch(updateAccount(res.data()));
			});
		}, 1000);
	});
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path='profile' element={<Profile />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path={`/user/:id`} element={<StatsPage />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
