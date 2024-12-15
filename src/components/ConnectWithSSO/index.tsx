// #region IMPORTS

// Modules and main functions
import { memo } from 'react'
import { connect } from '@wagmi/core'
import { ssoConnector } from '@/config/ssoZKsync'
import { wagmiConfig } from '@/config/wagmi'
import { getAuth, signInWithCustomToken } from 'firebase/auth'

// Custom hooks
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Components
import { Button } from '@nextui-org/react'

// #region COMPONENT
export const ConnectWithSSO = memo(function ConnectWithSSO () {
  const [, setAddress] = useLocalStorage<null | `0x${string}`>('address')

  async function signInWithZkSync (zkSyncProof: {
    userAddress: string
    isValid: boolean
  }) {
    const response = await fetch('/api/auth/zksync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zkSyncProof })
    })

    if (!response.ok) {
      const { error } = await response.json()
      throw new Error('Error al obtener el Custom Token: ' + error)
    }

    const { customToken } = await response.json()

    const auth = getAuth()
    await signInWithCustomToken(auth, customToken)
  }

  const handleConnect = async () => {
    try {
      const connection = await connect(wagmiConfig, {
        connector: ssoConnector,
        chainId: 300
      })
      setAddress(connection.accounts[0])

      if (!connection.accounts) {
        console.error('Error al conectar con zkSync SSO:', connection)
      }

      await signInWithZkSync({
        userAddress: connection.accounts[0],
        isValid: true
      })
    } catch (error) {
      console.error('Error al conectar con zkSync SSO:', error)
    }
  }

  // #region RENDER
  return (
    <Button
      fullWidth
      color='primary'
      radius='full'
      className='w-full mt-4'
      onClick={handleConnect}
    >
      Iniciar sesión
    </Button>
  )
})
