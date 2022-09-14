export interface Props {
  text: string,
  left?: boolean,
  fontSize?: string,
}

export default function index({ text, left = false, fontSize = 'lg' }: Props) {
  return <div className={`left ${left ? 'w-[200px]' : ''} font-IBMPlexMonoBold ${fontSize === 'lg' ? 'text-[20px]' : 'text-[16px]'}`}>{text}</div>
}
