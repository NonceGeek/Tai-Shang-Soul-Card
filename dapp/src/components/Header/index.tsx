import Button from '../Button/index'

import LogoImg from '@/assets/img/logo.png'

export default function index() {
  return <div className='header w-main py-4 flex justify-between items-center'>
    <div className="left flex items-center">
      <img className='logo w-12 h-12' src={LogoImg} alt="logo" />
      <span className='site-name pl-3 text-[32px] text-white font-Audiowide'>SoulCard</span>
    </div>
    <div className="right flex items-center gap-x-8 text-[20px]">
      <a className='!text-white' href="">Home</a>
      <a className='!text-white' href="">About us</a>
      <Button
        colorStyle='white'
        buttonText='Log in'
        withSpace={false}
      />
      <Button
        colorStyle='green'
        buttonText='Sign up'
        withSpace={false}
      />
    </div>
  </div>
}
