import { type ContextType } from '@/types/context'
import { useContext } from 'react'
import { Context } from '@/context'

export function useMyContext (): ContextType {
  const context = useContext(Context)
  if (context === null) throw new Error('No exite un provedor de autenticación')
  return context
}
