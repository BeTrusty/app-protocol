import { type NextPageContext } from 'next'
import { fetchUserById } from '@/utils/fetchUserById'
import { LayoutPages } from '@/layouts/LayoutPage'
import { Onboarding } from '@/components/Onboarding'

export default function Home () {
  return (
    <LayoutPages
      title='¡Bienvenido al protocolo de BeTrusty!'
      description='Crea tu pasaporte digital para poder ser dueño de tu reputación en internet'
    >
      <Onboarding />
    </LayoutPages>
  )
}

// Tipar las props de la página
export async function getServerSideProps ({ query }: NextPageContext) {
  const { id_user, email } = query

  const id = id_user ?? ''
  const emailQuery = email ?? ''
  if (typeof id === 'string' && id !== '' && id !== undefined && id !== null) {
    const { user } = await fetchUserById(id)

    if (user?.reputation_level === 'Silver') {
      return {
        redirect: {
          destination: '/passport',
          permanent: false
        }
      }
    }
  }

  return {
    props: {
      id,
      email: emailQuery
    }
  }
}
