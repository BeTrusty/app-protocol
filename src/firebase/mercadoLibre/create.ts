import { type MercadoLibre } from '@/types/mercadolibre';
import { docs, set } from '@/firebase/docs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @function createMercadoLibre
 * @param {MercadoLibre} mercadoLibre
 * @description Crea un mercado libre en la base de datos de Firebase
 */
export const createMercadoLibre = async (
  mercadoLibre: MercadoLibre
): Promise<void> => {
  try {
    await set<MercadoLibre>({
      refDoc: docs(uuidv4()).mercadoLibre,
      uploadData: mercadoLibre
    });
    console.log('MercadoLibre creado exitosamente');
  } catch (error) {
    console.error('Error al crear el MercadoLibre', error);
  }
};