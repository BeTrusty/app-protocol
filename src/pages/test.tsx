import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth'

function Test () {
  return <div>test</div>
}

export const getServerSideProps = withUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ user }) => {

  return {
    props: {}
  }
})

export default withUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Test)
