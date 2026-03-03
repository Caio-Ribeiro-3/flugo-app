import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

export function firebaseSetup() {
    // @ts-ignore
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.DEV;
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID
    };
    const app = initializeApp(firebaseConfig);
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
    })

    return app
}