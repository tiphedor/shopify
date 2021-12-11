export enum SignInStatus {
	SIGNED_OUT,
	SIGNED_IN,
	LOADING,
	ERROR,
}

export interface UserState {
	signedIn: SignInStatus;
	error: string | undefined;
	userData: UserData | null;
}

export interface EmailPasswordPayload {
	email: string;
	password: string;
}

export interface UserData {
	email: string;
}
