import React from 'react';
import Card from '../../components/Card/index'

const temp_data = {
  name: 'Robert Fox',
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
  awesome_things: [
    {
      project: 'Design for the transport',
      link: 'www.baidu.com'
    },
    {
      project: 'Probably One of The Most Common',
      link: 'www.baidu.com'
    },
    {
      project: 'LinkedIn Is No Longer LinkedIn Is No',
      link: 'www.baidu.com'
    }
  ],
  project_whitelist: [
    {
      project: 'Ethereum',
      link: 'www.google.com'
    },
    {
      project: 'NonceGeek',
      link: 'www.google.com'
    },
    {
      project: 'Bitcoin',
      link: 'www.google.com'
    },
    {
      project: 'Polygon',
      link: 'www.google.com'
    },
    {
      project: 'FISCOBCOS',
      link: 'www.google.com'
    },
    {
      project: 'Venachain',
      link: 'www.google.com'
    }
  ],
  organization: [
    {
      avator: 'first',
      name: 'NonceGeek',
      link: '',
      is_core_member: true,
      position: 'founder'
    },
    {
      avator: 'second',
      name: 'Starcoin',
      link: '',
      is_core_member: true,
      position: 'member'
    },
    {
      avator: 'third',
      name: 'NonceGeek',
      link: '',
      is_core_member: false,
      position: ''
    },
    {
      avator: 'first',
      name: 'NonceGeek',
      link: '',
      is_core_member: true,
      position: 'founder'
    }
  ]
}
export default function index() {
  return (
    <>
      <div className=" w-screen h-screen bg-black">
        <div className="w-main m-auto">
          {/* 替换成组件 */}
          <header className="h-header bg-red-500">header</header>
          <main className="flex">
            <div className="w-3/5 bg-blue-500 h-screen">
              {/* edit component */}
            </div>
            <div className="w-2/5 h-screen p-54">
              <Card data={temp_data} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
