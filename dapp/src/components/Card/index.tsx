export interface Props {
  text: string,
  width?: 'full',
  height?: 'lg' | 'md' | 'sm',
}

export default function index({ text, width, height = 'sm' }: Props) {
  return <div className={`flex-grow border border-[#79D5A880] border-solid hover:border-tottom-cuslack flex flex-col justify-center items-center font-IBMPlexMono text-[14px]
      ${width === 'full' && 'w-full'}
      ${height === 'sm' && 'h-[26px]'}
      ${height === 'md' && 'h-[86px]'}
      ${height === 'lg' && 'h-[142px]'}
      bg-[#061417] hover:bg-gradient-to-r hover:from-xc2-a hover:to-xc2-b hover:text-black`}
  >
    {text.split('\n').map(str => <span key={str}>{str}</span>)}
  </div>
}
