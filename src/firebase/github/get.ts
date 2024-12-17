import { db } from '@/firebase/config'
import { Github } from '@/types/github'
import {
  collection,
  type DocumentData,
  getDocs,
  query,
  Query,
  where
} from 'firebase/firestore'

/**
 * @function getGithub
 * @param {string} userId
 * @description Trae los datos de github de un usuario
 */
export async function getGithub (
  userId: string
): Promise<Github | null> {
  const GithubRef = collection(
    db,
    'Github'
  ) as Query<DocumentData>
  const q = query(GithubRef, where('userId', '==', userId))
  let GithubData: Github | null = null

  await getDocs(q).then(snapshot => {
    snapshot.forEach(doc => {
        GithubData = doc.data() as Github
    })
  })

  return GithubData
}