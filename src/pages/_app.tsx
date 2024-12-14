import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/context";
import { NextUIProvider } from "@nextui-org/react";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="js/snarkjs.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("snarkjs.min.js loaded");
        }}
      />
      <Provider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </Provider>
    </>
  );
}
