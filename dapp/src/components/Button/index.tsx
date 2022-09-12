export interface Props {
  colorStyle: 'white' | 'green';
  buttonText: string;
  wide?: boolean;
  font?: string;
  fontSize?: 'lg';
  style?: object;
  onClick?: () => void;
}

export default function index(props: Props) {
  const {
    colorStyle,
    buttonText,
    wide,
    fontSize,
    font = 'Inter',
    style,
  } = props;
  const handleClick = (e: any) => {
    const { onClick } = props;
    onClick && onClick();
  };
  return (
    <span
      onClick={handleClick}
      style={style}
      className={`px-6 py-2 rounded cursor-pointer font-bold mr-4 mb-4
      ${wide && 'px-0 w-52 inline-block text-center'}
      ${colorStyle === 'white' && 'border border-solid border-white text-white'}
      ${
        colorStyle === 'green' &&
        'bg-gradient-to-r from-xc2-a to-xc2-b text-black'
      }
      ${!fontSize && 'text-[20px]'}
      ${fontSize === 'lg' && 'text-[24px]'}
      ${`font-${font}`}`}
    >
      {buttonText}
    </span>
  );
}
