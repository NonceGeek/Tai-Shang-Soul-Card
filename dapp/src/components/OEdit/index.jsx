import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import InputLabel from '@/components/InputLabel';
import GradientInput from '@/components/GradientInput';
import Button from '@/components/Button';
import { get_user } from '@/requests/UserManager';
import { useAccount } from 'wagmi';
export default function index(props) {
  const { address } = useAccount();
  const [check_dao, set_check_dao] = useState([
    { name: 'NonceGeek' },
    { name: 'Starcoin' },
  ]);
  const [formData, setFormData] = useState({
    basic_info: {
      name: '',
      avatar: '',
      slogan: '',
      social_links: {
        telegram: '',
        twitter: '',
        mirror_link: '',
        github_link: '',
        wechat: '',
        discord: '',
      },
      location: '',
      homepage: '',
      contract_addresses: [
        {
          addr: '',
          alias: '',
        },
      ],
    },
    awesome_things: [],
    members: [],
    partners: [],
    core_members: [],
    sub_daos: [],
  });
  useEffect(() => {
    if (!address) {
      history.push(`/`);
    }
  }, []);
  useEffect(async () => {
    if (address) {
      const res = await get_user({ params: [address] });
      if (res.data.result && res.data.result.dao) {
        const data = res.data.result.dao.payload;
        setFormData({ ...data });
      }
    }
  }, [address]);
  useEffect(() => {
    props.handleData(formData);
  }, [formData]);
  const changeHandle = (param1, param2, param3, param4) => {
    return (value) => {
      if (param4) {
        formData[param1][param2][param3][param4] = value;
      } else if (param3) {
        formData[param1][param2][param3] = value;
      } else if (param2) {
        formData[param1][param2] = value;
      } else {
        formData[param1] = value;
      }
      setFormData(Object.assign({}, formData));
    };
  };

  const uploadImage = (ev) => {
    var el = (window._protected_reference = document.createElement('INPUT'));
    el.type = 'file';
    el.accept = 'image/*';

    // (cancel will not trigger 'change')
    el.addEventListener('change', function (ev2) {
      // access el.files[] to do something with it (test its length!)

      // add first image, if available
      if (el.files.length) {
        const imgSrc = URL.createObjectURL(el.files[0]);
        formData.basic_info.avatar = imgSrc;
        setFormData({
          ...formData,
        });
        // document.getElementById('out').src = imgSrc;
      }

      // test some async handling
      new Promise(function (resolve) {
        setTimeout(function () {
          console.log(el.files);
          resolve();
        }, 1000);
      }).then(function () {
        // clear / free reference
        el = window._protected_reference = undefined;
      });
    });

    el.click(); // open
  };

  const changeDao = (param1) => {
    return (value) => {
      check_dao[param1].name = value;
      set_check_dao([...check_dao]);
    };
  };
  const addDAO = () => {
    if (check_dao.length) {
      if (check_dao[check_dao.length - 1].name != '') {
        check_dao.push({ name: '' });
        set_check_dao([...check_dao]);
      } else {
        alert('please edit previous data');
      }
    } else {
      check_dao.push({ name: '' });
      set_check_dao([...check_dao]);
    }
  };
  const addProject = () => {
    formData.awesome_things.push({ title: '', link: '' });
    setFormData({ ...formData });
  };
  const addContract = () => {
    formData.basic_info.contract_addresses.push({ addr: '', alias: '' });
    setFormData({ ...formData });
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
          value={formData.basic_info.name}
          onChange={changeHandle('basic_info', 'name')}
          placeholder=""
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel
          text="Self Introduction"
          required={true}
          bold={true}
        ></InputLabel>
        <GradientInput
          value={formData.basic_info.slogan}
          onChange={changeHandle('basic_info', 'slogan')}
        ></GradientInput>
      </div>
      <div className="mb-6 flex flex-col items-start">
        <InputLabel
          text="Upload your Image"
          required={true}
          bold={true}
        ></InputLabel>
        <Button
          onClick={(ev) => uploadImage(ev)}
          colorStyle="green"
          buttonText="Upload"
          font="IBMPlexMono"
        />
        <img
          className={`${
            formData.basic_info.avatar
              ? 'w-52 h-52 object-contain'
              : 'w-px h-px'
          }`}
          src={formData.basic_info.avatar}
        />
      </div>
      <div className="mb-6 flex flex-col">
        <InputLabel text="Contact Information" bold={true}></InputLabel>
        <GradientInput
          value={formData.basic_info.social_links.discord}
          onChange={changeHandle('basic_info', 'social_links', 'discord')}
          width="md"
          label="Discord"
        ></GradientInput>
        <GradientInput
          value={formData.basic_info.social_links.telegram}
          onChange={changeHandle('basic_info', 'social_links', 'telegram')}
          width="md"
          label="Telegram"
        ></GradientInput>
        <GradientInput
          value={formData.basic_info.social_links.wechat}
          onChange={changeHandle('basic_info', 'social_links', 'wechat')}
          width="md"
          label="WeChat"
        ></GradientInput>
        <GradientInput
          value={formData.basic_info.social_links.twitter}
          onChange={changeHandle('basic_info', 'social_links', 'twitter')}
          width="md"
          label="Twitter"
        ></GradientInput>
        <GradientInput
          value={formData.basic_info.social_links.mirror_link}
          onChange={changeHandle('basic_info', 'social_links', 'mirror_link')}
          width="md"
          label="Mirror"
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel text="Your Website" bold={true}></InputLabel>
        <GradientInput
          value={formData.basic_info.homepage}
          onChange={changeHandle('basic_info', 'homepage')}
          placeholder=""
        ></GradientInput>
      </div>
      <div className="mb-6">
        <InputLabel text="Notable Things About You" bold={true}></InputLabel>
        <div className="mb-2">
          {formData.awesome_things.map((item, index) => {
            return (
              <div className="mb-4" key={index}>
                <GradientInput
                  value={formData.awesome_things[index].title}
                  onChange={changeHandle('awesome_things', index, 'title')}
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
      <div className="mb-6">
        <InputLabel text="Add Your Contract Address" bold={true}></InputLabel>
        {formData.basic_info.contract_addresses.map((item, index) => {
          return (
            <div className="mb-4" key={index}>
              <GradientInput
                value={formData.basic_info.contract_addresses[index].addr}
                onChange={changeHandle(
                  'basic_info',
                  'contract_addresses',
                  index,
                  'addr',
                )}
              ></GradientInput>
              <div className="flex items-center">
                <GradientInput
                  value={formData.basic_info.contract_addresses[index].alias}
                  onChange={changeHandle(
                    'basic_info',
                    'contract_addresses',
                    index,
                    'alias',
                  )}
                  width="sm"
                  label="Name Your Address"
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
            </div>
          );
        })}
        <Button
          colorStyle="green"
          buttonText="Add"
          font="IBMPlexMono"
          onClick={addContract}
        />
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
              <div className="flex items-center" key={index}>
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
    </div>
  );
}
