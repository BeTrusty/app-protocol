// Styles CSS
import '@/styles/globals.css'

// Types and interfaces
import type { AppProps } from 'next/app'

// Context
import { Provider } from '@/context'
import { NextUIProvider } from '@nextui-org/react'

// Modules and main functions
import { initAuth } from '@/firebase/initAuth'
import { withUser } from 'next-firebase-auth'
initAuth()

// Componente App que envuelve a toda la aplicación
const App =  ({ Component, pageProps }: AppProps)=> {
  return (
    <Provider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  )
}

export default withUser<AppProps>()(App)