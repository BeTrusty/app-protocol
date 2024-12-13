import type { NextApiRequest, NextApiResponse } from 'next'
import { unsetAuthCookies } from 'next-firebase-auth'
import { initAuth } from '@/firebase/initAuth'

initAuth()

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await unsetAuthCookies(req, res)
    res.status(200).json({ success: true })
  } catch (e) {
    console.log('Error logging out', e)
    res.status(500).json({ error: 'Unexpected error' })
  }
}
