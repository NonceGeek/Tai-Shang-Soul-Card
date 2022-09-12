import React, { useEffect } from 'react';
import RightCard from '@/components/RightCard/index';
import Header from '@/components/Header';
import LeftEdit from '@/components/LeftEdit';
import style from './index.less';
import { useStorage } from '@/hooks/useStorage';
const temp_data = {
  name: 'Robert Fox',
  introduction: 'Have more than 6 years of Digital Product Design experience.',
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
      avator: 'first',
      name: 'NonceGeek',
      link: '',
      is_core_member: true,
      position: 'founder',
    },
    {
      avator: 'second',
      name: 'Starcoin',
      link: '',
      is_core_member: true,
      position: 'member',
    },
    {
      avator: 'third',
      name: 'NonceGeek',
      link: '',
      is_core_member: false,
      position: '',
    },
    {
      avator: 'first',
      name: 'NonceGeek',
      link: '',
      is_core_member: true,
      position: 'founder',
    },
  ],
};
export default function index() {
  const [individual_info, set_individual_info] = useStorage('individual_info');
  const getData = (data) => {
    console.log(data);
  };
  useEffect(() => {
    console.log(individual_info);
  }, [individual_info]);
  return (
    <>
      <div className="w-screen bg-black">
        <div className="w-main m-auto">
          {/* 替换成组件 */}
          <Header></Header>
          <main className="flex">
            <div className="w-2/3 h-[1000px] overflow-y-scroll pt-[14px] text-white">
              {/* edit component */}
              <LeftEdit></LeftEdit>
            </div>
            <div className="w-1/3 p-54">
              <RightCard data={individual_info} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
