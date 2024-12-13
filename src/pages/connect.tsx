import { type NextPageContext } from 'next'
import { fetchUserById } from '@/utils/fetchUserById'
import { LayoutPages } from '@/layouts/LayoutPage'
import { ConnectYourData } from '@/components/ConnectYourData'

export default function ConnectPage ({
  id,
  email
}: {
  id: string
  email: string
}): JSX.Element {
  return (
    <LayoutPages
      title='Conecta tu información'
      description='Conecta tu información de Mercado Libre y Github de forma segura'
    >
      <ConnectYourData id={id} email={email} />
    </LayoutPages>
  )
}

// Tipar las props de la página
// export async function getServerSideProps ({ query }: NextPageContext) {
//   const { id_user, email } = query

//   const id = id_user ?? ''
//   const emailQuery = email ?? ''
//   if (typeof id === 'string' && id !== '' && id !== undefined && id !== null) {
//     const { user } = await fetchUserById(id)

//     if (user?.reputation_level === 'Silver') {
//       return {
//         redirect: {
//           destination: '/passport',
//           permanent: false
//         }
//       }
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       id,
//       email: emailQuery
//     }
//   }
// }
