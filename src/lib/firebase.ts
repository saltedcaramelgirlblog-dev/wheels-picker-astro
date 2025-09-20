import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

type FirebaseClients = {
  app: FirebaseApp;
  auth: Auth;
  googleProvider: GoogleAuthProvider;
};

let cached: FirebaseClients | null = null;

export function getFirebaseClients(): FirebaseClients {
  if (cached) return cached;

  const config = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
  } as const;

  // Basic validation to help during setup
  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    // These values are safe to embed in the client; error to make setup obvious
    // eslint-disable-next-line no-console
    console.warn('[Firebase] Missing PUBLIC_FIREBASE_* env vars. Check Netlify env settings.');
  }

  const app = getApps().length ? getApp() : initializeApp(config);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  cached = { app, auth, googleProvider };
  return cached;
}


