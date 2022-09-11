import { useState } from 'react'

import Header from '@/components/Header'
import Title from '@/components/Title'
import GradientLine from '@/components/GradientLine'
import Card from '@/components/Card'

export default function AboutPage() {
  return (
    <div className='w-full min-h-screen bg-black text-white font-IBMPlexMono'>
      <div className="content w-main h-full mx-auto flex flex-col">
        <Header />
        <div className="techstack mt-12 pb-24">
          <div className="title font-IBMPlexMonoBold text-[24px]">Web 3.0 Technology Stack</div>
          <div className='mt-6 flex items-center'>
            <Title text="Application" left={true} />
            <div className="flex-grow flex items-center border-solid border border-white/50 p-4 gap-x-4">
              <div className="flex-grow flex flex-col items-center">
                <Title text='SoulCard' fontSize={16} />
                <GradientLine />
                <div className="w-full mt-2 flex justify-between items-center gap-x-4">
                  <Card text={'SoulCard\nEditor'} height='md' />
                  <Card text={'ChainHandler\nPreview SoulCard<->IPFS<->SBT'} height='md' />
                  <Card text={'Relationship\nHandler'} height='md' />
                  <Card text={'UserApp\nCreator'} height='md' />
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center">
                <Title text='TaiShang Portal' fontSize={16} />
                <GradientLine />
                <div className="w-full mt-2 flex flex-col justify-between items-center gap-y-1">
                  <Card text={'NFT Gallery'} width='full' height='sm' />
                  <Card text={'Explorer'} width='full' height='sm' />
                  <Card text={'App List'} width='full' height='sm' />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center'>
            <Title text="Backend" left={true} />
            <div className="flex-grow border-solid border border-white/50 p-4">
              <div className="w-full flex flex-col justify-between items-center gap-y-2">
                <Card text={'Data Gateway'} width='full' height='sm' />
                <div className='w-full flex justify-between items-center gap-x-4'>
                  <Card text={'DAO Profile Manager'} height='md' />
                  <Card text={'Individual Profile Manager'} height='md' />
                  <Card text={'GitHub Analyzer'} height='md' />
                  <Card text={'Relationship Handler'} height='md' />
                </div>
                <Card text={'TaiShang Micro FaaS System ( Infrastructure )'} width='full' height='sm' />
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center'>
            <Title text="Contracts" left={true} />
            <div className="flex-grow flex items-center border-solid border border-white/50 p-4 gap-x-4">
              <div className="w-2/3 flex flex-col justify-between items-center gap-y-2">
                <Title text='Universal DID Solution' fontSize={16} />
                <GradientLine />
                <div className="w-full flex gap-x-4">
                  <div className='w-full flex flex-col justify-between items-center gap-y-2'>
                    <Title text='TaiShang Portal' fontSize={16} />
                    <GradientLine />
                    <Card text={'Addresses Verified'} width='full' height='sm' />
                    <Card text={'Addresses Unverified'} width='full' height='sm' />
                  </div>
                  <div className='w-full flex flex-col justify-between items-center gap-y-2'>
                    <Title text='Endpoint Aggregator' fontSize={16} />
                    <GradientLine />
                    <Card text={'Formal Endpoints'} width='full' height='sm' />
                    <Card text={'Informal Endpoints'} width='full' height='sm' />
                  </div>
                </div>
              </div>
              <Card text='SBT Compatible with ERC 721' height='lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
