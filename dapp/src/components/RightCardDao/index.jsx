import React, { useEffect, useState } from 'react';
import './index.less';
import styles from './module.less';
import { SoulCardDaoAddress, SoulCardDaoABI } from '@/assets/js/SoulCardDao';
import address from './mock/address.svg';
import location from './mock/location.svg';
import sign from './mock/sign.svg';
import wechat from './mock/wechat.svg';
import mirror_link from './mock/miro.svg';
import github_link from './mock/telegram.svg';
import discord from './mock/discord.svg';
import twitter from './mock/twitter.svg';
import telegram from './mock/telegram.svg';
import circle from './mock/right-circle-arrow.svg';
import c from './mock/c.svg';
import m from './mock/m.svg';
import dao_avatar from './mock/dao_avatar.png';
import share from './mock/share.svg';
import CloseIcon from '@/assets/img/close-icon.png';
import { useAccount, useContractWrite } from 'wagmi';
import { render_and_put_to_ipfs } from '@/requests/DataHandler';
import { get_user } from '@/requests/UserManager';
const Card = (props) => {
  const [name, set_name] = useState('');
  const [ipfs_link, set_ipfs_link] = useState('');
  const { data, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SoulCardDaoAddress,
    contractInterface: SoulCardDaoABI,
    functionName: 'claim',
    args: [name, ipfs_link],
  });
  const { address } = useAccount();
  const [state, setState] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const coreMember = props.data.members.filter((item) => {
    return item.is_core_member === true;
  });
  const normalMember = props.data.members.filter((item) => {
    return item.is_core_member === false;
  });
  const allMembers = props.data.members.length;

  const [cardData, setCardData] = useState({
    basic_info: {
      name: 'Dao Name',
      avatar: '',
      slogan:
        'Our team is working on a decentralized social product in the Web3 environment.',
      social_links: {
        twitter: 'https://twitter.com/Web3dAppCamp',
        mirror_link: 'https://mirror.xyz/apecoder.eth',
        github_link: 'https://github.com/WeLightProject',
        wechat: '197626581',
        discord: 'hitchhacker@3691',
        telegram: '',
      },
      location: 'California',
      homepage: 'https://noncegeek.com',
      contract_addresses: [
        {
          addr: '0x0',
          alias: 'BYAC NFT',
        },
      ],
    },
    awesome_things: [],
    members: [],
    partners: [],
    core_members: [],
    sub_daos: [],
  });
  const clickLink = async () => {
    render_and_put_to_ipfs({
      params: [address, 'dao', 1],
    });
    const res = await get_user({ params: [address] });
    if (
      res.data.result &&
      res.data.result.ipfs_link &&
      res.data.result.user.payload
    ) {
      set_name(res.data.result.user.payload.basic_info.name);
      set_ipfs_link(res.data.result.ipfs_link);
    }
    alert(`已上传至IPFS:${res.data.result.ipfs_link}`);
  };
  const mintNFT = async () => {
    const res = await get_user({ params: [address] });
    if (res.data.result && res.data.result.dao) {
      write();
      setTimeout(() => {
        alert(`check tx: https://portal.noncegeek.com`);
      }, 5000);
    } else {
      alert('please SAVE');
    }
  };
  const handleShareclick = async () => {
    const res = await get_user({ params: [address] });
    if (res.data.result && res.data.result.dao) {
      setShowPopover(false);
      setState(true);
    } else {
      alert('please SAVE');
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
  const jump = (link) => {
    window.open(link);
  };
  useEffect(() => {
    setCardData(props.data);
  }, [props.data]);
  return (
    <div className="card-container-dao text-white relative">
      {showPopover ? (
        <div className="absolute p-[20px] popover text-ibm pointer">
          <div
            className="options ft-s-14 mb-[8px]"
            onClick={() => handleShareclick()}
          >
            Share Soul Card
          </div>
          <div className="options ft-s-14 mb-[8px]" onClick={mintNFT}>
            Mint NFT
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
        <div className="text-imb-bold ft-s-64 line-height-one">
          {cardData.basic_info.name}
        </div>
        <div className="flex">
          <img src={address} alt="" />
          <span className="ml-[10px] ft-s-14 bg-grey text-gray addr word-break">
            {address}
          </span>
        </div>
        <div className="inside text-ibm mt-[8px]">
          <div className="basic-info general-border">
            <img
              className="max-w-full max-h-full avator"
              src={
                cardData.basic_info.avatar
                  ? cardData.basic_info.avatar
                  : dao_avatar
              }
              alt=""
            />
          </div>
          <div className="contact general-border">
            {cardData.basic_info.social_links.discord ? (
              <img
                onClick={() =>
                  handleContact(false, cardData.basic_info.social_links.discord)
                }
                className="mr-[15px] pointer"
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
                className="mr-[15px] pointer"
                src={github_link}
                alt=""
              />
            ) : (
              <span></span>
            )}
            {cardData.basic_info.social_links.wechat ? (
              <img
                onClick={() =>
                  handleContact(false, cardData.basic_info.social_links.wechat)
                }
                className="mr-[15px] pointer"
                src={wechat}
                alt=""
              />
            ) : (
              <span></span>
            )}
            {cardData.basic_info.social_links.twitter ? (
              <img
                onClick={() =>
                  handleContact(false, cardData.basic_info.social_links.twitter)
                }
                className="mr-[15px] pointer"
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
                className="mr-[15px] pointer"
                src={mirror_link}
                alt=""
              />
            ) : (
              <span></span>
            )}
            {cardData.basic_info.social_links.telegram ? (
              <img
                onClick={() =>
                  handleContact(true, cardData.basic_info.social_links.telegram)
                }
                className="mr-[15px] pointer"
                src={telegram}
                alt=""
              />
            ) : (
              <span></span>
            )}
            <div className="ft-s-12" style={{ marginTop: '4px' }}>
              {cardData.basic_info.homepage}
            </div>
          </div>
          <div className="contract general-border flex pr-[14px] pl-[14px]">
            <img src={sign} alt="" />
            <span className="ml-[4px] word-break">
              {cardData.basic_info.contract_addresses.addr}
            </span>
          </div>
          <div className="location general-border">
            <div>
              <img src={location} alt="" />
            </div>
            <div>{cardData.basic_info.location}</div>
          </div>
          <div className="des general-border ft-s-14 pt-[26px] pl-[16px]">
            {cardData.basic_info.slogan}
          </div>
        </div>
        <div className="awsome-things general-border mt-[8px]">
          <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
            Awesome Things
          </div>
          {cardData.awesome_things.map((item) => {
            return (
              <div
                className="border-t p-[8px] fw-700 text-ibm ft-s-12 flex"
                key={item.title}
              >
                <div>{item.title}</div>
                <div className="circle-button pointer">
                  <img onClick={() => jump(item.link)} src={circle} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="awsome-things general-border mt-[8px]">
          <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold border-b">
            DAO/Organization
          </div>
          <div className="c-icon flex m-[8px]">
            <img src={c} alt="" />
          </div>
          <div className="dao-list">
            {coreMember.map((item, index) => {
              return (
                <div className="flex pt-[4px] pl-[8px] mb-[15px]" key={index}>
                  <div>
                    <img src={require(`./mock/${item.avatar}.png`)} alt="" />
                  </div>
                  <div className="ml-[10px]">
                    <div className="dao-name ft-s-14 ft-700 mb-[5px] line-height-one text-ibm-bold word-break">
                      {item.name}
                    </div>
                    {item.is_core_member ? (
                      <div className="flex position text-ibm">
                        <span className="word-break">{item.position}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="" style={{ borderTop: '.5px solid #ffffff' }}>
            <div className="m-icon m-[8px]">
              <img src={m} alt="" />
            </div>
            <div className="relative normal-container flex pl-[8px]">
              {normalMember.splice(0, 4).map((item, index) => {
                return (
                  <div
                    className="absolute member-ele"
                    style={{ left: `${index * 25 + 8}px` }}
                    key={index}
                  >
                    <img src={require(`./mock/${item.avatar}.png`)} alt="" />
                  </div>
                );
              })}
              <div className="ml-[150px]">{allMembers} &nbsp;members</div>
            </div>
          </div>
        </div>
        <div className="awsome-things general-border mt-[8px]">
          <div className="awsome-things-title ft-s-16 fw-700 text-ibm-bold">
            Partner
          </div>
          <div className="partner">
            {cardData.partners.map((item, index) => {
              return (
                <div className="flex border-t p-[8px] dao-ele" key={index}>
                  <img
                    src={
                      item.avatar
                        ? item.avatar
                        : require(`./mock/dao_avatar.png`)
                    }
                    alt=""
                  />
                  <span className="ml-[10px] text-ibm-bold">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default Card;
