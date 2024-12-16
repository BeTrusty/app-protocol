import { db } from '@/firebase/config'
import { TalentProtocol } from '@/types/talentProtocol'
import {
  collection,
  type DocumentData,
  getDocs,
  query,
  Query,
  where
} from 'firebase/firestore'

/**
 * @function getTalentProtocol
 * @param {string} userId
 * @description Trae los datos de talent protocol de un usuario
 */
export async function getTalentProtocol (
  userId: string
): Promise<TalentProtocol | null> {
  const talentProtocolRef = collection(
    db,
    'talentProtocol'
  ) as Query<DocumentData>
  const q = query(talentProtocolRef, where('userId', '==', userId))
  let talentProtocolData: TalentProtocol | null = null

  await getDocs(q).then(snapshot => {
    snapshot.forEach(doc => {
      talentProtocolData = doc.data() as TalentProtocol
    })
  })

  return talentProtocolData
}
