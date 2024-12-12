import { propsLogo } from '@/types/icon'

export function LogoTalentProtocol ({ width, css }: propsLogo): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height='100%'
      viewBox='0 0 220 220'
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', margin: 'auto', ...css }}
    >
      <g transform="translate(50, 0)"> {/* Mueve el logo 10 unidades a la derecha */}
        <path d="M11.1248 90.8628C15.4528 95.1782 21.2236 97.3359 28.4371 97.3359L102.213 97.3359L93.904 73.6013H35.1697C30.6813 73.6013 28.4371 71.2038 28.4371 66.409L28.4371 8.01778L4.87305 0L4.87305 73.6013C4.87305 80.7936 6.95697 86.5474 11.1248 90.8628Z" fill="#070707"/>
        <path d="M11.1248 209.527C15.4528 213.842 21.2236 216 28.4371 216H102.213L93.904 192.265H35.1697C30.6813 192.265 28.4371 189.868 28.4371 185.073L28.4371 126.682L4.87305 118.664L4.87305 192.265C4.87305 199.458 6.95697 205.212 11.1248 209.527Z" fill="#070707"/>
      </g>
    </svg>
  );
}