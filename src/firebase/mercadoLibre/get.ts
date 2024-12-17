import { db } from '@/firebase/config'
import { MercadoLibre } from '@/types/mercadolibre'
import {
  collection,
  type DocumentData,
  getDocs,
  query,
  Query,
  where
} from 'firebase/firestore'

/**
 * @function getMercadoLibre
 * @param {string} userId
 * @description Trae los datos de mercadolibre de un usuario
 */
export async function getMercadoLibre (
  userId: string
): Promise<MercadoLibre | null> {
  const MercadoLibreRef = collection(
    db,
    'MercadoLibre'
  ) as Query<DocumentData>
  const q = query(MercadoLibreRef, where('userId', '==', userId))
  let MercadoLibreData: MercadoLibre | null = null

  await getDocs(q).then(snapshot => {
    snapshot.forEach(doc => {
      MercadoLibreData = doc.data() as MercadoLibre
    })
  })

  return MercadoLibreData
}