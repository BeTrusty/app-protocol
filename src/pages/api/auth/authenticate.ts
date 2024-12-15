import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage } from 'ethers';

// Función para consultar el saldo en zkSync
const checkAddressOnZkSync = async (address: string): Promise<boolean> => {
  const zkSyncApiUrl = `https://api-era.zksync.network/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`;
  
  try {
    const response = await fetch(zkSyncApiUrl);
    const data = await response.json();
    
    // Si la respuesta contiene balance, se considera una dirección válida
    if (data.result && parseFloat(data.result) > 0) {
      return true; // La dirección tiene saldo
    }
    return false; // La dirección no tiene saldo
  } catch (error) {
    console.error('Error al consultar zkSync:', error);
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { address, message, signature } = req.body;

  try {
    // Verificar si la dirección está registrada en zkSync
    const isAddressOnZkSync = await checkAddressOnZkSync(address);
    if (!isAddressOnZkSync) {
      return res.status(400).json({ error: 'La dirección no está registrada en zkSync' });
    }

    // Verificar la firma usando verifyMessage directamente
    const recoveredAddress = verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Firma no válida' });
    }

    // Si la dirección está registrada y la firma es válida, generar un token de sesión
    const token = `token-${address}-${Date.now()}`;
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error al verificar la firma:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
