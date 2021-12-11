import React from 'react';
import { Link } from 'react-router-dom';
import {
	selectIsUserSignedIn,
	selectUserData,
	signOutUser,
} from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const AccountNavbar: React.FC = () => {
	const dispatch = useAppDispatch();
	const handleSignOut = () => dispatch(signOutUser());

	const isSignedIn = useAppSelector(selectIsUserSignedIn);
	const userData = useAppSelector(selectUserData);

	return (
		<div>
			isSignedIn: {isSignedIn}
			{userData && (
				<>
					Welcome {userData.email}
					<button onClick={handleSignOut}>sign out</button>
				</>
			)}
			{!userData && <Link to={'/account/sign-in'}>Sign in.</Link>}
		</div>
	);
};

export default AccountNavbar;
