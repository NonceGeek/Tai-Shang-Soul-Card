import React, { useEffect, useState } from 'react';
import './index.less';
import styles from './module.less';
import { SoulCardAddress, SoulCardABI } from '@/assets/js/SoulCard';
import address from './mock/address.svg';
import telegram from './mock/telegram.svg';
import location from './mock/location.svg';
import avatar from './mock/avatar.png';
import wechat from './mock/wechat.svg';
import mirror_link from './mock/miro.svg';
import github_link from './mock/github.svg';
import discord from './mock/discord.svg';
import twitter from './mock/twitter.svg';
import circle from './mock/right-circle-arrow.svg';
import c from './mock/c.svg';
import CloseIcon from '@/assets/img/close-icon.png';
import share from './mock/share.svg';
import { useAccount, useContractWrite } from 'wagmi';
import { render_and_put_to_ipfs } from '@/requests/DataHandler';
import { get_user } from '@/requests/UserManager';
import { message } from 'antd';
const Card = (props) => {
  const [name, set_name] = useState('');
  const [ipfs_link, set_ipfs_link] = useState('');
  const { data, write, isSuccess, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SoulCardAddress,
    contractInterface: SoulCardABI,
    functionName: 'claim',
    args: [name, ipfs_link],
  });
  const { address } = useAccount();
  const [state, setState] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [cardData, setCardData] = useState({
    basic_info: {
      name: 'Robert Fox',
      avatar: '',
      github: {
        avatar: '',
        name: '',
      },
      slogan: 'Have more than 6 years of Digital Product Design experience.',
      social_links: {
        twitter: 'https://twitter.com/Web3dAppCamp',
        mirror_link: 'https://mirror.xyz/apecoder.eth',
        github_link: 'https://github.com/WeLightProject',
        wechat: '197626581',
        discord: 'hitchhacker@3691',
        telegram: '',
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
    },
    awesome_things: [],
    project_whitelist: [],
    daos_joined: ['0x73c7448760517E3E6e416b2c130E3c6dB2026A1d'],
    organization: [],
  });
  const handleShareclick = async () => {
    const res = await get_user({ params: [address] });
    if (res.data.result && res.data.result.user) {
      setShowPopover(false);
      setState(true);
    } else {
      message.error('please SAVE');
    }
  };
  const clickLink = async () => {
    render_and_put_to_ipfs({
      params: [address, 'user', 0],
    });
    const res = await get_user({ params: [address] });
    if (
      res.data.result &&
      res.data.result.ipfs_link &&
      res.data.result.user.payload
    ) {
      set_name(res.data.result.user.payload.basic_info.name);
      set_ipfs_link(res.data.result.ipfs_link);
      message.success({
        content: `已上传至IPFS,点击跳转查看`,
        style: { cursor: 'pointer' },
        duration: 3,
        onClick: () => {
          window.open(res.data.result.ipfs_link);
        },
      });
    }
  };
  const copy = (value, type = 'input') => {
    const input = document.createElement(type);
    input.setAttribute('readonly', 'readonly'); // 设置为只读, 防止在 ios 下拉起键盘
    // input.setAttribute('value', value); // textarea 不能用此方式赋值, 否则无法复制内容
    input.value = value;
    console.log(value);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999); // 防止 ios 下没有全选内容而无法复制
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };
  const handleContact = (needJump, link) => {
    copy(link);
    if (needJump) {
      window.open(link);
    }
  };
  const mintNFT = async () => {
    const res = await get_user({ params: [address] });
    if (res.data.result && res.data.result.user) {
      write();
    } else {
      message.error('please SAVE');
    }
  };
  const jump = (link) => {
    window.open(link);
  };
  useEffect(() => {
    setCardData(props.data);
    console.log(cardData);
  }, [props.data]);
  return (
    <>
      {isLoading && message.loading('Mint NFT Loading...')}
      {isSuccess &&
        message.success({
          content: `Mint Success,please click to view tx`,
          style: { cursor: 'pointer' },
          duration: 3,
          onClick: () => {
            window.open(
              `https://portal.noncegeek.com/live/nft?nft_contract_id=1&addr=${address}`,
            );
          },
        })}
      <div className="card-container text-white relative">
        {showPopover ? (
          <div className="absolute p-[20px] popover text-ibm pointer">
            <div
              className="options ft-s-14 mb-[8px]"
              onClick={() => handleShareclick()}
            >
              Share Soul Card
            </div>
            <div className="options ft-s-14 mb-[8px]" onClick={mintNFT}>
              Mint SBT
            </div>
            <div
              className="options ft-s-14"
              onClick={() => setShowPopover(false)}
            >
              Export to Gist
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="sub-header text-white mt-[20px] grid">
          <div>Preview</div>
          <div
            className="text-right pointer"
            onClick={() => setShowPopover(!showPopover)}
          >
            <img src={share} alt="" />
          </div>
        </div>
        <div className="card-padding">
          <div className="inside text-ibm">
            <div className="basic-info general-border">
              <div className="ft-s-24 text-ibm-bold">
                {cardData.basic_info.name}
              </div>
              <div className="flex">
                <img src={address} alt="" />
                <span className="ml-[10px] ft-s-14 bg-grey text-gray addr">
                  {address}
                </span>
              </div>
              <div className="intro mt-[5px] text-blur-white">
                {cardData.basic_info.slogan}
              </div>
            </div>
            <div className="location general-border">
              <div>
                <img src={location} alt="" />
              </div>
              <div>{cardData.basic_info.location}</div>
            </div>
            <div className="skills general-border">
              <div className="ft-s-16 text-ibm-bold">Skills</div>
              <div className="skills-list">
                {cardData.basic_info.skills.map((item, index) => {
                  return (
                    <div
                      className="list-item bg-white mr-[5px] ft-s-10 mb-[5px] general-border"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="avatar general-border flex justify-center items-center">
              <img
                className="max-w-full max-h-full"
                src={
                  cardData.basic_info.avatar
                    ? cardData.basic_info.avatar
                    : avatar
                }
                alt=""
              />
            </div>
            <div className="contact general-border flex justify-between gap-x-1">
              {cardData.basic_info.social_links.discord ? (
                <img
                  onClick={() =>
                    handleContact(
                      false,
                      cardData.basic_info.social_links.discord,
                    )
                  }
                  className="pointer"
                  src={discord}
                  alt=""
                />
              ) : (
                <span></span>
              )}
              {cardData.basic_info.social_links.github_link ? (
                <img
                  onClick={() =>
                    handleContact(
                      false,
                      cardData.basic_info.social_links.github_link,
                    )
                  }
                  className="pointer"
                  src={github_link}
                  alt=""
                />
              ) : (
                <span></span>
              )}
              {cardData.basic_info.social_links.wechat ? (
                <img
                  onClick={() =>
                    handleContact(
                      false,
                      cardData.basic_info.social_links.wechat,
                    )
                  }
                  className="pointer"
                  src={wechat}
                  alt=""
                />
              ) : (
                <span></span>
              )}
              {cardData.basic_info.social_links.twitter ? (
                <img
                  onClick={() =>
                    handleContact(
                      false,
                      cardData.basic_info.social_links.twitter,
                    )
                  }
                  className="pointer"
                  src={twitter}
                  alt=""
                />
              ) : (
                <span></span>
              )}
              {cardData.basic_info.social_links.mirror_link ? (
                <img
                  onClick={() =>
                    handleContact(
                      true,
                      cardData.basic_info.social_links.mirror_link,
                    )
                  }
                  className="pointer"
                  src={mirror_link}
                  alt=""
                />
              ) : (
                <span></span>
              )}
              {cardData.basic_info.social_links.telegram ? (
                <img
                  onClick={() =>
                    handleContact(
                      true,
                      cardData.basic_info.social_links.telegram,
                    )
                  }
                  className="pointer"
                  src={telegram}
                  alt=""
                />
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <div className="awsome-things general-border mt-[8px]">
            <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
              Awesome Things
            </div>
            {cardData.awesome_things.map((item, index) => {
              return (
                <div
                  className="border-t p-[8px] fw-700 text-ibm ft-s-12 flex"
                  key={index}
                >
                  <div>{item.title}</div>
                  <div className="circle-button pointer">
                    <img onClick={() => jump(item.link)} src={circle} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="awsome-things general-border mt-[8px] pb-[20px]">
            <div className="awsome-things-title ft-s-16 fw-700 border-b text-ibm-bold">
              Project Contributed
            </div>
            <div className="p-[8px]">
              {cardData.project_whitelist.map((item, index) => {
                return (
                  <div
                    className="project-item pointer mr-[8px] ft-s-12 text-ibm"
                    key={index}
                    onClick={() => {
                      window.open(item.link);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="awsome-things general-border mt-[8px]">
            <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
              DAO/Organization
            </div>
            <div className="dao-list">
              {cardData.daos_joined.map((item, index) => {
                return (
                  <div className="flex border-t pt-[4px] pl-[4px]" key={index}>
                    <div>
                      <img
                        style={{ height: '40px', width: '40px' }}
                        src={
                          item.avatar
                            ? item.avatar
                            : require(`./mock/dao_avatar.png`)
                        }
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="dao-name ft-s-24 ft-700 mb-[10px] text-ibm-bold">
                        {item.name}
                      </div>
                      <div className="flex position text-ibm">
                        <div className="c-icon flex mr-[8px]">
                          <img src={c} alt="" />
                        </div>
                        <span>position</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.root}>
          <div
            className={`container p-4 ${state ? 'active' : ''}`}
            onClick={() => setState(!state)}
          >
            <div className="Popup text-ibm-bold">
              <div className="bg-black inside-container p-[16px]">
                <div className="close-icon w-full flex justify-end items-center">
                  <img
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setState(!state)}
                    src={CloseIcon}
                    alt="close"
                  />
                </div>
                <div className="text-white text-center mt-[10px] mb-[51px]">
                  WHICH FOTMATE DO YOU PREFER?
                </div>
                <div>
                  <div className="options ft-s-16 pointer" onClick={clickLink}>
                    Link
                  </div>
                  <div
                    className="options ft-s-16 pointer"
                    onClick={() => setShowPopover(false)}
                  >
                    PNG
                  </div>
                  <div
                    className="options ft-s-16 pointer"
                    onClick={() => setShowPopover(false)}
                  >
                    SVG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
