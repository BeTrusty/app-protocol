// #region IMPORTS

// Types and interfaces
import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  type CredentialSubject,
  type CredentialData
} from '@/types/credentials'

// Utils
import { errorHandler } from '@/utils/errorHandler'
import { postMethod } from '@/utils/postMethod'
import { fetchUserById } from '@/utils/fetchUserById'
import { API_CREATE_CREDENTIALS, API_CREATE_DID } from '@/constants/url'

// JSON Data
import EmptyDisplay from '@/credential/EmptyOutputDescriptorDisplay.json'
import defaultDisplay from '@/credential/OutputDescriptorDisplay.json'
import GithubDisplay from '@/credential/GithubOutputDescriptorDisplay.json'
import MercadoLibreDisplay from '@/credential/MercadoLibreOutputDescriptorDisplay.json'
import styles from '@/credential/OutputDescriptorStyles.json'
import IssuerStyles from '@/credential/IssuerStyles.json'
import context from '@/credential/Context.json'

// #region API
export default errorHandler(async function NewUser (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await postMethod(req, res)
  const { id }: { id: string } = req.body

  try {
    if (id !== undefined && id !== null && id !== '') {
      const { user } = await fetchUserById(id)
      const url =
        user?.reputation_level === 'Silver'
          ? 'https://trusthub-betrusty.vercel.app/vc/silver.png'
          : 'https://trusthub-betrusty.vercel.app/vc/bronze.png'

      if (user !== undefined && user !== null) {
        try {
          const response_did = await fetch(API_CREATE_DID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              websocket: 'https://sandbox-ssi-ws.extrimian.com/',
              didMethod: 'did:quarkid'
            })
          })

          const { did } = await response_did.json()

          const display = () => {
            if (user?.github_login && user?.mercado_libre_nickname) {
              console.log('Todos')
              return defaultDisplay
            } else if (user?.github_login && !user?.mercado_libre_nickname) {
              console.log('Tiene Github')

              return GithubDisplay
            } else if (!user?.github_login && user?.mercado_libre_nickname) {
              console.log('Tiene Mercado Libre')

              return MercadoLibreDisplay
            } else {
              console.log('Ninguno')
              return EmptyDisplay
            }
          }

          const myCredential = {
            ...user,
            created_at: String(Date.now())
          }

          const credential: CredentialData = {
            did: did,
            oneTimeUse: true,
            vc: {
              '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://w3id.org/security/bbs/v1',
                context
              ],
              type: [
                'VerifiableCredential',
                'ReputationPassport',
                'BetrustyCredential'
              ],
              issuer: did,
              credentialSubject: myCredential as CredentialSubject,
              id: did,
              issuanceDate: new Date().toISOString()
            },
            outputDescriptor: {
              id: 'citizen_credential_output',
              schema: 'string',
              display: display(),
              styles: {
                ...styles,
                hero: {
                  uri: url,
                  alt: 'Backgroud VC'
                }
              }
            },
            issuer: {
              name: 'BeTrusty',
              styles: IssuerStyles
            }
          }

          try {
            const vc = await fetch(API_CREATE_CREDENTIALS, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(credential)
            })

            const data = await vc.json()

            // #region RESPONSE
            return res.status(200).json({
              message: 'Credencial Verificable creada con éxito.',
              data,
              credential
            })
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error al crear la credencial' })
          }
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Error al crear el DID' })
        }
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al leer los datos del usuario en la base de datos'
    })
  }
})
