import { IconPassport } from '@components/Icons'
import { Title } from '@components/Title'

export function Step4 (): JSX.Element {
  return (
    <section className='flex flex-col justify-start items-center gap-8 w-full'>
      <div className='flex flex-col gap-2'>
        <Title text='¡Obtén tu pasaporte!' />
        <p className='text-base'>
          Es un credencial verificable y descentralizada bajo tu control
        </p>
      </div>
      <div className='w-full max-w-[350px] flex flex-row justify-center items-center'>
        <IconPassport width='90%' />
      </div>
    </section>
  )
}
