import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import firebase from '../../Firebase';
import { RootState } from '../../app/store';
import { UserState, SignInStatus, EmailPasswordPayload } from './user.type';

const initialState: UserState = {
	signedIn: SignInStatus.SIGNED_OUT,
	error: undefined,
};

export const signOutUser = createAsyncThunk('user/signOut', async () => {
	await firebase.auth.signOut();
});

export const signInUserWithPassword = createAsyncThunk(
	'user/signInWithPassword',
	async ({ email, password }: EmailPasswordPayload) => {
		// todo return user info
		await signInWithEmailAndPassword(firebase.auth, email, password);
		return {};
	}
);

export const signUpUserWithPassword = createAsyncThunk(
	'user/signUpWithPassword',
	async ({ email, password }: EmailPasswordPayload) => {
		// todo return user info
		await createUserWithEmailAndPassword(firebase.auth, email, password);
		return {};
	}
);

export const signInWithGoogle = createAsyncThunk(
	'user/signInWithGoogle',
	async () => {
		const googleProvider = new GoogleAuthProvider();
		// todo return user info
		// const authResult =
		// const user = authResult?.user;
		await signInWithPopup(firebase.auth, googleProvider);

		return {};
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		const handleLoadingOnPending = (state: UserState) => {
			state.signedIn = SignInStatus.LOADING;
		};

		const handleAuthError = (state: UserState, action: any) => {
			state.signedIn = SignInStatus.ERROR;
			state.error = action.error.code;
		};

		const handleAuthSuccess = (state: UserState) => {
			state.signedIn = SignInStatus.SIGNED_IN;
			// todo: add user info
		};

		builder
			.addCase(signOutUser.pending, handleLoadingOnPending)
			.addCase(signOutUser.fulfilled, (state, q) => {
				state.signedIn = SignInStatus.SIGNED_OUT;
			});

		builder
			.addCase(signInUserWithPassword.pending, handleLoadingOnPending)
			.addCase(signInUserWithPassword.fulfilled, handleAuthSuccess)
			.addCase(signInUserWithPassword.rejected, handleAuthError);

		builder
			.addCase(signUpUserWithPassword.pending, handleLoadingOnPending)
			.addCase(signUpUserWithPassword.fulfilled, handleAuthSuccess)
			.addCase(signUpUserWithPassword.rejected, handleAuthError);

		builder
			.addCase(signInWithGoogle.pending, handleLoadingOnPending)
			.addCase(signInWithGoogle.fulfilled, handleAuthSuccess)
			.addCase(signInWithGoogle.rejected, handleAuthError);
	},
});

// export const { xx } = userSlice.actions;
export const selectIsUserSignedIn = (state: RootState): SignInStatus =>
	state.user.signedIn;
export const selectIsUserLoading = (state: RootState): boolean =>
	state.user.signedIn === SignInStatus.LOADING;
export const selectUserError = (state: RootState): string | undefined =>
	state.user.error;

export default userSlice.reducer;
