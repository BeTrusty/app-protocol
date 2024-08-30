import { CredentialSubject } from '@/types/credentials'
import { fetchUserById } from '@/utils/fetchUserById'
import { useState } from 'react'

export function useGetUser ({ id }: { id: string }): {
  user: CredentialSubject | undefined
} {
  const [user, setUser] = useState<CredentialSubject | undefined>(undefined)

  if (typeof id === 'string' && id !== '' && id !== undefined && id !== null) {
    const getUser = async () => {
      const { user } = await fetchUserById(id)
      setUser(user)
    }

    getUser()
  }

  return { user }
}
