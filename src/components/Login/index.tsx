import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@nextui-org/react' // Importa solo el componente Button
import { Title } from '@components/Title' // Importa solo el componente Button

export function Login (): JSX.Element {
  const router = useRouter();
  const endpointApiWorldID =
    'https://id.worldcoin.org/authorize?response_type=code&redirect_uri=https://api-betrusty.vercel.app/worldid/callback&scope=openid+profile+email&client_id=app_b5bf70a63e4ecd0be5f1b754b6675728';
  const endpointApiZkSync =
    'https://zksync.io/authorize?response_type=code&redirect_uri=https://api-betrusty.vercel.app/zksync/callback&scope=openid+profile+email&client_id=your_zksync_client_id';

  /**
   * @function signInWithWorldID
   * @description Función para redirigir al usuario a la página de WorldID
   * @returns {void}
   */
  const signInWithWorldID = (): void => {
    window.location.href = endpointApiWorldID;
  };

  /**
   * @function signInWithZkSync
   * @description Función para redirigir al usuario a la página de zkSync
   * @returns {void}
   */
  const signInWithZkSync = (): void => {
    window.location.href = endpointApiZkSync;
  };

  return (
    <section className='flex flex-col justify-start items-center w-full max-w-[400px] mt-5 p-5'>
      <Title text='Inicia sesión' />
      <Image
        src='/img/SSO.png'
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
      <Button
        color='primary'
        radius='full'
        className='w-full max-w-[260px] mt-4'
        onClick={signInWithZkSync}
      >
        Conectar zkSync
      </Button>
    </section>
  );
}