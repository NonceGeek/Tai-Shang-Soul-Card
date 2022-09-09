import { useState } from 'react'

import Button from '@/components/Button'
import Header from '@/components/Header'
import GradientText from '@/components/GradientText'

import './index.less'

export default function IndexPage() {
  const [showMask, setShowMask] = useState(false)

  const toggleShowMask = () => {
    setShowMask(!showMask)
  }

  const maskBlur = {
    backdropFilter: 'blur(30px)',
  }

  return (
    <div className='page w-full min-h-screen relative bg-black text-white font-IBMPlexMono'>
      <div className="content w-main h-full mx-auto flex flex-col">
        <Header />
        <div className="slogon pt-40 flex flex-col items-end text-[56px] text-white font-bold">
          <span>A <GradientText text='decentralized social' /></span>
          <span>platform in the Web3</span>
          <span>environment</span>
        </div>
        <div className="vision w-full flex justify-end">
          <span className='mt-52 w-1/2 text-right'>We are providing identity verification to help break down social barriers and work to build a new relationship of mutual trust.</span>
        </div>
        <div className="go mt-40 pb-20 flex justify-center" onClick={() => toggleShowMask()}>
          <Button
            colorStyle="green"
            buttonText="Get Started"
            font="IBMPlexMonoBold"
            fontSize="lg"
          />
        </div>
      </div>
      {showMask && (
        <div
          className="mask absolute top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center"
          style={maskBlur}
        >
          <div className="dialog w-[422px] rounded">Hello World!</div>
        </div>
      )}
    </div>
  );
}
