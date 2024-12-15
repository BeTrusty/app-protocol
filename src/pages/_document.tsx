import Script from 'next/script'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src='js/snarkjs.min.js'
          strategy='beforeInteractive'
          onLoad={() => {
            console.log('snarkjs.min.js loaded')
          }}
        />
      </body>
    </Html>
  )
}
