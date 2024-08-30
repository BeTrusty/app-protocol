import { type ContextType } from '@/types/context'
import { createContext, useState } from 'react'

export const Context = createContext<ContextType | null>(null)

export const Provider = ({ children }: { children: JSX.Element }) => {
  const [qrCode, setQrCode] = useState<string>('')

  return (
    <Context.Provider
      value={{
        qrCode,
        setQrCode
      }}
    >
      {children}
    </Context.Provider>
  )
}
