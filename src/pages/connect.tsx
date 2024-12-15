import { type NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
  const router = useRouter();
  const { login, name, avatar_url } = router.query;

  useEffect(() => {
    // Esto se ejecuta en el lado del cliente, por lo que se verá en la consola del navegador.
    if (login || name || avatar_url) {
      console.log('Datos del usuario desde GitHub:', {
        login,
        name,
        avatar_url
      });
    }
  }, [login, name, avatar_url]);

  return (
    <LayoutPages
      title='Conecta tu información'
      description='Conecta tu información de Mercado Libre y Github de forma segura'
    >
      <ConnectYourData id={id} email={email} />
    </LayoutPages>
  )
}

// Si utilizas getServerSideProps, lo mantienes o ajustas según tu lógica.
// Por ejemplo, si quieres seguir usando la lógica anterior, descomenta y ajusta:

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
