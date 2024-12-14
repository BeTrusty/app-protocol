import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@nextui-org/react' // Importa solo el componente Button
import { Title } from '@components/Title' // Importa solo el componente Button
import ConnectWithSSO  from '@components/ConnectWithSSO'


export function Login (): JSX.Element {
  const router = useRouter();
  const endpointApiWorldID =
    'https://id.worldcoin.org/authorize?response_type=code&redirect_uri=https://api-betrusty.vercel.app/worldid/callback&scope=openid+profile+email&client_id=app_b5bf70a63e4ecd0be5f1b754b6675728';
  const endpointApiZkSync = 'https://api-era.zksync.network/api?module=proxy&action=eth_getCode&address=0xBa3018FF65C961406B5826afD6762a9c06972db5&tag=latest&apikey=A445QM53W9RK7JC4ECVGHX9VP2PH3KT4W2';

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
    <section className='flex flex-col justify-start items-center w-full max-w-[400px] mt-20 p-5'>
      <Title text='Inicia sesión' />
      <Image
        src='/img/SSO.png'
        width={100}
        height={500}
        alt='Imagen del pasaporte de WorldID'
        className='mt-4'
      />
      <div className='mt-4'></div> 
      <Button
        color='primary'
        radius='full'
        className='w-full max-w-[260px]'
        onClick={signInWithWorldID}
        
      >
        Conectar WorldID
      </Button>
      <ConnectWithSSO />
    </section>
  );
}