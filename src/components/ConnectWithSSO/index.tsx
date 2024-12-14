import React from "react";
import { Button } from "@nextui-org/react";
import { connect } from "@wagmi/core";
import { config, ssoConnector } from "../../../zkSyncConfig";
import { zksyncSepoliaTestnet } from "viem/chains";

const ConnectWithSSO: React.FC = () => {
   const handleConnect = async () => {
       try {
          const connection = await connect(config, {
             connector: ssoConnector,
             chainId: 1,
          });
          console.log("Conexión exitosa:", connection);
          console.log(`Sesión iniciada con dirección: ${connection.accounts[0]}`);
       } catch (error) {
          console.error("Error al conectar con zkSync SSO:", error);
          console.log("Error al iniciar sesión con zkSync SSO.");
       }
    };

   return (
        <Button
        color="primary"
        radius="full"
        className="w-full max-w-[260px] mt-4"
        onClick={handleConnect}
    >
        Iniciar sesión con zkSync SSO
    </Button>
   );
};

export default ConnectWithSSO;
