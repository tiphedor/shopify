import { User as FirebaseUser } from 'firebase/auth';
import { UserData } from './user.type';

export const stripExcessiveInfo = (
	userInput: FirebaseUser | null
): UserData | null => {
	if (!userInput) {
		return null;
	}

	return {
		email: userInput.email || '',
	};
};
