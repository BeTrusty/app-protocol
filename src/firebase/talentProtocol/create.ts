import { type TalentProtocol } from '@/types/talentProtocol'
import { docs, set } from '@/firebase/docs'
import { v4 as uuidv4 } from 'uuid'

/**
 * @function createTalentProtocol
 * @param {TalentProtocol} talentProtocol
 * @description Crea un talentProtocol en la base de datos de Firebase
 */
export const createTalentProtocol = async (
  talentProtocol: TalentProtocol
): Promise<void> => {
  try {
    await set<TalentProtocol>({
      refDoc: docs(uuidv4()).talentProtocol,
      uploadData: talentProtocol
    })
  } catch (error) {
    console.error('Error al crear el talentProtocol', error)
  }
}
