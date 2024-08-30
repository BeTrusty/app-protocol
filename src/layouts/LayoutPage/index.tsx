import { type PropsLayoutPages } from '@/types/layouts'
import Head from 'next/head'

export function LayoutPages ({
  title,
  description,
  children
}: PropsLayoutPages): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='index, follow' />
        <meta name='theme-color' content='#FFFFFF' />
        <link rel='icon' href='/favicon.ico' />
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <main className='w-full min-h-screen flex flex-col justify-start items-center text-default-700 bg-gray-50'>
        {children}
      </main>
    </>
  )
}
