import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import firebase from '../../firebase';
import { RootState } from '../index';
import {
	UserState,
	SignInStatus,
	EmailPasswordPayload,
	UserData,
} from './user.type';

export const initialState: UserState = {
	signedIn: SignInStatus.SIGNED_OUT,
	error: undefined,
	userData: null,
};

export const signOutUser = createAsyncThunk('user/signOut', async () => {
	await firebase.auth.signOut();
});

export const signInUserWithPassword = createAsyncThunk(
	'user/signInWithPassword',
	async ({ email, password }: EmailPasswordPayload) => {
		await signInWithEmailAndPassword(firebase.auth, email, password);
	}
);

export const signUpUserWithPassword = createAsyncThunk(
	'user/signUpWithPassword',
	async ({ email, password }: EmailPasswordPayload) => {
		await createUserWithEmailAndPassword(firebase.auth, email, password);
	}
);

export const signInWithGoogle = createAsyncThunk(
	'user/signInWithGoogle',
	async () => {
		const googleProvider = new GoogleAuthProvider();
		await signInWithPopup(firebase.auth, googleProvider);
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		externallySetUser: (
			state: UserState,
			{ payload }: PayloadAction<UserData | null>
		) => {
			if (!payload) {
				return initialState;
			}

			state.signedIn = SignInStatus.SIGNED_IN;
			state.userData = payload;
			return state;
		},
	},
	extraReducers: (builder) => {
		const handleLoadingOnPending = (state: UserState) => {
			state.signedIn = SignInStatus.LOADING;
		};

		const handleAuthError = (state: UserState, action: any) => {
			state.signedIn = SignInStatus.ERROR;
			state.error = action.error.code;
		};

		builder
			.addCase(signOutUser.pending, handleLoadingOnPending)
			.addCase(signOutUser.fulfilled, (state, q) => initialState);

		builder
			.addCase(signInUserWithPassword.pending, handleLoadingOnPending)
			.addCase(signInUserWithPassword.rejected, handleAuthError);

		builder
			.addCase(signUpUserWithPassword.pending, handleLoadingOnPending)
			.addCase(signUpUserWithPassword.rejected, handleAuthError);

		builder
			.addCase(signInWithGoogle.pending, handleLoadingOnPending)
			.addCase(signInWithGoogle.rejected, handleAuthError);
	},
});

export const { externallySetUser } = userSlice.actions;
export const selectIsUserSignedIn = (state: RootState): SignInStatus =>
	state.user.signedIn;
export const selectIsUserLoading = (state: RootState): boolean =>
	state.user.signedIn === SignInStatus.LOADING;
export const selectUserError = (state: RootState): string | undefined =>
	state.user.error;
export const selectUserData = (state: RootState): UserData | null =>
	state.user.userData;

export default userSlice.reducer;
