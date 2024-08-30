import { type PropsUseQRCode, type ReturnQRCode } from '@/types/hooks'
import { useEffect, useRef } from 'react'
import QRCode, { type QRCodeToDataURLOptions } from 'qrcode'

/**
 * @function useQRCode
 * @description Custom hook para generar códigos QR a partir de un texto dado.
 * @param {'default' | 'custom'} type - este valor está asociado a los estilos del código QR (color y color del fondo).
 * @param {string} text - texto que se va a convertir en el código QR.
 * @returns {ReturnQRCode} Objeto que contiene la URL del código QR en formato data:image/png.
 * @example
 * // Cómo utilizar el custom hook useQRCode:
 * import { useQRCode } from '@src/hooks/useQRCode'
 *
 * const { url } = useQRCode({ type: 'custom', text: 'https://example.com' })
 *
 * // Esto genera un código QR para la URL 'https://example.com'
 * // y establece el estado de la variable 'url' con la URL de la imagen del código QR.
 *
 * {url !== '' && <img src={url} alt="Generated QR code" />}
 */
export function useQRCode ({ type, text, ref }: PropsUseQRCode): ReturnQRCode {
  useEffect(() => {
    const color = {
      default: {
        dark: '#000',
        light: '#FFF'
      },
      custom: {
        dark: '#1F8D99',
        light: '#0000'
      }
    }

    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'H',
      color: color[type],
      margin: 2
    }

    const generateQR = async () => {
      if (ref.current) {
        try {
          await QRCode.toCanvas(ref.current, text, opts)
        } catch (err) {
          console.error('Hubo un error al generar el código QR: ', err)
        }
      }
    }

    generateQR()
  }, [ref, text, type])

  return { canvas: ref }
}
