import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from 'firebase/app'
import firebase  from './Firebase';


console.log(firebase.auth)

function App() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const [ error, setError ] = useState<FirebaseError>();

    const handleFieldChange = useCallback(updateFn => (e: ChangeEvent<HTMLInputElement>) => {
        updateFn(e.currentTarget.value);
    }, []);

    const handleEmailPasswordSignIn = useCallback(async () => {

    }, []);
    const handleEmailPasswordSignUp = useCallback(async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const credentials = await createUserWithEmailAndPassword(firebase.auth, email, password)
            console.log(credentials);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

  return (
    <div className="App">
        <h1>Sign In</h1>

        {
            error && <div className='error'>
                {error.code}
            </div>
        }

        <code>
            username: {email} <br />
            password: {password} <br />
        </code>

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
    </div>
  );
}

export default App;
