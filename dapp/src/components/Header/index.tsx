import { NavLink } from 'umi'

import Button from '../Button/index'

import LogoImg from '@/assets/img/logo.png'

export default function index() {
  const navLinkActiveStyle = {
    borderTop: '4px solid transparent',
    borderBottom: '4px solid white',
  }
  
  return <div className='header w-main py-4 flex justify-between items-center'>
    <NavLink className="left flex items-center cursor-pointer" to="/">
      <img className='logo w-12 h-12' src={LogoImg} alt="logo" />
      <span className='site-name pl-3 text-[32px] text-white font-Audiowide'>SoulCard</span>
    </NavLink>
    <div className="right flex items-center gap-x-8 text-[20px]">
      <NavLink className='!text-white font-IBMPlexMono' to="/editor" activeStyle={navLinkActiveStyle}>Editor</NavLink>
      <NavLink className='!text-white font-IBMPlexMono' to="/about" activeStyle={navLinkActiveStyle}>About us</NavLink>
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
