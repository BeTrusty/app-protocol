import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

/**
 * @function errorHandler
 * @param {NextApiHandler} handler - El manejador de la petición.
 * @description Esta función maneja los errores de las peticiones.
 * @returns {Promise<void>}
 */
export const errorHandler =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      const e = error as { message: string }
      console.error(error)
      res.status(500).json({ error: e.message })
    }
  }
