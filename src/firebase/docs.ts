import { PropsSetFunction, type TypeDocs } from '@/types/firebase'
import { db } from './config'
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc
} from 'firebase/firestore'

export const docs = (id: string): TypeDocs => {
  return {
    users: doc(db, `/users/${id}`),
    github: doc(db, `/github/${id}`),
    mercadoLibre: doc(db, `/mercadoLibre/${id}`),
    talentProtocol: doc(db, `/talentProtocol/${id}`),
    autopen: doc(db, `/autopen/${id}`),
    worldcoin: doc(db, `/worldcoin/${id}`)
  }
}

/**
 * @function get
 * @description Obtiene los datos de un documento en una colección.
 * @param {DocumentReference} refDoc - Referencia del documento donde se establecerán los datos.
 * @returns {Promise<DocumentData>} Retorna una promesa que se resuelve con los datos establecidos en el documento.
 *
 * @example
 * // Cómo utilizar la función get:
 * const docRef = doc(db, 'myCollection', 'docId');
 * get({ refDoc: docRef })
 *
 * // Esto obtendrá los datos del documento 'docId' en la colección 'myCollection'.
 */
export const get = async ({
  refDoc
}: {
  refDoc: DocumentReference<DocumentData>
}): Promise<DocumentData> => {
  try {
    const docSnap = await getDoc(refDoc)
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        data
      }
    } else {
      throw new Error('No existe el documento al que estás intentando acceder')
    }
  } catch (e) {
    console.error('Hubo un error al LEER los datos en firebase: ', e)
    throw new Error('Hubo un error al LEER los datos en firebase')
  }
}

/**
 * @function set
 * @description Establece un documento en una colección con datos proporcionados.
 * @param {DocumentReference} refDoc - Referencia del documento donde se establecerán los datos.
 * @param {Record<string, any>} uploadData - Datos a ser establecidos en el documento.
 * @return {Promise<DocumentData>} Retorna una promesa que se resuelve con los datos establecidos en el documento.
 *
 * @example
 * // Cómo utilizar la función set:
 * const docRef = doc(db, 'myCollection', 'docId');
 * set({ refDoc: docRef, uploadData: { name: 'John', age: 25 } })
 *
 * // Esto establecerá los datos en el documento 'docId' en la colección 'myCollection' con los valores proporcionados.
 */
export const set = async <T>({
  refDoc,
  uploadData
}: PropsSetFunction<T>): Promise<DocumentData> => {
  try {
    if (uploadData !== null && uploadData !== undefined) {
      await setDoc(refDoc, uploadData)
      return {
        data: uploadData
      }
    } else {
      throw new Error('No se proporcionó uploadData')
    }
  } catch (e) {
    console.error('Hubo un error al cargar los datos en firebase: ', e)
    throw new Error('Hubo un error al cargar los datos en firebase')
  }
}
