import { type ZkSyncProof } from '@/types/zksync'
import { verifyZkSyncUser } from '@/utils/verifyZkSyncUser'
import admin from 'firebase-admin'

/**
 * Genera un Custom Token de Firebase a partir de la información de zkSync.
 * @param zkSyncProof - Prueba de zkSync proveniente del frontend
 * @returns El Custom Token de Firebase
 * @throws Error si no se puede verificar el usuario con zkSync o generar el token
 */
export async function getCustomTokenFromZkSyncProof (
  zkSyncProof: ZkSyncProof
): Promise<string> {
  const zkSyncUser = await verifyZkSyncUser(zkSyncProof)

  if (!zkSyncUser || !zkSyncUser.userId) {
    throw new Error('No se pudo verificar el usuario con zkSync')
  }

  const additionalClaims = {
    zkSyncId: zkSyncUser.userId
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
  }

  const customToken = await admin
    .auth()
    .createCustomToken(zkSyncUser.userId, additionalClaims)

  return customToken
}
