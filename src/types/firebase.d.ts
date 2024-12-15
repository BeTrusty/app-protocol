import { type DocumentReference, type DocumentData } from 'firebase/firestore'

export interface TypeDocs {
  users: DocumentReference<DocumentData>
  github: DocumentReference<DocumentData>
  mercadoLibre: DocumentReference<DocumentData>
  talentProtocol: DocumentReference<DocumentData>
  autopen: DocumentReference<DocumentData>
  worldcoin: DocumentReference<DocumentData>
}

export interface PropsSetFunction<T> {
  refDoc: DocumentReference<DocumentData>
  uploadData: T
}
