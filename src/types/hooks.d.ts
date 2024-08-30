export interface UseFetchOptions {
  method?: string
  headers?: HeadersInit
  body?: BodyInit | null
}

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface ReturnQRCode {
  canvas: MutableRefObject<HTMLCanvasElement | null>
}

export interface PropsUseQRCode {
  type: 'default' | 'custom'
  text: string
  ref: MutableRefObject<HTMLCanvasElement | null>
}
