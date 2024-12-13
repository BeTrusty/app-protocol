import { PropsSelectDataProvider } from '@/types/components'
import { memo, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export const SelectDataProvider = memo(function PaymentMethod ({
  id,
  text,
  icon,
  isAvailable,
  onClick
}: PropsSelectDataProvider): JSX.Element {
  const [select, setSelect] = useState<boolean>(false)

  const onSelected = (): void => {
    setSelect(!select)
    onClick()
  }

  if (isAvailable) {
    return (
      <div
        id={id}
        className={`flex flex-row justify-start items-center w-full p-4 rounded-xl cursor-pointer hover:bg-secondary-hover dark:hover:bg-primary-hover gap-3 h-auto border-2 border-light-border hover:border-secondary-hover dark:border-dark-border dark:hover:border-primary-hover relative ${
          select
            ? 'bg-white dark:bg-secundary-dark border-secondary dark:border-primary'
            : ''
        }`}
        onClick={onSelected}
      >
        {select && (
          <span className='absolute -top-1 -right-1 text-secondary'>
            <BsFillCheckCircleFill size={20} />
          </span>
        )}
        <span className='min-w-fit'>{icon}</span>
        <p className='text-lg font-bold w-full mb-0'>{text}</p>
      </div>
    )
  }

  return (
    <div
      id={id}
      className='flex flex-row justify-start items-center w-full p-4 rounded-xl cursor-not-allowed bg-bg-hover text-bg-hover dark:hover:bg-bg-dark-hover gap-3 h-auto border-2 border-light-border dark:border-dark-border relative animate-pulse'
      onClick={() => null}
    >
      <span className='min-w-fit opacity-35'>{icon}</span>
      <p className='text-lg font-bold w-full mb-0'>{text}</p>
    </div>
  )
})
