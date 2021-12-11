import userReducer, { externallySetUser, initialState } from '../userSlice';
import { SignInStatus, UserData, UserState } from '../user.type';
import mock = jest.mock;

jest.mock('firebase/auth', () => ({}));
jest.mock('../../../firebase', () => ({}));

describe('user reducer', () => {
	it('should return initial state in the initial case', () => {
		expect(userReducer(undefined, { type: 'whatever' })).toEqual(
			initialState
		);
	});

	describe('externallySetUser', () => {
		it('should reset the auth state to zero given its called with no arguments', () => {
			const mockState = {
				signedIn: SignInStatus.SIGNED_IN,
				userData: {},
			} as UserState;

			const result = userReducer(mockState, externallySetUser(null));
			expect(result).toEqual(initialState);
		});

		it('should set the user info given its called with a valid user', () => {
			const mockState = {
				signedIn: SignInStatus.SIGNED_OUT,
				userData: null,
			} as UserState;
			const mockUser = {
				email: 'fake@email.com',
			} as UserData;

			const result = userReducer(mockState, externallySetUser(mockUser));
			expect(result).toEqual({
				signedIn: SignInStatus.SIGNED_IN,
				userData: mockUser,
			});
		});
	});
});
