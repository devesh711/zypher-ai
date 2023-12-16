import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-xAmUkwr_uCmZa6VrRaQQYkyFBpn4kg",
  authDomain: "zypher-ai-2e871.firebaseapp.com",
  projectId: "zypher-ai-2e871",
  storageBucket: "zypher-ai-2e871.appspot.com",
  messagingSenderId: "585544448106",
  appId: "1:585544448106:web:6525b5179af18f64177213"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;