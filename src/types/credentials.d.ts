interface JsonLdContext {
  [key: string]: string
}

export interface CredentialSubject {
  created_at: string
  reputation_level: string
  github_login: string
  github_public_repos: string
  github_public_gists: string
  github_followers: string
  github_following: string
  github_created_at: string
  github_collaborators: string
  mercado_libre_first_name: string
  mercado_libre_last_name: string
  mercado_libre_email: string
  mercado_libre_identification_number: string
  mercado_libre_identification_type: string
  mercado_libre_seller_experience: string
  mercado_libre_seller_reputation_transactions_total: string
  mercado_libre_seller_reputation_transactions_completed: string
  mercado_libre_seller_reputation_transactions_canceled: string
  mercado_libre_seller_reputation_ratings_positive: string
  mercado_libre_seller_reputation_ratings_negative: string
  mercado_libre_seller_reputation_ratings_neutral: string
  mercado_libre_buyer_reputation_canceled_transactions: string
  mercado_libre_buyer_reputation_transactions_total: string
  mercado_libre_buyer_reputation_transactions_completed: string
  mercado_libre_nickname: string
  talent_protocol_login: string
}

interface VerifiableCredential {
  '@context': (string | JsonLdContext)[]
  id: string
  type: string[]
  issuer: string
  issuanceDate: string
  credentialSubject: CredentialSubject
}

export interface DisplayProperty {
  path: string[]
  fallback: string
  label: string
  schema: {
    type: string
  }
}

interface OutputDescriptorDisplay {
  title: {
    text: string
  }
  subtitle: {
    text: string
  }
  description: {
    text: string
  }
  properties: DisplayProperty[]
}

interface OutputDescriptorStyles {
  background: {
    color: string
  }
  thumbnail: {
    uri: string
    alt: string
  }
  hero: {
    uri: string
    alt: string
  }
  text: {
    color: string
  }
}

interface OutputDescriptor {
  id: string
  schema: string
  display: OutputDescriptorDisplay
  styles: OutputDescriptorStyles
}

interface IssuerStyles {
  background: {
    color: string
  }
  text: {
    color: string
  }
  thumbnail: {
    uri: string
    alt: string
  }
  hero: {
    uri: string
    alt: string
  }
}

interface Issuer {
  name: string
  styles: IssuerStyles
}

export interface CredentialData {
  did: string
  oneTimeUse: boolean
  vc: VerifiableCredential
  outputDescriptor: OutputDescriptor
  issuer: Issuer
}

export interface ResponseVCData {
  invitationId: string
  oobContentData: string
}
