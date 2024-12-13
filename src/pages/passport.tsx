import { type CredentialData } from '@/types/credentials'
import { useRouter } from 'next/router'
import { LayoutPages } from '@/layouts/LayoutPage'
import { Title } from '@/components/Title'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button } from '@nextui-org/react'
import { Passport } from '@/components/Passport'
import { LogoQuarkID } from '@/components/Icons/IconQuarkId'
import { Separator } from '@/components/Separator'
import { useEffect, useState } from 'react'
import { LayoutLoadingPage } from '@/layouts/LayoutLoadingPage'

export default function PassportPage (): JSX.Element {
  const router = useRouter()
  const [credential] = useLocalStorage<CredentialData>('credential')
  const [localId] = useLocalStorage<string>('localId')
  const [level] = useLocalStorage<string>('level')

  const [connectMoreApps, setConnectMoreApps] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (level === 'Silver') {
      setConnectMoreApps(false)
    }
  }, [level])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Espera un pequeño retraso para asegurarte de que credential se haya cargado
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (!credential) {
        router.push('/login')
      }
    }
  }, [isLoading, credential, router])

  if (isLoading) {
    return <LayoutLoadingPage />
  }

  return (
    <LayoutPages
      title='Visualiza tu información'
      description='Conecta tu información de Mercado Libre y Github de forma segura'
    >
      <section className='flex flex-col justify-start items-center gap-8 w-full max-w-[400px] mt-5 p-5'>
        <Title text='Credencial Verificable' />
        {credential !== undefined && credential !== null && (
          <Passport credential={credential} />
        )}

        <Separator icon={<LogoQuarkID width='100px' />} />

        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <Button
            color='primary'
            radius='full'
            className='w-full'
            onClick={() => router.push('/quarkid')}
          >
            Agregar a QuarkID
          </Button>
          {connectMoreApps && (
            <Button
              color='primary'
              radius='full'
              variant='bordered'
              className='w-full'
              onClick={() => router.push(`/connect?id_user=${localId}`)}
            >
              Conectar más aplicaciones
            </Button>
          )}
        </div>
      </section>
    </LayoutPages>
  )
}
