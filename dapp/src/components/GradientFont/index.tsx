export interface Props {
  text: string;
}
export default function index({ text }: Props) {
  return (
    <span className="bg-gradient-to-r from-xc2-a to-xc2-b bg-clip-text text-transparent font-IBMPlexMonoBold text-[80px]">
      {text}
    </span>
  );
}
