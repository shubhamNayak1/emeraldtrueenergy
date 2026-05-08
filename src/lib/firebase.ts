import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isConfigured = Boolean(config.apiKey && config.projectId);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function notConfiguredError(): never {
  throw new Error(
    "Firebase is not configured. Copy .env.example to .env.local and fill in NEXT_PUBLIC_FIREBASE_* values from the Firebase console.",
  );
}

function getOrInitApp(): FirebaseApp {
  if (_app) return _app;
  if (!isConfigured) notConfiguredError();
  _app = getApps().length ? getApp() : initializeApp(config);
  return _app;
}

// Lazily-initialized proxies so importing this module never throws.
// Real init happens on the first property access (e.g. `db.collection(...)`).
function lazy<T extends object>(factory: () => T): T {
  return new Proxy({} as T, {
    get(_, prop) {
      const target = factory();
      const value = Reflect.get(target, prop);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

export const firebaseApp = lazy<FirebaseApp>(() => getOrInitApp());
export const auth = lazy<Auth>(() => (_auth ??= getAuth(getOrInitApp())));
export const db = lazy<Firestore>(() => (_db ??= getFirestore(getOrInitApp())));
export const storage = lazy<FirebaseStorage>(() => (_storage ??= getStorage(getOrInitApp())));

export const firebaseConfigured = isConfigured;
