import { init } from 'next-firebase-auth'
import absoluteUrl from 'next-absolute-url'
import { firebaseConfig } from './config'
import { initializeApp } from 'firebase/app'

export function initAuth (): void {
  initializeApp(firebaseConfig)
  // throw errors if required envrionment variables are not available
  if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === null) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not defined')
  }
  if (process.env.NEXT_PUBLIC_PROJECT_ID === null) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined')
  }
  if (process.env.NEXT_PUBLIC_AUTH_DOMAIN === null) {
    throw new Error('NEXT_PUBLIC_AUTH_DOMAIN is not defined')
  }
  if (process.env.NEXT_PUBLIC_DATABASE_URL === null) {
    throw new Error('NNEXT_PUBLIC_DATABASE_URL is not defined')
  }
  if (typeof window === 'undefined' && process.env.CLIENT_EMAIL === null) {
    throw new Error('CLIENT_EMAIL is not defined')
  }
  if (
    typeof window === 'undefined' &&
    process.env.FIREBASE_PRIVATE_KEY === null
  ) {
    throw new Error('FIREBASE_PRIVATE_KEY is not defined')
  }
  init({
    authPageURL: '/signup',
    appPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined'
      const origin = isServerSide
        ? absoluteUrl(ctx?.req).origin
        : window.location.origin
      const params = isServerSide
        ? new URL(ctx?.req.url as string, origin).searchParams
        : new URLSearchParams(window.location.search)
      const next =
        params.get('next') !== null &&
        params.get('next') !== undefined &&
        params.get('next') !== ''
          ? (params.get('next') as string)
          : undefined
      const destURL = '/'
      return next !== undefined && next !== null && next !== '' ? next : destURL
    },
    loginAPIEndpoint: '/api/auth/login',
    logoutAPIEndpoint: '/api/auth/logout',
    onLoginRequestError: err => {
      console.error(err)
    },
    onLogoutRequestError: err => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        clientEmail: process.env.CLIENT_EMAIL as string,
        // The private key must not be accessible on the client side.
        privateKey:
          process.env.FIREBASE_PRIVATE_KEY !== null
            ? (process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/gm, '\n')
            : ''
      },
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL as string
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      ...firebaseConfig
    },
    cookies: {
      name: 'BeTrusty', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'Lax',
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true', // set this to false in local (non-HTTPS) development
      signed: true
    },
    onVerifyTokenError: err => {
      console.error(err)
    },
    onTokenRefreshError: err => {
      console.error(err)
    }
  })
}
