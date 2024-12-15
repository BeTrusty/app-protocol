// #region IMPORTS

// Modules and main functions
import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth'

// Layouts
import { LayoutPages } from '@/layouts/LayoutPage'

// Components
import { Login } from '@/components/Login'

// #region PAGE
export const LoginPage = (): JSX.Element => {
  return (
    <LayoutPages
      title='Inicia sesión en Betrusty'
      description='Inicia sesión con WorldId y verifica que eres un humano'
    >
      <Login />
    </LayoutPages>
  )
}

export const getServerSideProps = withUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})()

// #region EXPORTS
export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})(LoginPage)
