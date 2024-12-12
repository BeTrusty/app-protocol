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
import { LogoAirbnb } from '@/components/Icons/IconAirbnb'
import { LogoBCRA } from '@/components/Icons/IconBCRA'
import { LogoFacebook } from '@/components/Icons/IconFacebook'
import { LogoGithub } from '@/components/Icons/IconGithub'
import { LogoInstagram } from '@/components/Icons/IconInstagram'
import { LogoLinkedin } from '@/components/Icons/IconLinkedin'
import { LogoMercadoLibre } from '@/components/Icons/IconMercadoLibre'
import { LogoTalentProtocol } from '@/components/Icons/IconTalentProtocol'
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
    talentprotocol: boolean
  }>({
    github: true,
    mercadoLibre: true,
    talentprotocol: true
  })
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<CredentialSubject | null>(null)

  const router = useRouter()

  const urlLoginGithub: string = `https://api-betrusty.vercel.app/github/login`
  const urlLoginMl: string = `https://api-betrusty.vercel.app/ml/login`

  //Nueva url hay que crearla
  const urlLoginTalentProtocol: string = `https://api-betrusty.vercel.app/talentprotocol/login`


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

  const getUrlTalentProtocol = async () => {
    if (id !== '') { // Asegúrate de que `id` esté disponible
      try {
        const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${id}`, {
          method: 'GET',
          headers: {
          'X-API-KEY':	'521a7face5859649c3639f01a52961bc2cb35773a01cb498750018ba5ee7',
          },
        });
        const data = await response.json();
        console.log(data);
        //Validacion necesaria
      } catch (error) {
        console.error('Error al llamar a la API de Talent Protocol:', error);
        //return `${urlLoginTalentProtocol}?worldid_email=${email}&country_code=AR`;
      }
    } else {
      //return `${urlLoginTalentProtocol}`;
    }
  }

  /**
   * @function loginTalentProtocol
   * @description Redirecciona al usuario a la página de login de talent protocol
   * @returns {void}
   */
  const loginTalentProtocol = async () => {
    id = '0xC38555a1Afcd8394532Caa11D0be60Df166eC188' //Test ID
    const url = await getUrlTalentProtocol();
    console.log(url);
    //router.push(url);
   
  }


  useEffect(() => {
    const getUser = async () => {
      if (id !== undefined && id !== null && id !== '') {
        const { user } = await fetchUserById(id)
        if (user) {
          setUser(user)
          setIsLoading({
            github: user.github_login ? true : false,
            mercadoLibre: user.mercado_libre_nickname ? true : false,
            talentprotocol: user.talent_protocol_login ? true : false
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
          <Skeleton isLoaded={true} className='rounded-lg w-full'>
            {!user?.talent_protocol_login && (
              <SelectDataProvider
                id='talent-protocol'
                text='Talent Protocol'
                icon={<LogoTalentProtocol width='35px' />}
                onClick={loginTalentProtocol}
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
