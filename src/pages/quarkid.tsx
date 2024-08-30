import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useQRCode } from '@/hooks/useQRCode'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { LayoutPages } from '@/layouts/LayoutPage'
import { LayoutLoadingPage } from '@/layouts/LayoutLoadingPage'
import { Title } from '@/components/Title'
import { Button, Skeleton } from '@nextui-org/react'
import { CountDown } from '@/components/CountDown'
import { FaArrowLeft } from 'react-icons/fa'
import { LogoQuarkID } from '@/components/Icons/LogoQuarkId'

export default function QuarkIDPage (): JSX.Element {
  const router = useRouter()
  const firstCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [didUrl] = useLocalStorage<string>('didUrl')
  const [time] = useLocalStorage<number>('time')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Espera un pequeño retraso para asegurarte de que credential se haya cargado
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (!didUrl || !didUrl || !time) {
        router.push('/login')
      }
    }
  }, [isLoading, didUrl, router, time])

  const { canvas } = useQRCode({
    ref: !isLoading ? canvasRef : firstCanvasRef,
    type: 'default',
    text:
      didUrl ??
      'didcomm://?_oob=eyJ0eXBlIjoiaHR0cHM6Ly9kaWRjb21tLm9yZy9vdXQtb2YtYmFuZC8yLjAvaW52aXRhdGlvbiIsImlkIjoiMTk3NWYwYjgtOGE2Ni00NGU5LWJkNzEtZmZkYWFhODRmMjdjIiwiZnJvbSI6ImRpZDpxdWFya2lkOkVpRFZOa1IxOXVJYnJWcUxLd01Ib0hiMFI0X21VLVpJU3FJX2hqbl9NNm5PVXciLCJib2R5Ijp7ImdvYWxfY29kZSI6InN0cmVhbWxpbmVkLXZjIiwiYWNjZXB0IjpbImRpZGNvbW0vdjIiXX19'
  })

  if (isLoading) {
    return <LayoutLoadingPage />
  }

  return (
    <LayoutPages
      title='Conecta tu información a QuarkID'
      description='Escanea tu código QR para conectar tu información a QuarkID'
    >
      <section className='flex flex-col justify-start items-center gap-8 w-full max-w-[400px] mt-5 p-5'>
        <LogoQuarkID width='200px' />
        <Title text='Escanea tu código desde la app' />
        <Skeleton
          isLoaded={didUrl != ''}
          className='rounded-lg min-w-[388px] min-h-[388px] relative'
        >
          <canvas ref={canvas} width={200} height={200} />
          <CountDown creationTimestamp={time ?? 0} durationInMinutes={5} />
        </Skeleton>
        <Button
          color='primary'
          radius='full'
          className='w-full'
          startContent={<FaArrowLeft size={20} />}
          onClick={() => router.push('/passport')}
        >
          Volver a mi pasaporte
        </Button>
      </section>
    </LayoutPages>
  )
}
