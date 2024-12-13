import { CredentialData, CredentialSubject, ResponseVCData } from "@/types/credentials"
import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage"


export function useConnectInformation () {
    const [localId, setLocalId] = useLocalStorage<string>('localId')
    const [level, setLevel] = useLocalStorage<string>('level')
    const [didUrl, setDidUrl] = useLocalStorage<string>('didUrl')
    const [time, setTime] = useLocalStorage<number>('time')
    const [redes, setRedes] = useState<{talentProtocol:boolean, mercadoLibre:boolean, github:boolean}>(
      {talentProtocol:false, mercadoLibre:false, github:false}
    )
    const [talentProtocol, setTalentProtocol] = useState<{}>({})
    const [credential, setCredential] =
      useLocalStorage<CredentialData>('credential')
    const [data, setData] = useState<ResponseVCData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<{
      github: boolean
      mercadoLibre: boolean
      talentprotocol: boolean
    }>({
      github: true,
      mercadoLibre: true,
      talentprotocol: true
    })
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<CredentialSubject | null>(null)
  return { 
    localId, 
    setLocalId,
    level, 
    setLevel,
    didUrl, 
    setDidUrl,
    time, 
    setTime,
    redes,
    setRedes,
    talentProtocol, 
    setTalentProtocol,
    credential, 
    setCredential,
    data, 
    setData,
    loading, 
    setLoading,
    isLoading, 
    setIsLoading,
    error, 
    setError,
    user, 
    setUser
}
}
