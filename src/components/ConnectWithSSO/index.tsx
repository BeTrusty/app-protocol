import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { connect } from '@wagmi/core'
import { ssoConnector } from '@/config/ssoZKsync'
import { wagmiConfig } from '@/config/wagmi'

const ConnectWithSSO: React.FC = () => {
  const [address, setAddress] = useState<null | `0x${string}`>(null)

  const handleConnect = async () => {
    try {
      const connection = await connect(wagmiConfig, {
        connector: ssoConnector,
        chainId: 300
      })

      if (!connection.accounts) {
        console.error('Error al conectar con zkSync SSO:', connection)
      }

      setAddress(connection.accounts[0])
    } catch (error) {
      console.error('Error al conectar con zkSync SSO:', error)
    }
  }

  return (
    <>
      <Button
        color='primary'
        radius='full'
        className='w-full max-w-[260px] mt-4'
        onClick={handleConnect}
      >
        Iniciar sesión con zkSync SSO
      </Button>
    </>
  )
}

export default ConnectWithSSO
