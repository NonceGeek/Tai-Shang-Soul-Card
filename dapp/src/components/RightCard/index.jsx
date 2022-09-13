import React, { useEffect, useState } from 'react';
import './index.less';

import address from './mock/address.svg';
import location from './mock/location.svg';
import avatar from './mock/avatar.png';
import wechat from './mock/wechat.svg';
import mirror_link from './mock/miro.svg';
import github_link from './mock/telegram.svg';
import discord from './mock/discord.svg';
import twitter from './mock/twitter.svg';
import circle from './mock/right-circle-arrow.svg';
import c from './mock/c.svg';

const addr = localStorage.getItem('addr');

const Card = (props) => {
  const [cardData, setCardData] = useState({
    name: 'Robert Fox',
    avatar: '',
    introduction:
      'Have more than 6 years of Digital Product Design experience.',
    social_links: {
      twitter: 'https://twitter.com/Web3dAppCamp',
      mirror_link: 'https://mirror.xyz/apecoder.eth',
      github_link: 'https://github.com/WeLightProject',
      wechat: '197626581',
      discord: 'hitchhacker@3691',
    },
    location: 'California',
    skills: [
      'Javascript',
      'C++',
      'Python',
      'HTML',
      'Node',
      'C#',
      'Java',
      'Javascript',
      'C++',
      'Python',
      'HTML',
      'Node',
      'C#',
      'Java',
    ],
    awesome_things: [],
    project_whitelist: [],
    organization: [],
  });
  useEffect(() => {
    setCardData(props.data);
    console.log(props.data);
  }, [props.data]);
  return (
    <div className="card-container text-white">
      <div className="inside text-ibm">
        <div className="basic-info general-border">
          <div className="ft-s-24 text-ibm-bold">{cardData.name}</div>
          <div className="flex">
            <img src={address} alt="" />
            <span className="ml-10 ft-s-14 bg-grey text-gray addr">{addr}</span>
          </div>
          <div className="intro mt-5 text-blur-white">
            {cardData.introduction}
          </div>
        </div>
        <div className="location general-border">
          <div>
            <img src={location} alt="" />
          </div>
          <div>{cardData.location}</div>
        </div>
        <div className="skills general-border">
          <div className="ft-s-16 text-ibm-bold">Skills</div>
          <div className="skills-list">
            {cardData.skills.map((item) => {
              return (
                <div className="list-item bg-white mr-5 ft-s-10 mb-5 general-border">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className="avatar general-border">
          <img src={cardData.avatar ? cardData.avatar : avatar} alt="" />
        </div>
        <div className="contact general-border">
          {cardData.social_links.discord ? (
            <img className="mr-15" src={discord} alt="" />
          ) : (
            <span></span>
          )}
          {cardData.social_links.github_link ? (
            <img className="mr-15" src={github_link} alt="" />
          ) : (
            <span></span>
          )}
          {cardData.social_links.wechat ? (
            <img className="mr-15" src={wechat} alt="" />
          ) : (
            <span></span>
          )}
          {cardData.social_links.twitter ? (
            <img className="mr-15" src={twitter} alt="" />
          ) : (
            <span></span>
          )}
          {cardData.social_links.mirror_link ? (
            <img className="mr-15" src={mirror_link} alt="" />
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className="awsome-things general-border mt-8">
        <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
          Awesome Things
        </div>
        {cardData.awesome_things.map((item) => {
          return (
            <div className="border-t p-8 fw-700 text-ibm ft-s-12 flex">
              <div>{item.project}</div>
              <div className="circle-button pointer">
                <img src={circle} alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="awsome-things general-border mt-8 pb-20">
        <div className="awsome-things-title ft-s-16 fw-700 border-b text-ibm-bold">
          Project Whitelist
        </div>
        <div className="p-8">
          {cardData.project_whitelist.map((item) => {
            return (
              <div className="project-item pointer mr-8 ft-s-12 text-ibm">
                {item.project}
              </div>
            );
          })}
        </div>
      </div>
      <div className="awsome-things general-border mt-8">
        <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
          DAO/Organization
        </div>
        <div className="dao-list">
          {cardData.organization.map((item) => {
            return (
              <div className="flex border-t pt-4 pl-4">
                <div>
                  <img src={require(`./mock/temp-${item.avatar}.png`)} alt="" />
                </div>
                <div className="">
                  <div className="dao-name ft-s-24 ft-700 mb-10 text-ibm-bold">
                    {item.name}
                  </div>
                  {item.is_core_member ? (
                    <div className="flex position text-ibm">
                      <div className="c-icon flex mr-8">
                        <img src={c} alt="" />
                      </div>
                      <span>{item.position}</span>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
