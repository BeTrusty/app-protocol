import { type Github } from '@/types/github'
import { docs, set } from '@/firebase/docs'
import { v4 as uuidv4 } from 'uuid'

/**
 * @function createGithub
 * @param {Github} github
 * @description Crea un github en la base de datos de Firebase
 */
export const createTalentProtocol = async (
    github: Github
): Promise<void> => {
  try {
    await set<Github>({
      refDoc: docs(uuidv4()).github,
      uploadData: github
    })
  } catch (error) {
    console.error('Error al crear el github', error)
  }
}