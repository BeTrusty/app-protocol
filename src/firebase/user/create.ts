import { User } from '@/types/user'
import { docs, set } from '@/firebase/docs'

/**
 * @function createUser
 * @param {Object} user
 * @description Crea un usuario en la base de datos de Firebase
 */
export const createUser = async (user: User): Promise<void> => {
  try {
    await set<User>({
      refDoc: docs(user.id).users,
      uploadData: user
    })
  } catch (error) {
    console.error('Error al crear el usuario', error)
  }
}
