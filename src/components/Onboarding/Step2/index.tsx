import { IconFingerprint } from '@/components/icons/IconFingerprint'
import { Title } from '@components/Title'

export function Step2 (): JSX.Element {
  return (
    <section className='flex flex-col justify-start items-center gap-8 w-full '>
      <div className='flex flex-col gap-2'>
        <Title text='¡Prueba tu humanidad!' />
        <p className='text-base '>
          Inicia sesión con WorldID para verificar que eres un humano
        </p>
      </div>
      <div className='w-full max-w-[350px] flex flex-row justify-center items-center'>
        <IconFingerprint width='90%' />
      </div>
    </section>
  )
}
