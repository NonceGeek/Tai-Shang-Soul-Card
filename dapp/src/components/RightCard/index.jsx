import React, {useEffect, useState} from 'react';
import './index.less'
import styles from './module.less'

import address from './mock/address.svg'
import location from './mock/location.svg'
import avator from './mock/avator.png'
import wechat from './mock/wechat.svg'
import mirror_link from './mock/miro.svg'
import github_link from './mock/telegram.svg'
import discord from './mock/discord.svg'
import twitter from './mock/twitter.svg'
import circle from './mock/right-circle-arrow.svg'
import c from './mock/c.svg'
import CloseIcon from '@/assets/img/close-icon.png'
import share from './mock/share.svg'

const addr = localStorage.getItem('addr')

const Card = (props) => {
  const [state, setState] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [cardData, setCardData] = useState(
    {
      name: 'Robert Fox',
      avator: '',
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
      project_whitelist: [],
      organization: []
    }
  )
  const handleShareclick = () => {
    setShowPopover(false)
    setState(true)
  }
  useEffect(() => {
    setCardData(props.data)
    console.log(props.data)
  }, [props.data])
  return (
    <div className='card-container text-white relative'>
      {showPopover ? <div className='absolute p-[20px] popover text-ibm pointer'>
        <div className='options ft-s-14 mb-[8px]' onClick={() => handleShareclick()}>Share Soul Card</div>
        <div className='options ft-s-14 mb-[8px]' onClick={() => setShowPopover(false)}>Mint NFT</div>
        <div className='options ft-s-14' onClick={() => setShowPopover(false)}>Export to Gist</div>
      </div> : ''}
      <div className='sub-header text-white mt-[20px] grid'>
        <div>Preview</div>
        <div className='text-right pointer' onClick={() => setShowPopover(!showPopover)}><img src={share} alt="" /></div>
      </div>
      <div className='card-padding'>
        <div className='inside text-ibm'>
          <div className='basic-info general-border'>
            <div className='ft-s-24 text-ibm-bold'>{cardData.name}</div>
            <div className='flex'>
              <img src={address} alt="" />
              <span className='ml-[10px] ft-s-14 bg-grey text-gray addr'>{addr}</span>
            </div>
            <div className='intro mt-[5px] text-blur-white'>{cardData.introduction}</div>
          </div>
          <div className='location general-border'>
            <div><img src={location} alt="" /></div>
            <div>{cardData.location}</div>
          </div>
          <div className='skills general-border'>
            <div className='ft-s-16 text-ibm-bold'>Skills</div>
            <div className='skills-list'>
              {cardData.skills.map((item) => {
                return <div className='list-item bg-white mr-[5] ft-s-10 mb-[5px] general-border'>{item}</div>
              })}
            </div>
          </div>
          <div className='avator general-border'>
            <img src={avator} alt="" />
          </div>
          <div className='contact general-border'>
            {cardData.social_links.discord ? <img className='mr-[15px]' src={discord} alt="" /> : <span></span>}
            {cardData.social_links.github_link ? <img className='mr-[15px]' src={github_link} alt="" /> : <span></span>}
            {cardData.social_links.wechat ? <img className='mr-[15px]' src={wechat} alt="" /> : <span></span>}
            {cardData.social_links.twitter ? <img className='mr-[15px]' src={twitter} alt="" /> : <span></span>}
            {cardData.social_links.mirror_link ? <img className='mr-[15px]' src={mirror_link} alt="" /> : <span></span>}
          </div>
        </div>
        <div className='awsome-things general-border mt-[8px]'>
          <div className='awsome-things-title ft-s-16 fw-700 text-ibm-bold'>Awesome Things</div>
          {cardData.awesome_things.map((item) => {
            return <div className='border-t p-[8px] fw-700 text-ibm ft-s-12 flex'>
              <div>{item.project}</div>
              <div className='circle-button pointer'><img src={circle} alt="" /></div>
            </div>
          })}
        </div>
        <div className='awsome-things general-border mt-[8px] pb-[20px]'>
          <div className='awsome-things-title ft-s-16 fw-700 border-b text-ibm-bold'>Project Whitelist</div>
          <div className='p-[8px]'>
            {cardData.project_whitelist.map((item) => {
              return <div className='project-item pointer mr-[8px] ft-s-12 text-ibm'>
                {item.project}
              </div>
            })}
          </div>
        </div>
        <div className='awsome-things general-border mt-[8px]'>
          <div className='awsome-things-title ft-s-16 fw-700 text-ibm-bold'>DAO/Organization</div>
          <div className='dao-list'>
            {cardData.organization.map((item) => {
              return <div className='flex border-t pt-[4px] pl-[4px]'>
                <div><img src={require(`./mock/temp-${item.avator}.png`)} alt="" /></div>
                <div className=''>
                  <div className='dao-name ft-s-24 ft-700 mb-[10px] text-ibm-bold'>{item.name}</div>
                  {item.is_core_member ? <div className='flex position text-ibm'>
                    <div className='c-icon flex mr-[8px]'>
                      <img src={c} alt="" />
                    </div>
                    <span>{item.position}</span>
                  </div> : ''}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className={styles.root}>
          <div className={`container p-4 ${state ? 'active' : ''}`} onClick={() => setState(!state)}>
            <div className="Popup text-ibm-bold">
              <div className='bg-black inside-container p-[16px]'>
                <div className="close-icon w-full flex justify-end items-center">
                    <img className='w-3 h-3 cursor-pointer' onClick={() => setState(!state)} src={CloseIcon} alt="close" />
                </div>
                <div className='text-white text-center mt-[10px] mb-[51px]'>WHICH FOTMATE DO YOU PREFER?</div>
                <div>
                <div className='options ft-s-16 pointer' onClick={() => handleShareclick()}>Share Soul Card</div>
                <div className='options ft-s-16 pointer' onClick={() => setShowPopover(false)}>Mint NFT</div>
                <div className='options ft-s-16 pointer' onClick={() => setShowPopover(false)}>Export to Gist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;
