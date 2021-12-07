import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import appConfig from './config';

const app = initializeApp(appConfig.firebase);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

if (process.env.REACT_APP_USE_FIREBASE_EMULATORS) {
	connectAuthEmulator(
		auth,
		'http://localhost:9099'
	);

	connectFirestoreEmulator(
		firestore,
		'localhost',
		8080
	);
}

export default {
	app,
	analytics,
	firestore,
	auth
};
