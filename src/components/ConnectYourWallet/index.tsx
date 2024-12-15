import { useState } from 'react';
import { Button } from '@nextui-org/react'; 
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';

const ConnectWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log('Instala una wallet compatible con zkSync para continuar');
        return;
      }
      const provider = new Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []); // Solicita acceso a la wallet
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      console.log(`Wallet conectada: ${address}`);

      // Genera y firma el mensaje
      const message = `Inicio de sesión para zkSync SSO con la dirección ${address}`;
      const signature = await signer.signMessage(message);

      // Ahora que la firma es generada, enviamos los datos al backend
      setLoading(true); // Indicamos que estamos enviando la solicitud

      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature }),
      });

      setLoading(false); // Finalizamos el proceso de carga

      if (response.ok) {
        const data = await response.json();
        console.log('Token recibido:', data.token);
        console.log('Autenticación exitosa');

        // Redirige al usuario a la ruta /connect
        router.push('/connect');

      } else {
        alert('Error al autenticar');
      }
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
      console.log('Hubo un error al conectar la wallet. Intenta nuevamente.');
    }
  };

  return (
    <Button
      color="primary"
      radius="full"
      className="w-full max-w-[260px] mt-4"
      onClick={connectWallet}
      disabled={loading}
    >
      {walletAddress ? 'Wallet Conectada' : 'Conectar zkSync con Wallet'}
    </Button>
  );
};

export default ConnectWallet;
