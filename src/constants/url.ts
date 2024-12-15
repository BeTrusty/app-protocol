import { type Token } from '@/types/zksync'

/**
 * @constant {string} ENV
 * @description Entorno de ejecución
 * @default 'development'
 */
const ENV = process.env.NODE_ENV

/**
 * @constant {string} ADDRESS_VERIFIER
 * @description Dirección del verificador de credenciales
 * @default '0x1b8f823ed41Bd01851B6f9Fcc1D66517458885B5'
 * @note En producción se debe cambiar por la dirección del contrato desplegado en mainnet
 */
export const ADDRESS_VERIFIER = ENV === 'development' ? '0x1b8f823ed41Bd01851B6f9Fcc1D66517458885B5' : '0x1b8f823ed41Bd01851B6f9Fcc1D66517458885B5'


/**
 * @constant {string} API_COUNTRY_CODE
 * @description Código de país para la API de Mercado Libre
 * @default 'https://api.country.is/'
 */
export const API_COUNTRY_CODE: string = 'https://api.country.is/'

/**
 * @constant {string} API_CREATE_CREDENTIALS
 * @description URL para crear credenciales
 */
export const API_CREATE_CREDENTIALS: string =
  'https://sandbox-ssi.extrimian.com/v1/credentialsbbs/wacioob'

/**
 * @constant {string} API_CREATE_DID
 * @description URL para crear un DID
 */
export const API_CREATE_DID: string =
  'https://sandbox-ssi.extrimian.com/v1/dids/quarkid'

/**
 * @constant {string} API_GET_GITHUB_USER
 * @description URL para obtener información de un usuario de GitHub
 */
export const API_GET_GITHUB_USER: string = 'https://api.github.com/users/'

/**
 * @constant {string} API_GET_MERCADO_LIBRE_USER
 * @description URL para obtener información de un usuario de Mercado Libre
 */
export const API_GET_MERCADO_LIBRE_USER: string =
  'https://api.mercadolibre.com/users/'

/**
 * @constant {string} API_GET_USER
 * @description URL para obtener información de un usuario
 */
export const API_GET_USER: string =
  'https://api-betrusty.vercel.app/user/all?id_user='

/**
 * @constant {string} API_CREATE_SIGNATURE
 * @description URL para crear una firma digital con AutoPen
 */
export const API_CREATE_SIGNATURE: string =
  'https://autopen-api-git-main-scammis-projects.vercel.app/api/certificates'

/**
 * @constant {string} TOKEN
 * @description Token de la red zkSync
 */
export const TOKEN: Token = {
  address: '0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044',
  decimals: 18
}
