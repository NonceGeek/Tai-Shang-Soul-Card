import React, { useState, useEffect } from 'react';
import InputLabel from '@/components/InputLabel';
import GradientInput from '@/components/GradientInput';
import Button from '@/components/Button';
import { useLocation } from 'umi';
export default function index(props) {
  const location = useLocation();
  const [skills, setSkills] = useState({
    'Frontend technology stack': [
      { name: 'HTMl', status: false },
      { name: 'CSS', status: false },
      { name: 'Javascript', status: false },
      { name: 'React', status: false },
      { name: 'scaffold-eth', status: false },
    ],
    'Backend technology stack': [
      { name: 'Java', status: false },
      { name: 'C', status: false },
      { name: 'C#', status: false },
      { name: 'C++', status: false },
      { name: 'Python', status: false },
      { name: 'Node', status: false },
      { name: 'Golang', status: false },
      { name: 'Elixir', status: false },
      { name: 'Rust', status: false },
    ],
    'Contract technology stack': [
      { name: 'Solidity', status: false },
      { name: 'Move', status: false },
    ],
    'Blockchain technology stack': [
      { name: 'Ethereum', status: false },
      { name: 'Arweave', status: false },
    ],
  });
  const [check_skill, set_check_skill] = useState([]);
  const [check_dao, set_check_dao] = useState([
    // { name: 'NonceGeek' },
    // { name: 'Starcoin' },
  ]);
  const [formData, setFormData] = useState({
    basic_info: {
      name: 'Robert Fox',
      avatar: '',
      github: {
        avatar: '',
        name: '',
      },
      slogan: 'Have more than 6 years of Digital Product Design experience.',
      social_links: {
        telegram: '197626581',
        twitter: 'https://twitter.com/Web3dAppCamp',
        mirror_link: 'https://mirror.xyz/apecoder.eth',
        github_link: 'https://github.com/WeLightProject',
        wechat: '197626581',
        discord: 'hitchhacker@3691',
      },
      location: 'California',
      skills: ['Javascript', 'C++', 'Python', 'HTML'],
    },
    awesome_things: [],
    project_whitelist: [],
    daos_joined: [],
    organization: [],
  });
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
        setFormData({ ...formData });
        // document.getElementById('out').src = imgSrc;
      }

      // test some async handling
      new Promise(function (resolve) {
        setTimeout(function () {
          // console.log(el.files);
          resolve();
        }, 1000);
      }).then(function () {
        // clear / free reference
        el = window._protected_reference = undefined;
      });
    });

    el.click(); // open
  };

  const clickHandler = (key, skill) => {
    return () => {
      const isExist = check_skill.some((item) => item === skill);
      if (isExist) {
        const newSkill = check_skill.filter((item) => item !== skill);
        set_check_skill([...newSkill]);
        skills[key].map((item) => {
          if (item.name == skill) {
            item.status = false;
          }
        });
      } else {
        check_skill.push(skill);
        set_check_skill([...check_skill]);
        skills[key].map((item) => {
          if (item.name == skill) {
            item.status = true;
          }
        });
      }
    };
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
  const loginGithub = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=9b26616a898147b1a598&redirect_uri=https://api-vercel-tan.vercel.app/api/github/oauth';
  };
  useEffect(() => {
    props.handleData(formData);
  }, [formData]);

  useEffect(() => {
    formData.basic_info.skills = [...check_skill];
    setFormData({ ...formData });
  }, [check_skill]);
  useEffect(() => {
    console.log(location);
    if (location.query.login) {
      formData.basic_info.social_links.github_link = `https://github.com/${location.query.login}`;
      formData.basic_info.github.avatar = location.query.avatar_url;
      formData.basic_info.github.name = location.query.login;
    }
  }, [location.query]);
  return (
    <div className=" relative">
      <div className="mb-6">
        <InputLabel text="Name" required={true} bold={true}></InputLabel>
        <GradientInput
          value={formData.basic_info.name}
          onChange={changeHandle('basic_info', 'name')}
          placeholder="KT"
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
          placeholder="eg: I am a developer who is seeking..."
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
        <InputLabel text="Connect to Your Github" bold={true}></InputLabel>
        {formData.basic_info.github.avatar ? (
          <div className="flex items-center rounded border border-[#4D6138] border-solid bg-[#071518] pl-8 h-[40px] w-[421px] mb-4">
            <img
              src={formData.basic_info.github.avatar}
              className="h-[30px] mx-2 rounded-[30px]"
              alt=""
            />
            <span>{formData.basic_info.github.name}</span>
          </div>
        ) : (
          <></>
        )}
        <Button
          colorStyle="green"
          buttonText="Connect"
          font="IBMPlexMono"
          onClick={loginGithub}
        />
      </div>
      <div className="mb-6">
        <InputLabel text="Build Your Techstack" bold={true}></InputLabel>
        {Reflect.ownKeys(skills).map((key, index) => {
          return (
            <div key={index}>
              <InputLabel text={key} key={key}></InputLabel>
              <div className="flex flex-wrap">
                {skills[key].map((skill) => {
                  return (
                    <Button
                      key={skill.name}
                      colorStyle={skill.status ? 'green' : 'white'}
                      buttonText={skill.name}
                      font="IBMPlexMono"
                      onClick={clickHandler(key, skill.name)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="w-[421px] h-[150px] rounded border-[0.5px] border-solid border-white text-white font-bold mr-4 mb-4 px-6 py-2">
          <p>Do you agree to retrieve your tag sorting by Github</p>
          <div className="flex justify-center">
            <Button colorStyle="green" buttonText="Agree" font="IBMPlexMono" />
            <Button
              colorStyle="white"
              buttonText="Don't Agree"
              font="IBMPlexMono"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <InputLabel text="What's your company/DAO?" bold={true}></InputLabel>
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
