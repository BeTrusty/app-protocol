import type { NextApiRequest, NextApiResponse } from 'next'
// import { verifyIdToken } from 'next-firebase-auth'
// import { initAuth } from '@src/firebase/initAuth'
import { errorHandler } from './errorHandler'

// initAuth()

/**
 * @async
 * @function postMethod
 * @param {req} req - El objeto de la petición.
 * @param {res} res - El objeto de la respuesta.
 * @description Esta función verifica que el método de la petición sea POST y que el usuario esté autenticado.
 */
export const postMethod = errorHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'POST') {
      return res.status(404).json({ error: 'Endpoint not found' })
    }

    // const token: string | undefined = req.headers.authorization?.split(' ')[1]
    // if (!token) {
    //   return res.status(401).json({ error: 'Unauthorized' })
    // }

    // const auth = await verifyIdToken(token)
    // if (!auth.id || !auth.email) {
    //   return res.status(401).json({
    //     error: 'Unauthorized, you must authenticate to access this API'
    //   })
    // }
  }
)
