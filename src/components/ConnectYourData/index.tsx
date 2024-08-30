import {
  CredentialData,
  type CredentialSubject,
  type ResponseVCData
} from '@/types/credentials'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Separator } from '@components/Separator'
import { fetchUserById } from '@/utils/fetchUserById'
import { Title } from '@components/Title'
import { SelectDataProvider } from '@components/SelectDataProvider'
import {
  LogoAirbnb,
  LogoBCRA,
  LogoFacebook,
  LogoGithub,
  LogoInstagram,
  LogoLinkedin,
  LogoMercadoLibre
} from '@/components/Icons'
import { Button, Skeleton } from '@nextui-org/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function ConnectYourData ({
  email,
  id
}: {
  email: string
  id: string
}): JSX.Element {
  const [localId, setLocalId] = useLocalStorage<string>('localId')
  const [level, setLevel] = useLocalStorage<string>('level')
  const [didUrl, setDidUrl] = useLocalStorage<string>('didUrl')
  const [time, setTime] = useLocalStorage<number>('time')
  const [credential, setCredential] =
    useLocalStorage<CredentialData>('credential')
  const [data, setData] = useState<ResponseVCData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<{
    github: boolean
    mercadoLibre: boolean
  }>({
    github: true,
    mercadoLibre: true
  })
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<CredentialSubject | null>(null)

  const router = useRouter()

  const urlLoginGithub: string = `https://api-betrusty.vercel.app/github/login`
  const urlLoginMl: string = `https://api-betrusty.vercel.app/ml/login`

  const getUrlGithub = () => {
    if (email !== '') {
      return `${urlLoginGithub}?worldid_email=${email}`
    } else {
      return `${urlLoginGithub}`
    }
  }

  /**
   * @function loginGithub
   * @description Redirecciona al usuario a la página de login de Github
   * @returns {void}
   */
  const loginGithub = () => {
    router.push(getUrlGithub())
  }

  const getUrlMercadoLibre = () => {
    if (email !== '') {
      return `${urlLoginMl}?worldid_email=${email}&country_code=AR`
    } else {
      return `${urlLoginMl}`
    }
  }

  /**
   * @function loginMercadoLibre
   * @description Redirecciona al usuario a la página de login de Mercado Libre
   * @returns {void}
   */
  const loginMercadoLibre = () => {
    router.push(getUrlMercadoLibre())
  }

  useEffect(() => {
    const getUser = async () => {
      if (id !== undefined && id !== null && id !== '') {
        const { user } = await fetchUserById(id)
        if (user) {
          setUser(user)
          setIsLoading({
            github: user.github_login ? true : false,
            mercadoLibre: user.mercado_libre_nickname ? true : false
          })
        }
      }
    }

    getUser()
  }, [id])

  /**
   * @function createPassport
   * @description Crea un pasaporte de verificación de credenciales
   */
  const createPassport = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/credentials/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { data, credential } = (await response.json()) as {
        data: ResponseVCData
        credential: CredentialData
      }
      setCredential(credential)
      setData(data)
      setDidUrl(data.oobContentData)
      setTime(Date.now())
      setLevel(credential.vc.credentialSubject.reputation_level)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const isValidQRCode: boolean =
    didUrl !== '' && didUrl !== null && didUrl !== undefined

  useEffect(() => {
    if (id !== null && id !== undefined && id !== '') {
      setLocalId(id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <section className='flex flex-col justify-start items-center gap-8 w-full max-w-[400px] mt-5 p-5'>
      <Title text='¡Conecta tu información!' />
      <div className='flex flex-col justify-start items-center gap-8 w-full'>
        <div className='flex flex-col justify-start items-center gap-2 w-full'>
          <Skeleton isLoaded={true} className='rounded-lg w-full'>
            {!user?.mercado_libre_nickname && (
              <SelectDataProvider
                id='mercado-libre'
                text='Mercado Libre'
                icon={<LogoMercadoLibre width='40px' />}
                onClick={loginMercadoLibre}
                isAvailable={true}
              />
            )}
          </Skeleton>
          <Skeleton isLoaded={true} className='rounded-lg w-full'>
            {!user?.github_login && (
              <SelectDataProvider
                id='github'
                text='Github'
                icon={<LogoGithub width='35px' />}
                onClick={loginGithub}
                isAvailable={true}
              />
            )}
          </Skeleton>
        </div>

        {user && (
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <Button
              color='primary'
              radius='full'
              className='w-full'
              onClick={createPassport}
            >
              Crear pasaporte
            </Button>
            {isValidQRCode && (
              <Button
                color='primary'
                radius='full'
                variant='bordered'
                className='w-full'
                onClick={() => router.push('/passport')}
              >
                Visualizar pasaporte
              </Button>
            )}
          </div>
        )}

        <Separator text='Próximamente...' />

        <div className='flex flex-col justify-start items-center gap-2 w-full'>
          <SelectDataProvider
            id='bcra'
            text='Banco Central de la República Argentina'
            icon={<LogoBCRA width='35px' />}
            onClick={() => null}
            isAvailable={false}
          />
          <SelectDataProvider
            id='linkedin'
            text='Linkedin'
            icon={<LogoLinkedin width='40px' />}
            onClick={() => null}
            isAvailable={false}
          />
          <SelectDataProvider
            id='instagram'
            text='Instagram'
            icon={<LogoInstagram width='35px' />}
            onClick={() => null}
            isAvailable={false}
          />
          <SelectDataProvider
            id='facebook'
            text='Facebook'
            icon={<LogoFacebook width='35px' />}
            onClick={() => null}
            isAvailable={false}
          />
          <SelectDataProvider
            id='airbnb'
            text='Airbnb'
            icon={<LogoAirbnb width='40px' />}
            onClick={() => null}
            isAvailable={false}
          />
        </div>
      </div>
    </section>
  )
}
