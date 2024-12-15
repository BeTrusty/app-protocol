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
import { LogoAutoPen } from '@/components/Icons/IconAutoPen'
import { Button, Skeleton } from '@nextui-org/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useConnectInformation } from '@/hooks/useConnectInformation'

import { signIn } from 'next-auth/react';

export function ConnectYourData ({
  email,
  id
}: {
  email: string
  id: string
}): JSX.Element {
  const { localId, 
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
    autopen,
    setAutopen,
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
    setUser} = useConnectInformation()
  const router = useRouter()

  const urlLoginGithub: string = `https://api-betrusty.vercel.app/github/login`
  const urlLoginMl: string = `https://api-betrusty.vercel.app/ml/login`

  //Nueva url hay que crearla
  const urlLoginTalentProtocol: string = `https://api-betrusty.vercel.app/talentprotocol/login`



  /**
   * @function loginGithub
   * @description Redirecciona al usuario a la página de login de Github
   * @returns {void}
   */
  const loginGithub = () => {
    router.push(`/api/providers/github/login?id="${1234}"`);
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


  const getUrlTalentProtocol = async (id: string) => {
    if (id !== '') { // Asegúrate de que `id` esté disponible
      try {
        const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${id}`, {
          method: 'GET',
          headers: {
          'X-API-KEY':	process.env.NEXT_PUBLIC_API_KEY_TALENT_PROTOCOL as string ?? '',
          },
        });
        const data = await response.json();
        console.log({data});
        setTalentProtocol(data)
        setRedes({...redes, talentProtocol: true})

        //Validacion necesaria
      } catch (error) {
        console.error('Error al llamar a la API de Talent Protocol:', error);
      }
    } else {
    }
  }

  /**
   * @function loginTalentProtocol
   * @description Redirecciona al usuario a la página de login de talent protocol
   * @returns {void}
   */
  const loginTalentProtocol = async () => {
    const id = '0xA081e1dA16133bB4Ebc7Aab1A9B0588A48D15138' //Test ID
    const url = await getUrlTalentProtocol(id);
  }

  const getUrlAutoPen = () => {
    try {
      void CreateSignatureAutoPen('Saymon', 'Porras', 12345678, '0x5e2c00ed208912df89BD65B407A0b57e899850b1');
    } catch (error) {
      console.error('Error creating signature:', error);
    }
  };

  /**
   * @function CreateSignatureAutoPen
   * @description Redirecciona al usuario a la creación de firma digital con AutoPen
   * @returns {void}
   */
  const CreateSignatureAutoPen = async (name: string, lastName: string, dni: number, publicKey: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/providers/autopen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          lastName,
          dni,
          publicKey
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response:', data);
      setAutopen(data);
      setRedes({...redes, autopen: true})
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {!user?.mercado_libre_nickname && !redes.mercadoLibre && (
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
            {!user?.github_login && !redes.github &&  (
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
            {!user?.talent_protocol_login && !redes.talentProtocol &&  (
              <SelectDataProvider
                id='talent-protocol'
                text='Talent Protocol'
                icon={<LogoTalentProtocol width='35px' />}
                onClick={loginTalentProtocol}
                isAvailable={true}
              />
            )}
            </Skeleton>
            <Skeleton isLoaded={true} className='rounded-lg w-full'>
              {!user?.autopen_login && !redes.autopen &&  (
              <SelectDataProvider
                id='autopen'
                text='AutoPen'
                icon={<LogoAutoPen width='35px' />}
                onClick={getUrlAutoPen}
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
