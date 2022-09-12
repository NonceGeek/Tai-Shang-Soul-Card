import React, {useEffect, useState} from 'react';
import './index.less'

import address from './mock/address.svg'
import location from './mock/location.svg'
import sign from './mock/sign.svg'
import wechat from './mock/wechat.svg'
import mirror_link from './mock/miro.svg'
import github_link from './mock/telegram.svg'
import discord from './mock/discord.svg'
import twitter from './mock/twitter.svg'
import circle from './mock/right-circle-arrow.svg'
import c from './mock/c.svg'
import m from './mock/m.svg'
import dao_avator from './mock/dao_avator.png'


const addr = localStorage.getItem('addr')


const Card = (props) => {
  const coreMember = props.data.members.filter((item) => {
    return item.is_core_member === true
  })
  const normalMember = props.data.members.filter((item) => {
    return item.is_core_member === false
  })
  const allMembers = props.data.members.length
  const [cardData, setCardData] = useState(
    {
      name: 'Dao Name',
      dao_link: 'https://noncegeek.com/#/',
      contract_address: 'contract address',
      description: 'Our team is working on a decentralized social product in the Web3 environment.',
      introduction: 'Have more than 6 years of Digital Product Design experience.',
      social_links: {
        twitter: "https://twitter.com/Web3dAppCamp",
        mirror_link: "https://mirror.xyz/apecoder.eth",
        github_link: "https://github.com/WeLightProject",
        wechat: "197626581",
        discord: "hitchhacker@3691"
      },
      location: 'California',
      skills: ['Javascript', 'C++', 'Python', 'HTML', 'Node', 'C#', 'Java', 'Javascript', 'C++', 'Python', 'HTML', 'Node', 'C#', 'Java'],
      awesome_things: [],
      members: [],
      partner: []
    }
  )
  useEffect(() => {
    setCardData(props.data)
  }, [props.data])
  return (
    <div className='card-container-dao text-white'>
      <div className='text-imb-bold ft-s-64 line-height-one'>{cardData.name}</div>
      <div className='flex'>
        <img src={address} alt="" />
        <span className='ml-10 ft-s-14 bg-grey text-gray addr word-break'>{addr}</span>
      </div>
      <div className='inside text-ibm mt-8'>
        <div className='basic-info general-border'>
          <img src={dao_avator} alt="" />
        </div>
        <div className='contact general-border'>
          {cardData.social_links.discord ? <img className='mr-15' src={discord} alt="" /> : <span></span>}
          {cardData.social_links.github_link ? <img className='mr-15' src={github_link} alt="" /> : <span></span>}
          {cardData.social_links.wechat ? <img className='mr-15' src={wechat} alt="" /> : <span></span>}
          {cardData.social_links.twitter ? <img className='mr-15' src={twitter} alt="" /> : <span></span>}
          {cardData.social_links.mirror_link ? <img className='mr-15' src={mirror_link} alt="" /> : <span></span>}
          <div className='ft-s-12' style={{marginTop: '4px'}}>{cardData.dao_link}</div>
        </div>
        <div className='contract general-border' style={{paddingLeft: '14px'}}>
          <img src={sign} alt="" />
          <span className='ml-4 contract-address'>{cardData.contract_address}</span>
        </div>
        <div className='location general-border'>
          <div><img src={location} alt="" /></div>
          <div>{cardData.location}</div>
        </div>
        <div className='des general-border ft-s-14 pt-26 pl-16'>
          {cardData.description}
        </div>
      </div>
      <div className='awsome-things general-border mt-8'>
        <div className='awsome-things-title ft-s-16 fw-700 text-ibm-bold'>Awesome Things</div>
        {cardData.awesome_things.map((item) => {
          return <div className='border-t p-8 fw-700 text-ibm ft-s-12 flex' key={item.project}>
            <div>{item.project}</div>
            <div className='circle-button pointer'><img src={circle} alt="" /></div>
          </div>
        })}
      </div>
      <div className='awsome-things general-border mt-8'>
        <div className='awsome-things-title ft-s-16 fw-700 text-ibm-bold border-b'>DAO/Organization</div>
        <div className='c-icon flex m-8'>
            <img src={c} alt="" />
          </div>
        <div className='dao-list'>
          {coreMember.map((item, index) => {
            return <div className='flex pt-4 pl-8 mb-15' key={index}>
              <div><img src={require(`./mock/${item.avator}.png`)} alt="" /></div>
              <div className='ml-10'>
                <div className='dao-name ft-s-14 ft-700 mb-5 line-height-one text-ibm-bold word-break'>{item.name}</div>
                {item.is_core_member ? <div className='flex position text-ibm'>
                 <span className='word-break'>{item.position}</span>
                </div> : ''}
              </div>
            </div>
          })}
        </div>
        <div className='' style={{borderTop: '.5px solid #ffffff'}}>
            <div className='m-icon m-8'><img src={m} alt="" /></div>
            <div className='relative normal-container flex pl-8'>
              {normalMember.splice(0, 4).map((item, index) => {
                return <div className='absolute member-ele' style={{left: `${index * 25 + 8}px`}} key={index}>
                  <img src={require(`./mock/${item.avator}.png`)} alt="" />
                </div>
              })}
              <div className='ml-150'>{allMembers} &nbsp;members</div>
            </div>
        </div>
      </div>
      <div className='awsome-things general-border mt-8'>
        <div className='awsome-things-title ft-s-16 fw-700 text-ibm-bold'>Partner</div>
        <div className='partner'>
          {cardData.partner.map((item, index) => {
            return <div className='flex border-t p-8 dao-ele' key={index}>
              <img src={require(`./mock/${item.avator}.png`)} alt="" />
              <span className='ml-10 text-ibm-bold'>{item.name}</span>
            </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
