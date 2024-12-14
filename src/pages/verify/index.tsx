"use client";
import InputField from "./components/input-field";
import { useEffect, useState } from "react";
import { createPublicClient, getContract, http } from "viem";
import { zksyncSepoliaTestnet } from "viem/chains";

declare global {
  interface Window {
    snarkjs: any;
  }
}

export default function Page() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [threshold, setthreshold] = useState("");

  const publicClient = createPublicClient({
    chain: zksyncSepoliaTestnet,
    transport: http(),
  });

  useEffect(() => {
    const generateProof = async () => {
      if (typeof window !== "undefined" && window.snarkjs) {
        const snarkjs = window.snarkjs;
        console.log("snarkjs is loaded mafren");
      } else {
        console.error("snarkjs is not loaded");
      }
    };

    generateProof();
  }, []);


  const MY_CONTRACT_ADDRESS = "0x1b8f823ed41Bd01851B6f9Fcc1D66517458885B5";
  const MY_CONTRACT_ABI_PATH = [
    {
      inputs: [
        {
          internalType: "uint256[2]",
          name: "_pA",
          type: "uint256[2]",
        },
        {
          internalType: "uint256[2][2]",
          name: "_pB",
          type: "uint256[2][2]",
        },
        {
          internalType: "uint256[2]",
          name: "_pC",
          type: "uint256[2]",
        },
        {
          internalType: "uint256[1]",
          name: "_pubSignals",
          type: "uint256[1]",
        },
      ],
      name: "verifyProof",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const sendProof = async () => {
    let resultOfProof = false;
    let proofAux, publicSignalsAux;

    try {
      if (typeof window.snarkjs === "undefined") {
        throw new Error("snarkjs is not loaded");
      }

      const snarkjs = window.snarkjs;

      console.log("snarkjs is loaded");

      /**
       * LOS PASOS A SEGUIR SON:
       * 1. QUE EL CLIENTE FIRME UN MENSAJE, EL QUE SEA
       * PARA SABER QUE EL MANEJA LA CUENTA
       * 2. LUEGO OBTENEMOS EL BALANCE DE LA CUENTA
       * SEGÚN EL TOKEN QUE CORRESPONDA,
       * MÁS ARRIBA SE INICIALIZA EL CLIENTE DE VIEM Y EL CONTRATO VERIFIER
       * SIGUIENDO EL MISMO EJEMPLO SE INSTANCIA EL DE USDT POR EJEMPLO Y SE CONSULTA EL SALDO
       * 3. OBTENER EL BALANCE DEL CLIENTE Y ENVIAR ESE BALANCE A LA GENERACIÓN DE LA PRUEBA
       * NOTA: TODO ESTO SE HACE DESDE EL LADO DEL CLIENTE POR LO QUE SOLO EL CLIENTE CONOCE SU WALLET
       * Y SOLO EL CLIENTE CONOCE SU BALANCE Y PUEDE GENERAR LA PRUEBA, SI SE PREGUNTAN COMO
       * LAS PERSONAS ESTARÁN SEGURAS DE ESTO, ES QUE SI EN CUALQUIER MOMENTO HACEMOS UNA PETICIÓNM
       * AL BACK-END SE ENVÍA UNA PETICIÓN HTTP Y SABRÍAN INMEDIATAMENTE SI HACEMOS ALGO CON ESOS DATOS
       */

      // Generar prueba con snarkjs
      // Si esto falla, quiere decir que treshold es menor que amount y cae al try-catch
      // entonces el cliente no tiene un saldo mayor a lo que se requiere
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        // Aqui era threshold pero se me fue en el artifact :(
        // treshold = será el monto con el que quieren comparar el balance
        { balance: amount, treshold: threshold },
        "/artifacts/balance.wasm",
        "/artifacts/balance_0001.zkey"
      );

      proofAux = proof;
      publicSignalsAux = publicSignals;

      const contract = getContract({
        address: MY_CONTRACT_ADDRESS,
        abi: MY_CONTRACT_ABI_PATH,
        client: publicClient,
      });
      // Preparar parámetros para el contrato
      let pA = proofAux.pi_a
      pA.pop()
      let pB = proofAux.pi_b
      pB.pop()
      let pC = proofAux.pi_c
      pC.pop()

      console.log("pA", pA);
      console.log("pB", pB);
      console.log("pC", pC);
      console.log("publicSignalsAux", publicSignalsAux);

      // Llamar al contrato con los datos
      const result = await contract.read.verifyProof([
        pA,
        pB,
        pC,
        publicSignalsAux,
      ]);

      console.log("Verification result:", result);
      resultOfProof = true;
    } catch (error) {
      console.error("Error:", error);
      // esto es redundante solo lo dejo por claridad
      resultOfProof = false;
    } finally {
      return resultOfProof;
    }
  };

  return (
    <div className="w-full bg-gray-600 flex flex-col items-center justify-center gap-4 p-10">
      <h1>ZPK - Verify </h1>
      <InputField
        placeholder="Enter address"
        value={address}
        onChange={(e) => {
          console.log(e.target.value);
          setAddress(e.target.value);
        }}
      />
      <InputField
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => {
          console.log(e.target.value);
          setAmount(e.target.value);
        }}
      />
      <InputField
        placeholder="Enter threshold"
        value={threshold}
        onChange={(e) => {
          console.log(e.target.value);
          setthreshold(e.target.value);
        }}
      />
      <input
        type="button"
        value="Verify"
        className="bg-black text-white rounded-lg py-1.5 w-[250px]"
        onClick={() => sendProof()}
      />
    </div>
  );
}
