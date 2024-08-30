import { LayoutPages } from '@/layouts/LayoutPage'
import { Login } from '@/components/Login'

export default function LoginPage (): JSX.Element {
  return (
    <LayoutPages
      title='Inicia sesión en Betrusty'
      description='Inicia sesión con WorldId y verifica que eres un humano'
    >
      <Login />
    </LayoutPages>
  )
}
