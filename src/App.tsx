import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './modules/store/hooks';
import {
	externallySetUser,
	selectIsUserSignedIn,
} from './modules/store/user/userSlice';
import firebase from './modules/firebase';
import { stripExcessiveInfo } from './modules/store/user/user.utils';
import AccountNavbar from './modules/pages/account/navbar';

const SignInForm = React.lazy(
	() => import('./modules/pages/account/signin.form')
);
const SignUpForm = React.lazy(
	() => import('./modules/pages/account/signup.form')
);
const HomePage = React.lazy(() => import('./modules/pages/homepage'));
const NotFound = React.lazy(() => import('./modules/pages/notfound'));

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
