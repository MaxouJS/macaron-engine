export default function DevUi() {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div className='absolute top-0 bg-red-400/25 w-full h-[25vh]' />
      <div className='absolute mid-0 bg-green-400/25 w-full h-[50vh]' />
      <div className='absolute bottom-0 bg-red-400/25 w-full h-[25vh]' />
      <div className='absolute bg-blue-400/50 h-full w-px' />
      <div className='absolute bg-green-400/50 w-full h-px' />
      <div className='absolute bg-red-400 h-1 w-1' />
    </div>
  )
}
