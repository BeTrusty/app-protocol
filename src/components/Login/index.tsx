import Image from 'next/image'
import { Title } from '@components/Title'
import { Button } from '@nextui-org/react'

export function Login (): JSX.Element {
  const endpointApi =
    'https://id.worldcoin.org/authorize?response_type=code&redirect_uri=https://api-betrusty.vercel.app/worldid/callback&scope=openid+profile+email&client_id=app_b5bf70a63e4ecd0be5f1b754b6675728'

  /**
   * @function signInWithWorldID
   * @description Función para redirigir al usuario a la página de WorldID
   * @returns {void}
   */
  const signInWithWorldID = (): void => {
    window.location.href = endpointApi
  }

  return (
    <section className='flex flex-col justify-start items-center w-full max-w-[400px] mt-5 p-5'>
      <Title text='Inicia sesión' />
      <Image
        src='/img/worldId.avif'
        width={400}
        height={500}
        alt='Imagen del pasaporte de WorldID'
      />
      <Button
        color='primary'
        radius='full'
        className='w-full max-w-[260px]'
        onClick={signInWithWorldID}
      >
        Conectar WorldID
      </Button>
    </section>
  )
}
