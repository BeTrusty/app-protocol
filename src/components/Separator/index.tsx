export function Separator ({
  text,
  icon
}: {
  text?: string
  icon?: JSX.Element
}): JSX.Element {
  return (
    <div className='flex flex-row justify-center items-center gap-0 w-full'>
      <span className='w-full border-[1px] border-semi-transparent-black dark:border-semi-transparent-white' />
      {icon && <span className='mx-3'>{icon}</span>}
      {text && (
        <span className='mx-3 text-lg font-bold text-light-grey'>{text}</span>
      )}
      <span className='w-full border-[1px] border-semi-transparent-black dark:border-semi-transparent-white' />
    </div>
  )
}
