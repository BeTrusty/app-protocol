import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from '@/context'
import { NextUIProvider } from '@nextui-org/react'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  )
}
