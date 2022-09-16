import { NavLink } from 'umi'

import { useConnect, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import classNames from 'classnames'

import { showAccount } from '@/utils/funUtils'

import Button from '../Button/index'

import LogoImg from '@/assets/img/logo.png'
import IconEth from '@/assets/img/icon-eth.png'
import IconVenaChain from '@/assets/img/icon-venachain.png'
import IconSelect from '@/assets/img/icon-select.png'
import IconCircle from '@/assets/img/icon-circle.png'

export default function index() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  const availableChains = [
    {
      id: 1,
      name: 'Ethereum',
      logo: IconEth,
    },
    {
      id: 300,
      name: 'VenaChain',
      logo: IconVenaChain,
    },
  ]

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const onSwitchNetwork = (id: number) => {
    if (id === chain?.id) {
      return
    }

    switchNetwork?.(id)
  }

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
        <>
          <Button
            colorStyle='white'
            buttonText='Connect'
            withSpace={false}
            onClick={() => connect()}
          />
          <Button
            colorStyle='green'
            buttonText='Sign up'
            withSpace={false}
          />
        </>
      )}
      {address && (
        <div className='user flex items-center font-Inter text-[14px]'>
          <div className="network h-8 rounded bg-[#333333] flex items-center relative cursor-pointer">
            <div className='peer px-4 py-2 flex items-center gap-x-2'>
              <div className="icon w-5 h-5 rounded-full bg-white flex justify-center items-center">
                <img className='w-3.5 h-3.5' src={availableChains.find(theChain => theChain.id === chain?.id)?.logo} alt="" />
              </div>
              <span className='text-white'>{availableChains.find(theChain => theChain.id === chain?.id)?.name}</span>
              <img className='w-[11px]' src={IconSelect} alt="" />
            </div>
            <div className="hidden peer-hover:block hover:block absolute z-10 top-8 w-[176px] pt-3">
              <div className='flex flex-col items-start rounded px-4 py-2 pb-4 bg-[#333333] text-white'>
                <span className='mb-2 text-gray-300'>选择网络</span>
                {availableChains.map(theChain => (<div
                  className={classNames(
                    'my-0.5 flex items-center px-4 py-2 gap-x-2',
                    theChain.id === chain?.id ? 'w-full bg-[#282828] rounded' : '',
                  )}
                  key={theChain.id}
                  onClick={() => onSwitchNetwork(theChain.id)}
                >
                  <div className="icon w-5 h-5 rounded-full bg-white flex justify-center items-center">
                    <img className='w-3.5 h-3.5' src={theChain.logo} alt="" />
                  </div>
                  <span className=''>{theChain.name}</span>
                </div>))}
              </div>
            </div>
          </div>
          <div className="account h-8 ml-2 rounded px-4 py-2 bg-[#333333] flex items-center">
            <span className=' text-white'>{showAccount(address)}</span>
            <img className='ml-2 w-4 h-4' src={IconCircle} alt="" />
          </div>
        </div>
      )}
    </div>
  </div>
}
