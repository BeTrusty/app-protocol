import { LayoutPages } from '@/layouts/LayoutPage'
import { Spinner } from '@nextui-org/react'

export function LayoutLoadingPage (): JSX.Element {
  return (
    <LayoutPages title='Cargando...' description='Cargando datos...'>
      <section className='flex flex-col justify-start items-center gap-8 w-full max-w-[400px] mt-5 p-5'>
        <Spinner
          size='lg'
          label='Cargando datos...'
          color='primary'
          labelColor='foreground'
        />
      </section>
    </LayoutPages>
  )
}
