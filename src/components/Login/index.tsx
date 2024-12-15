import { Title } from '@components/Title'
import { ConnectWithSSO } from '@components/ConnectWithSSO'
import { IconFingerprint } from '../Icons'

export function Login (): JSX.Element {
  return (
    <section className='flex flex-col justify-center items-center gap-8 min-h-full w-full max-w-[300px]'>
      <div className='flex flex-col gap-2 w-full'>
        <Title text='¡Prueba tu humanidad!' />
        <p className='text-base'>
          Inicia sesión con SS0 para verificar que eres un humano
        </p>
      </div>
      <div className='w-full max-w-[350px] flex flex-row justify-center items-center'>
        <IconFingerprint width='100%' />
      </div>
      <ConnectWithSSO />
    </section>
  )
}
