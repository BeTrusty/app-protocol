import { db } from '@/firebase/config'
import { AutoPen } from '@/types/autoPen'
import {
  collection,
  type DocumentData,
  getDocs,
  query,
  Query,
  where
} from 'firebase/firestore'

/**
 * @function getAutoPen
 * @param {string} userId
 * @description Trae los datos de autopen de un usuario
 */
export async function getTalentProtocol (
  userId: string
): Promise<AutoPen | null> {
  const autoPenRef = collection(
    db,
    'autoPen'
  ) as Query<DocumentData>
  const q = query(autoPenRef, where('userId', '==', userId))
  let autoPenData: AutoPen | null = null

  await getDocs(q).then(snapshot => {
    snapshot.forEach(doc => {
        autoPenData = doc.data() as AutoPen
    })
  })

  return autoPenData
}