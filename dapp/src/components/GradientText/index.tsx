import './index.less'

export interface Props {
  text: string;
}

export default function index({ text }: Props) {
  return <span className={`gradient-text bg-gradient-to-r from-xc2-a to-xc2-b font-IBMPlexMonoBold font-bold text-[60pxc]`}>
    {text}
  </span>
}
