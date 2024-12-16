// pages/api/providers/github/callback.ts
import { uploadGitHub } from '@/firebase/github/create'
import type { NextApiRequest, NextApiResponse } from 'next'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || ""
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || ""

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query

  if (!code || !state) {
    return res.status(400).send('Missing code or state')
  }

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
          state: state
        }),
      }
    )

    const data = await tokenResponse.json()

    if (!data.access_token) {
      return res.status(400).send('No access token returned by GitHub')
    }

    const access_token = data.access_token as string

    // Obtener datos del usuario desde la API de GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`
      }
    })

    if (!userResponse.ok) {
      return res.status(userResponse.status).send('Error fetching GitHub user data')
    }

    const githubUser = await userResponse.json()

    await uploadGitHub({userId: state, ...githubUser})

    const queryParams = new URLSearchParams({
        login: githubUser.login || '',
        id: String(githubUser.id || ''),
        name: githubUser.name || '',
        avatar_url: githubUser.avatar_url || '',
        // ... agrega los campos que quieras
      }).toString();

      return res.redirect(`/connect?${queryParams}`);

    // Aquí puedes guardar la info del usuario en tu DB si lo deseas,
    // o continuar con la lógica de tu app.
    console.log('GitHub user data:', githubUser)

    return res.status(200).redirect('/connect').json({ githubUser })

  } catch (error) {
    console.error('Error exchanging code for token or fetching user data', error)
    return res.status(500).send('Internal Server Error')
  }
}
