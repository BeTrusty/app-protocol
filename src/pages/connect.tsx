import { type NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { fetchUserById } from '@/utils/fetchUserById'
// #region IMPORTS

// Types and interfaces
import { type User } from '@/types/user'

// Modules and main functions
import { docs, get } from '@/firebase/docs'
import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth'

// Layouts
import { LayoutPages } from '@/layouts/LayoutPage'

// Components
import { Title } from '@/components/Title'
import { ConnectYourData } from '@/components/ConnectYourData'

// #region PAGE
export function ConnectPage ({
  id,
  user
}: {
  id: string
  user: User | null
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
      <>
        <Title text={id} />
        <ConnectYourData id={id} email={id} />
      </>
    </LayoutPages>
  )
}

// export const getServerSideProps = withUserTokenSSR({
//   whenAuthed: AuthAction.RENDER,
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
// })(async ({ user }) => {
//   const id = user?.id
//   let res
//   let redirect
//   let currentUser: User | null = null

//   if (id !== null && id !== undefined) {
//     try {
//       res = await get({ refDoc: docs(id).users })
//       currentUser = res.data
//     } catch {
//       redirect = {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   } else {
//     redirect = {
//       destination: '/login',
//       permanent: false
//     }
//   }

//   return {
//     props: {
//       user: currentUser,
//       id
//     },
//     redirect
//   }
// })

// #region EXPORTS
export default withUser<{
  id: string
  user: User | null
}>({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(ConnectPage)
