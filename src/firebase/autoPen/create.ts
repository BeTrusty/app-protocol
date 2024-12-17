import { type AutoPen } from '@/types/autoPen'
import { docs, set } from '@/firebase/docs'
import { v4 as uuidv4 } from 'uuid'

/**
 * @function createAutopen
 * @param {TalentProtocol} autopen
 * @description Crea un autopen en la base de datos de Firebase
 */
export const createAutopen = async (autopen: AutoPen): Promise<void> => {
  console.log('Creando autopen:', autopen)
  try {
    await set<AutoPen>({
      refDoc: docs(uuidv4()).autopen,
      uploadData: autopen
    })
  } catch (error) {
    console.error('Error al crear el autopen', error)
  }
}
