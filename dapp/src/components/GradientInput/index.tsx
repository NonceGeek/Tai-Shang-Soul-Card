import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ok from '@/assets/img/input.png';

export interface Props {
  value: string;
  placeholder?: string;
  width?: 'lg' | 'md';
  label?: string;
  onChange?: (value: string) => void;
}
export default function index(props: Props) {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [width, setWidth] = useState('lg');
  const [label, setLabel] = useState('');
  useEffect(() => {
    setValue(props.value);
    if (props.placeholder) {
      setPlaceholder(props.placeholder);
    }
    if (props.width) {
      setWidth(props.width);
    }
    if (props.label) {
      setLabel(props.label);
    }
  }, [props]);
  const handleChange = (e: any) => {
    const { onChange } = props;
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  return (
    <>
      <div className="flex items-center mb-2">
        {width === 'md' ? (
          <label className="text-[14px] inline-block w-28">
            {label ? label : ''}
          </label>
        ) : (
          <></>
        )}

        <input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          className={classNames(
            'rounded border border-[#4D6138] border-solid bg-[#071518] outline-none pl-3 h-[28px] placeholder-[#4F595B]',
            width === 'md' ? 'w-[311px]' : 'w-[442px]',
          )}
        />
        {value.replace(' ', '') !== '' ? (
          <img src={ok} alt="" className="w-6 mx-4" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
