import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import appConfig from './config'

const app = initializeApp(appConfig.firebase);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export default {
    app,
    analytics,
    firestore,
    auth
};
