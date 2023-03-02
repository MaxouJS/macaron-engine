export default function DevUi() {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div className='absolute bg-blue-400/50 h-full w-px' />
      <div className='absolute bg-green-400/50 w-full h-px' />
      <div className='absolute bg-red-400 h-1 w-1' />
    </div>
  )
}
