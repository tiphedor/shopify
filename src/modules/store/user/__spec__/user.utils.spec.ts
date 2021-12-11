import { User } from 'firebase/auth';
import { stripExcessiveInfo } from '../user.utils';

describe('user.utils', () => {
	it('should return null given null input', () => {
		expect(stripExcessiveInfo(null)).toBe(null);
	});

	it('should return only the expected info - removing the rest.', () => {
		const userInfo = {
			email: 'fakeEmail@tld.com',
		} as User;

		const result = stripExcessiveInfo(userInfo);
		expect(result).toEqual({
			email: 'fakeEmail@tld.com',
		});
	});

	it('should add defaults to nullable fields.', () => {
		const userInfo = {
			email: null,
		} as User;

		const result = stripExcessiveInfo(userInfo);
		expect(result).toEqual({
			email: '',
		});
	});
});
