export interface Props {
  text: string,
  left?: boolean,
  fontSize?: number,
}

export default function index({ text, left = false, fontSize = 20 }: Props) {
  return <div className={`left ${left ? 'w-[200px]' : ''} font-IBMPlexMonoBold text-[${fontSize}px]`}>{text}</div>
}
