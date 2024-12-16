import { Github } from '@/types/github'
import { docs, set } from '@/firebase/docs'
import { v4 as uuidv4 } from 'uuid'

/**
 * @function uploadGitHub
 * @param {Object} github
 * @description Crea un usuario en la base de datos de Firebase
 */
export const uploadGitHub = async (github: Github): Promise<void> => {
  try {
    await set<Github>({
      refDoc: docs(uuidv4()).github,
      uploadData: github
    })
  } catch (error) {
    console.error('Error al guardar los datos de github', error)
  }
}
