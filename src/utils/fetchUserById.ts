import { type CredentialSubject } from '@/types/credentials'
import { API_GET_USER } from '@/constants/url'
import { User } from '@/types/api'

/**
 * @async
 * @function fetchUserById
 * @param {string} id
 * @description Función utilitaria para obtener un usuario por ID
 * @returns {Promise<{ user: CredentialSubject | undefined }>} Un objeto con la información del usuario
 */
export async function fetchUserById (
  id: string
): Promise<{ user: CredentialSubject | undefined }> {
  const response = await fetch(`${API_GET_USER}${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch user with id: ${id}`)
  }

  const user = await response.json()
  return { user: user?.message }
}
