import type { NextApiRequest, NextApiResponse } from 'next';
import { API_CREATE_SIGNATURE } from '@/constants/url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, lastName, dni, publicKey } = req.body;

  try {
    const response = await fetch(API_CREATE_SIGNATURE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: process.env.API_KEY_AUTOPEN,
        personalInfo: {
          name: `${name} ${lastName}`,
          dni: `${dni}`
        },
        biometricProof: {
          provider: "jumio",
          verificationId: "verification-uuid"
        },
        publicKey: publicKey
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ message: errorMessage });
  }
}