import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	selectIsUserLoading,
	selectIsUserSignedIn,
	selectUserError,
	signInUserWithPassword,
	signInWithGoogle,
} from '../../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const SignInForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isLoading = useAppSelector(selectIsUserLoading);
	const userError = useAppSelector(selectUserError);
	const isLoggedIn = useAppSelector(selectIsUserSignedIn);

	const handleFieldChange = useCallback(
		(updateFn) => (e: ChangeEvent<HTMLInputElement>) => {
			updateFn(e.currentTarget.value);
		},
		[]
	);

	const handleEmailPasswordSignIn = () =>
		dispatch(signInUserWithPassword({ email, password }));
	const handleGoogleSignIn = () => dispatch(signInWithGoogle());

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/', { replace: true });
		}
	}, [isLoggedIn]);

	return (
		<div className="App">
			{userError && userError}

			<h1>Sign In With a Social Provider</h1>
			<button onClick={handleGoogleSignIn} disabled={isLoading}>
				Google
			</button>

			<h1>Sign In With an email address and password</h1>
			<label htmlFor="email">Email Address</label>
			<input
				id="email"
				name="email"
				type="text"
				disabled={isLoading}
				onChange={handleFieldChange(setEmail)}
			/>

			<br />

			<label htmlFor="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				disabled={isLoading}
				onChange={handleFieldChange(setPassword)}
			/>

			<br />

			<button disabled={isLoading} onClick={handleEmailPasswordSignIn}>
				Sign In
			</button>
		</div>
	);
};

export default SignInForm;
