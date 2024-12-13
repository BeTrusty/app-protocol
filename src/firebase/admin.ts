import * as admin from 'firebase-admin'

const ServiceAccount = {
  projectId: (process.env.NEXT_PUBLIC_PROJECT_ID as string) ?? '',
  privateKey:
    process.env.FIREBASE_PRIVATE_KEY !== null
      ? ((process.env.FIREBASE_PRIVATE_KEY as string) ?? '').replace(
          /\\n/gm,
          '\n'
        )
      : '',
  clientEmail: (process.env.CLIENT_EMAIL as string) ?? ''
}

export const Admin = admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: (process.env.NEXT_PUBLIC_DATABASE_URL as string) ?? ''
})
export const DB = admin.database()
