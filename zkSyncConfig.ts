import { zksyncSsoConnector, callPolicy } from "zksync-sso/connector";
import { zksyncSepoliaTestnet } from "viem/chains";
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { parseEther } from "ethers";

// Configuración del conector de zkSync SSO
export const ssoConnector = zksyncSsoConnector({
  session: {
    expiry: "1 day", // Duración de la sesión
    feeLimit: parseEther("0.1"), // Límite de fees para la sesión
    transfers: [
      {
        to: "0x188bd99cd7D4d78d4E605Aeea12C17B32CC3135A", // Dirección de destino permitida
        valueLimit: parseEther("0.1"), // Límite de transferencia por transacción
      },
    ],
    contractCalls: [
      callPolicy({
        address: "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044", // Dirección del contrato
        abi: [
          {
            constant: false,
            inputs: [
              { name: "_to", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "transfer",
        constraints: [],
      }),
    ],
  },
});

// Configuración de wagmi
export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http('https://mainnet.example.com'),
      [sepolia.id]: http('https://sepolia.example.com'),
    },
  })

function localParseEther(arg0: string): import("zksync-sso/client-auth-server").PartialLimit | undefined {
    throw new Error("Function not implemented.");
}

