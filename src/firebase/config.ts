import { initializeApp } from 'firebase/app'
import { type Analytics, getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export type returnAnalytics = Analytics | undefined

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,

  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL as string,

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID as string
}

export const app = initializeApp(firebaseConfig)
export const analytics = (): returnAnalytics => {
  if (typeof window !== 'undefined') {
    return getAnalytics(app)
  }
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
