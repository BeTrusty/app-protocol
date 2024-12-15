export interface Token {
  address: `0x${string}`
  decimals: number
}

export interface ZkSyncProof {
  userAddress: string
  isValid: boolean // Ejemplo: indica si la prueba pasó la validación
}

export interface ZkSyncUser {
  userId: string
}

export interface ZkSyncProofRequestBody {
  zkSyncProof: {
    userAddress: string
    isValid: boolean
  }
}

export type ResponseData = { customToken: string } | { error: string }
