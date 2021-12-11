import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
	externallySetUser,
	selectIsUserSignedIn,
} from './features/user/userSlice';
import firebase from './Firebase';
import { stripExcessiveInfo } from './features/user/user.utils';
import AccountNavbar from './component/account/navbar';

const SignInForm = React.lazy(() => import('./component/account/signin.form'));
const SignUpForm = React.lazy(() => import('./component/account/signup.form'));
const HomePage = React.lazy(() => import('./component/homepage'));
const NotFound = React.lazy(() => import('./component/notfound'));

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const isSignedIn = useAppSelector(selectIsUserSignedIn);

	useEffect(() => {
		const unsubsribe = firebase.auth.onAuthStateChanged((user) => {
			dispatch(externallySetUser(stripExcessiveInfo(user)));
		});

		return unsubsribe;
	}, []);

	return (
		<BrowserRouter>
			<AccountNavbar />

			<hr />

			<Routes>
				<Route path="/" element={<HomePage />} />

				{!isSignedIn && (
					<>
						<Route
							path="/account/sign-in"
							element={<SignInForm />}
						/>
						<Route
							path="/account/sign-up"
							element={<SignUpForm />}
						/>
					</>
				)}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
