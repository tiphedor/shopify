import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {
    selectIsUserLoading,
    selectIsUserSignedIn,
    selectUserError,
    signInUserWithPassword, signInWithGoogle, signOutUser, signUpUserWithPassword
} from "./features/user/userSlice";

function App() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const isSignedIn = useAppSelector(selectIsUserSignedIn);
    const isLoading = useAppSelector(selectIsUserLoading);
    const userError = useAppSelector(selectUserError);
    const dispatch = useAppDispatch();

    const handleFieldChange = useCallback(updateFn => (e: ChangeEvent<HTMLInputElement>) => {
        updateFn(e.currentTarget.value);
    }, []);

    const handleGoogleSignIn = () => dispatch(signInWithGoogle());
    const handleEmailPasswordSignIn = () => dispatch(signInUserWithPassword({ email, password }));
    const handleEmailPasswordSignUp = () => dispatch(signUpUserWithPassword({ email, password }));
    const handleSignOut = () => dispatch(signOutUser());

  return (
    <div className="App">

        <code>
            isSignedIn: {JSON.stringify(isSignedIn)} <br />
            loading: {JSON.stringify(isLoading)} <br />
            error: {JSON.stringify(userError)} <br />

            Form data: <br />
            username: {email} <br />
            password: {password} <br />
        </code>


        <br/><br/><br/><br/>
        <button onClick={handleSignOut}>signout</button>

        <h1>Sign In</h1>

        <br />
        <br />

        <label htmlFor="email">
            Email Address
        </label>
        <input
            id="email"
            name="email"
            type="text"
            disabled={isLoading}
            onChange={handleFieldChange(setEmail)} />

        <br />

        <label htmlFor="password">
            Password
        </label>
        <input
            id="password"
            name="password"
            type="password"
            disabled={isLoading}
            onChange={handleFieldChange(setPassword)} />

        <br />

        <button
            disabled={isLoading}
            onClick={handleEmailPasswordSignIn}>
            Sign in
        </button>
        <button
            disabled={isLoading}
            onClick={handleEmailPasswordSignUp}>
            Sign Up
        </button>

        <h1>Sign in with a social provider</h1>

        <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}>
            Google
        </button>
    </div>
  );
}

export default App;
