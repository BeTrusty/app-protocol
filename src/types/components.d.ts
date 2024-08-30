export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

export interface PropsSelectDataProvider {
  id: string
  text: string
  icon: JSX.Element
  isAvailable: boolean
  onClick: () => void
}
