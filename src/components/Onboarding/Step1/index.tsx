import { IconWelcome } from '@components/Icons/IconWelcome'
import { Title } from '@components/Title'

export function Step1 (): JSX.Element {
  return (
    <section className='flex flex-col justify-start items-center gap-8 w-full'>
      <div className='flex flex-col gap-2'>
        <Title text='¡Bienvenido a BeTrusty!' />
        <p className='text-base'>
          Crea tu pasaporte digital para poder ser dueño de tu reputación en
          internet
        </p>
      </div>
      <div className='w-full max-w-[350px] flex flex-row justify-center items-center mb-12'>
        <IconWelcome width='250px' />
      </div>
    </section>
  )
}
