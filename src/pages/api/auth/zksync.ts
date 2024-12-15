// Types and interfaces
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseData, ZkSyncProofRequestBody } from '@/types/zksync'

// Utils
import { initAuth } from '@/firebase/initAuth'
import { errorHandler } from '@/utils/errorHandler'
import { getCustomTokenFromZkSyncProof } from '@/utils/getCustomTokenFromZkSyncProof'

initAuth()

export default errorHandler(async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { zkSyncProof } = req.body as ZkSyncProofRequestBody

  if (!zkSyncProof) {
    return res.status(400).json({ error: 'No se proporcionó zkSyncProof' })
  }

  try {
    const customToken = await getCustomTokenFromZkSyncProof(zkSyncProof)
    return res.status(200).json({ customToken })
  } catch (error: any) {
    console.error('Error al generar el Custom Token:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
})
