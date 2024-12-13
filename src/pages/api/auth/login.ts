import type { NextApiRequest, NextApiResponse } from 'next'
import { setAuthCookies } from 'next-firebase-auth'
import { initAuth } from '@/firebase/initAuth'

initAuth()

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await setAuthCookies(req, res, {})
    res.status(200).json({ success: true })
  } catch (e) {
    console.error('Error logging in', e)
    res.status(500).json({ error: 'Unexpected error' })
  }
}
