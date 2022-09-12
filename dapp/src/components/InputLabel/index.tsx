import classNames from 'classnames';
export interface Props {
  text: string;
  required?: boolean;
  bold?: boolean;
}
export default function index({ text, required, bold }: Props) {
  return (
    <p
      className={classNames(
        'relative text-[20px] mb-2',
        bold ? 'font-bold' : 'text-[18px]',
      )}
    >
      {text}
      {required ? (
        <span className="ml-1 bg-gradient-to-r from-xc2-a to-xc2-b bg-clip-text text-transparent text-[1px] absolute top-0">
          *
        </span>
      ) : (
        <></>
      )}
    </p>
  );
}
