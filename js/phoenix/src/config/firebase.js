import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_xmapMV36zOYh3bfnNU6W82wRc6aoOMM",
  authDomain: "mfchartsv2.firebaseapp.com",
  projectId: "mfchartsv2",
};
// apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

const app = initializeApp(firebaseConfig);

// getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });
