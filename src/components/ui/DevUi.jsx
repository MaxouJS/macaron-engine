export default function DevUi() {
  return (
    <div className='flex items-center justify-center h-full w-full text-xs text-black/25 select-none'>
      <div className='absolute top-0 bg-red-400/25 w-full h-[25vh] px-2 py-1'>Background</div>
      <div className='absolute top-[25vh] bg-yellow-400/25 w-full h-[25vh] px-2 py-1'>Middle ground</div>
      <div className='absolute bottom-[25vh] bg-green-400/0 w-full h-[25vh] px-2 py-1'>Middle ground</div>
      <div className='absolute bottom-0 bg-yellow-400/25 w-full h-[25vh] px-2 py-1'>Foreground</div>
      <div className='absolute top-[25vh] bg-green-400/50 w-full h-px' />
      <div className='absolute bottom-[25vh] bg-green-400/50 w-full h-px' />
      <div className='absolute bg-blue-400/50 h-full w-px' />
      <div className='absolute bg-green-400/50 w-full h-px' />
      <div className='absolute bg-red-400 h-2 w-2' />
      <p className='absolute left-[25vw]'>Horizon Line</p>
      <p className='absolute right-[25vw]'>Horizon Line</p>
    </div>
  )
}
