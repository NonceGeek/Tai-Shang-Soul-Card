import { NavLink } from 'umi'

import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { showAccount } from '@/utils/funUtils'

import Button from '../Button/index'

import LogoImg from '@/assets/img/logo.png'
import IconEth from '@/assets/img/icon-eth.png'
import IconSelect from '@/assets/img/icon-select.png'
import IconCircle from '@/assets/img/icon-circle.png'

const styleDropShadow = {
  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, .8))',
}

export default function index() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

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
      {address && (
        <NavLink
          className='!text-white font-IBMPlexMono'
          to="/editor"
          activeStyle={navLinkActiveStyle}>
          Editor
        </NavLink>
      )}
      <NavLink
        className='!text-white font-IBMPlexMono'
        to="/about"
        activeStyle={navLinkActiveStyle}>
        About us
      </NavLink>
      {!address && (
        <Button
          colorStyle='white'
          buttonText='Connect'
          withSpace={false}
          onClick={() => connect()}
        />
      )}
      {address && (
        <div className='user rounded p-1 pl-3 bg-[#333333] flex items-center cursor-pointer'>
          <div className="network flex items-center gap-x-2">
            <div className="icon w-6 h-6 rounded-full bg-white flex justify-center items-center">
              <img className='w-5 h-5' src={IconEth} alt="" />
            </div>
            <span className='font-Inter text-[20px] text-white'>Ethereum</span>
            <img className='w-[11px]' src={IconSelect} alt="" />
          </div>
          <div className="account ml-6 rounded px-4 py-2 bg-[#333333] flex items-center"
          style={styleDropShadow}>
            <span className='font-Inter text-[14px] text-white'>{showAccount(address)}</span>
            <img className='ml-2 w-4 h-4' src={IconCircle} alt="" />
          </div>
        </div>
      )}
      <Button
        colorStyle='green'
        buttonText='Sign up'
        withSpace={false}
      />
    </div>
  </div>
}
