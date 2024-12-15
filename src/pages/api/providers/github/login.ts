// pages/api/providers/github.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || ""
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || ""

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (id && typeof id === 'string') {
    const baseUri = 'https://github.com/login/oauth/authorize'
    const finalUri = `${baseUri}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&state=${id}`
    return res.redirect(finalUri)
  }

  return res.status(400).json({
    message: 'Bad request: Please provide an "id" to initiate the GitHub OAuth flow.'
  })
}
