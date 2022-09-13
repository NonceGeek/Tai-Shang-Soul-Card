import React, { useState, useEffect } from 'react';
import InputLabel from '@/components/InputLabel';
import GradientInput from '@/components/GradientInput';
import Button from '@/components/Button';
import { useStorage } from '@/hooks/useStorage.ts';
export default function index(props) {
  const [info, setInfo] = useStorage('individual_info');
  const [check_dao, set_check_dao] = useState([
    { name: 'NonceGeek' },
    { name: 'Starcoin' },
  ]);
  const [formData, setFormData] = useState({
    name: 'Robert Fox',
    dao_link: 'https://noncegeek.com/#/',
    contract_address: '9de3d8a9de3d8ad7d2g6d7d2g6fe3e2',
    description:
      'Our team is working on a decentralized social product in the Web3 environment.',
    introduction:
      'Have more than 6 years of Digital Product Design experience.',
    social_links: {
      twitter: 'https://twitter.com/Web3dAppCamp',
      mirror_link: 'https://mirror.xyz/apecoder.eth',
      github_link: 'https://github.com/WeLightProject',
      wechat: '197626581',
      discord: 'hitchhacker@3691',
      telegram: '9478981157',
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
    members: [],
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
  });

  useEffect(() => {
    setInfo(formData);
    console.log(formData);
  }, [formData]);
  const changeHandle = (param1, param2, param3) => {
    return (value) => {
      if (param3) {
        formData[param1][param2][param3] = value;
      } else if (param2) {
        formData[param1][param2] = value;
      } else {
        formData[param1] = value;
      }
      setFormData(Object.assign({}, formData));
    };
  };

  const changeDao = (param1) => {
    return (value) => {
      check_dao[param1].name = value;
      set_check_dao([...check_dao]);
    };
  };
  const addDAO = () => {
    if (check_dao[check_dao.length - 1].name != '') {
      check_dao.push({ name: '' });
      set_check_dao([...check_dao]);
    } else {
      alert('please edit previous data');
    }
  };
  const addProject = () => {
    formData.awesome_things.push({ project: '', link: '' });
    setFormData({ ...formData });
  };
  const saveEdit = () => {
    console.log(formData);
  };

  return (
    <div className=" relative">
      <div className="mb-6">
        <InputLabel
          text="Company/DAO Name"
          required={true}
          bold={true}
        ></InputLabel>
        <GradientInput
          value={formData.name}
          onChange={changeHandle('name')}
          placeholder="111"
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel
          text="Self Introduction"
          required={true}
          bold={true}
        ></InputLabel>
        <GradientInput
          value={formData.introduction}
          onChange={changeHandle('introduction')}
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel
          text="Upload your Image"
          required={true}
          bold={true}
        ></InputLabel>
        <Button colorStyle="green" buttonText="Upload" font="IBMPlexMono" />
      </div>
      <div className="mb-6 flex flex-col">
        <InputLabel text="Contact Information" bold={true}></InputLabel>
        <GradientInput
          value={formData.social_links.discord}
          onChange={changeHandle('social_links', 'discord')}
          width="md"
          label="Discord"
        ></GradientInput>
        <GradientInput
          value={formData.social_links.telegram}
          onChange={changeHandle('social_links', 'telegram')}
          width="md"
          label="Telegram"
        ></GradientInput>
        <GradientInput
          value={formData.social_links.wechat}
          onChange={changeHandle('social_links', 'wechat')}
          width="md"
          label="WeChat"
        ></GradientInput>
        <GradientInput
          value={formData.social_links.twitter}
          onChange={changeHandle('social_links', 'twitter')}
          width="md"
          label="Twitter"
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel text="Your Website" bold={true}></InputLabel>
        <GradientInput
          value={formData.dao_link}
          onChange={changeHandle('dao_link')}
          placeholder=""
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel text="Notable Things About You" bold={true}></InputLabel>
        <div className="mb-2">
          {formData.awesome_things.map((item, index) => {
            return (
              <div className="mb-4">
                <GradientInput
                  value={formData.awesome_things[index].project}
                  onChange={changeHandle('awesome_things', index, 'project')}
                  width="md"
                  label="Project"
                ></GradientInput>
                <GradientInput
                  value={formData.awesome_things[index].link}
                  onChange={changeHandle('awesome_things', index, 'link')}
                  width="md"
                  label="Link"
                ></GradientInput>
              </div>
            );
          })}
        </div>
        <Button
          colorStyle="green"
          buttonText="Add"
          font="IBMPlexMono"
          onClick={addProject}
        />
      </div>
      <div className="mb-6 flex flex-col">
        <InputLabel text="Add Your Contract Address" bold={true}></InputLabel>
        <GradientInput
          value={formData.contract_address}
          onChange={changeHandle('contract_address')}
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel text="Invite Related Members" bold={true}></InputLabel>
        <Button
          colorStyle="green"
          buttonText="Invite Link"
          font="IBMPlexMono"
        />
      </div>
      <div className="mb-6">
        <InputLabel
          text="Add Your Associating Company/DAO"
          bold={true}
        ></InputLabel>
        <div className="mb-2">
          {check_dao.map((item, index) => {
            return (
              <div className="flex items-center">
                <GradientInput
                  value={check_dao[index].name}
                  onChange={changeDao(index)}
                ></GradientInput>
                <Button
                  colorStyle="green"
                  buttonText="Confirm"
                  font="IBMPlexMono"
                  style={{
                    height: '20px',
                    display: 'flex',
                    fontSize: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '8px',
                    marginLeft: '8px',
                  }}
                />
              </div>
            );
          })}
        </div>
        <Button
          colorStyle="green"
          buttonText="Add"
          font="IBMPlexMono"
          onClick={addDAO}
        />
      </div>
      <div className="fixed top-[600px] right-[600px]">
        <Button
          colorStyle="green"
          buttonText="Save"
          font="IBMPlexMono"
          onClick={saveEdit}
        />
      </div>
    </div>
  );
}
