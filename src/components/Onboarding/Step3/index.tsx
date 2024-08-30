import { IconGetData } from '@components/Icons'
import { Title } from '@components/Title'

export function Step3 (): JSX.Element {
  return (
    <section className='flex flex-col justify-start items-center gap-8 w-full'>
      <div className='flex flex-col gap-2'>
        <Title text='¡Conecta tu información!' />
        <p className='text-base'>
          Crea tu pasaporte digital para poder ser dueño de tu reputación en
          internet
        </p>
      </div>
      <div className='w-full max-w-[350px] flex flex-row justify-center items-center'>
        <IconGetData width='100%' />
      </div>
    </section>
  )
}
