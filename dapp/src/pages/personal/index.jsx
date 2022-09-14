import React, { useEffect, useState } from 'react';
import RightCard from '@/components/RightCard/index';
import Header from '@/components/Header';
import LeftEdit from '@/components/LeftEdit';
import './index.less';
import { useStorage } from '@/hooks/useStorage';
import RightCardDao from '../../components/RightCardDao/index';
import Button from '@/components/Button';

export default function index() {
  const [mode, setMode] = useState('ori');
  const [tempData, setTempData] = useState({
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
    awesome_things: [
      {
        project: 'Design for the transport',
        link: 'www.baidu.com',
      },
      {
        project: 'Probably One of The Most Common',
        link: 'www.baidu.com',
      },
      {
        project: 'LinkedIn Is No Longer LinkedIn Is No',
        link: 'www.baidu.com',
      },
    ],
    project_whitelist: [
      {
        project: 'Ethereum',
        link: 'www.google.com',
      },
      {
        project: 'NonceGeek',
        link: 'www.google.com',
      },
      {
        project: 'Bitcoin',
        link: 'www.google.com',
      },
      {
        project: 'Polygon',
        link: 'www.google.com',
      },
      {
        project: 'FISCOBCOS',
        link: 'www.google.com',
      },
      {
        project: 'Venachain',
        link: 'www.google.com',
      },
    ],
    organization: [
      {
        avatar: 'first',
        name: 'NonceGeek',
        link: '',
        is_core_member: true,
        position: 'founder',
      },
      {
        avatar: 'second',
        name: 'Starcoin',
        link: '',
        is_core_member: true,
        position: 'member',
      },
      {
        avatar: 'third',
        name: 'NonceGeek',
        link: '',
        is_core_member: false,
        position: '',
      },
      {
        avatar: 'first',
        name: 'NonceGeek',
        link: '',
        is_core_member: true,
        position: 'founder',
      },
    ],
  });
  const [tempDataDao, setTempDataDao] = useState({
    name: 'Dao Name',
    avatar: '',
    dao_link: 'https://noncegeek.com/#/',
    contract_address: 'contract address',
    introduction:
      'Our team is working on a decentralized social product in the Web3 environment.',
    social_links: {
      twitter: 'https://twitter.com/Web3dAppCamp',
      mirror_link: 'https://mirror.xyz/apecoder.eth',
      github_link: 'https://github.com/WeLightProject',
      wechat: '197626581',
      discord: 'hitchhacker@3691',
    },
    location: 'California',
    awesome_things: [
      {
        project: 'Design for the transport',
        link: 'www.baidu.com',
      },
      {
        project: 'Probably One of The Most Common',
        link: 'www.baidu.com',
      },
      {
        project: 'LinkedIn Is No Longer LinkedIn Is No',
        link: 'www.baidu.com',
      },
    ],
    members: [
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: 'Co-founder',
        is_core_member: true,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: '',
        is_core_member: false,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: '',
        is_core_member: false,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: '',
        is_core_member: false,
      },
      {
        avatar: 'member-avatar',
        name: 'Robert Fox',
        position: '',
        is_core_member: false,
      },
    ],
    partner: [
      {
        avatar: 'member-avatar',
        name: 'NonceGeek DAO',
      },
      {
        avatar: 'member-avatar',
        name: 'NonceGeek DAO',
      },
      {
        avatar: 'member-avatar',
        name: 'NonceGeek DAO',
      },
      {
        avatar: 'member-avatar',
        name: 'NonceGeek DAO',
      },
      {
        avatar: 'member-avatar',
        name: 'NonceGeek DAO',
      },
    ],
  });
  const handleUpdate = (val) => {
    setMode(val.mode);
    if (val.mode === 'individual') {
      setTempData(val.data);
    } else {
      setTempDataDao(val.data);
    }
  };
  const saveEdit = () => {
    if (mode === 'individual') {
      console.log(tempData);
    } else {
      console.log(tempDataDao);
    }
  };
  return (
    <>
      <div className="w-screen bg-black">
        <div className="w-main m-auto">
          {/* 替换成组件 */}
          <Header></Header>
          <div className="save-btn relative">
            <Button
              colorStyle="green"
              buttonText="Save"
              font="IBMPlexMono"
              onClick={saveEdit}
            />
          </div>
          <main className="flex">
            <div className="w-2/3 h-[1000px] overflow-y-scroll pt-[14px] text-white">
              {/* edit component */}
              <LeftEdit updateForm={handleUpdate}></LeftEdit>
            </div>
            <div className="w-2/5 h-screen p-54">
              {mode === 'individual' ? (
                <RightCard data={tempData} />
              ) : (
                <RightCardDao data={tempDataDao} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
