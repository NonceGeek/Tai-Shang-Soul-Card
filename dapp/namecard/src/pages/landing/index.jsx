import React, { useState, useEffect } from 'react'

import { Modal, Checkbox } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Web3 from "web3"
import Web3Modal from "web3modal"

import { useStorage } from "@/hooks/useStorage.ts"
import { get_user } from "@/request/fass.js"

import styles from "./landing.less"

import Cards from '@/components/Cards'

import logo from "@/assets/images/logo.png"
import arrowRight from "@/assets/images/arrowRight.png"
import metaMask from "@/assets/images/metaMask.png"
import stars from "@/assets/images/landing/stars.png"
import articleWave from "@/assets/images/landing/article-wave.png"
import bgP2 from "@/assets/images/landing/bg-p2.png"

let web3Modal
let provider
let selectedAccount = ''

export default function index(props) {
  const [infos, setInfos] = useStorage("infos")
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [mask, setMask] = useState(false);

  web3Modal = new Web3Modal({
    cacheProvider: false,
    disableInjectedProvider: false,
  });
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const onConnect = async () => {
    // console.log("Opening a dialog", web3Modal);
    try {
      provider = await web3Modal.connect();
      console.log("the wallet connection", provider);
      setVisible(false)
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
      });
      provider.on("chainChanged", (chainId) => {
        fetchAccountData();
      });
      provider.on("networkChanged", (networkId) => {
        fetchAccountData();
      });
    }
    await refreshAccountData();
  }
  const onDisconnect = async () => {
    console.log("Killing the wallet connection", provider);
    await web3Modal.clearCachedProvider();
    provider = null
    selectedAccount = null;
    console.log(provider, selectedAccount);
  }
  const refreshAccountData = async () => {
    await fetchAccountData(provider);
  }
  const fetchAccountData = async () => {
    setVisible2(false)
    const web3 = new Web3(provider);
    // console.log("Web3 instance is", web3);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
    setInfos({ ethereum_addr: selectedAccount })
    setVisible2(true)
    // console.log(selectedAccount);
  }
  const connectWallet = async () => {
    onConnect()
  }
  const showAccount = (str, maxlength = 7) => {
    const length = str.length;
    return str.length > maxlength ? str.slice(0, maxlength - 1) + '...' + str.slice(37, length) : str
  }
  const getUser = async ()=>{
    const ethereum_addr = infos.ethereum_addr;
    const data = {
      params: [
        ethereum_addr
      ]
    }
    const res = await get_user(JSON.stringify(data))
    return res.data.result
  } 
  const gotoDao = async()=>{
    const dao = await getUser()
    if(dao){
      props.history.push({
        pathname:'/home',
        query:{
          address:infos.ethereum_addr,
          role:'dao'
        }
      });
    }else{
      props.history.push('/dao');
    }
  }
  const gotoUser = async()=>{
    const user = await getUser()
    if(user){
      props.history.push({
        pathname:'/home',
        query:{
          address:infos.ethereum_addr,
          role:'user'
        }
      });
    }else{
      props.history.push('/detail');
    }
  }
  return (
    <>
      {/* 随后删除 p-0 */}
      <header className="mx-auto w-main h-24 p-0 flex justify-between items-center">
        <div className='flex items-center'>
          <img className="w-logo-sm" src={logo} alt="" />
          <h2 className="ml-3 mb-0 text-3xl text-white font-Audiowide">SoulCard</h2>
        </div>
        <button className="border-2 border-white rounded px-5 py-2 bg-black text-white font-Inter text-xs cursor-pointer" onClick={() => setVisible(true)}>
          <span>
            Register/Login
          </span>
          <img className="ml-2.5" src={arrowRight} alt="" />
        </button>
      </header>
      <div id="p1" className="pt-6 w-full h-80vh relative font-Audiowide">
        <img className='absolute top-72 left-0 w-3/5' src={articleWave} alt="" />
        <div className="mx-auto w-main relative flex flex-col items-start">
          <img className='absolute top-0 right-0' src={stars} alt="" />
          <div className='text-5xl pt-12'>
            Create
            <span className='ml-6 bg-gradient-to-r from-lg-green2-start to-lg-green2-end bg-clip-text text-transparent'>SoulCard</span>
          </div>
          <div className='mt-8 text-rg text-white'>
            to show you in CryptoWorld, to touch cool guys in WEB3
          </div>
        </div>
        <div className='mt-96 w-full flex justify-center'>
          <button
            className='px-5 py-2 border-1 border-black rounded bg-gradient-to-r from-lg-green2-start to-lg-green2-end text-black text-xl cursor-pointer'
            onClick={() => setVisible(true)}
          >
            Create your Soul!
          </button>
        </div>
      </div>
      <div id="p2" className='mt-16 flex flex-col'>
        <img className='w-full' src={bgP2} alt="" />
        <div className='mt-12 mx-auto w-1/2 rounded-xl bg-gradient-to-r from-lg-green2-start to-lg-green2-end p-px'>
          <div className='rounded-xl bg-black text-xl p-10 font-Audiowide'>
            Showcase your different abilities in different fields of interest and create value with like-minded guys.
          </div>
        </div>
      </div>
      <div id="p3" className='w-full'></div>
      <Modal
        centered
        visible={visible}
        onCancel={() => {
          setVisible(false)
          setMask(true)
        }}
        width={334}
        mask={true}
        destroyOnClose={mask}
        maskClosable={false}
        title={null}
        footer={null}
        modalRender={modal => (
          modal
        )}
        closeIcon={<><CloseOutlined style={{ color: "white", fontSize: "20px" }} /></>}
        bodyStyle={{ padding: '0px', color: "white" }}
      >
        <div className={styles.modal}>
          <div className={styles.modalTitle}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.modalBody}>
            <h6>
              Connect wallet
            </h6>
            <button onClick={connectWallet}>
              <img src={metaMask} alt="" />
              MetaMask
            </button>
            {/* <p>I don't have a wallet</p> */}
            <a 
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer">
              I don't have a wallet
            </a>
          </div>
          <div className={styles.modalFooter}>
            <Checkbox onChange={onChange} defaultChecked={true} style={{ color: "white", fontFamily: 'Inter', fontWeight: 50, fontSize: "5px", lineHeight: '12px' }}>
              I agree to NonceGeek Terms and Privacy Policy.
            </Checkbox>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        visible={visible2}
        onCancel={() => {
          setVisible2(false)
          setMask(true)
        }}
        width={334}
        mask={false}
        destroyOnClose={true}
        maskClosable={false}
        title={null}
        footer={null}
        modalRender={modal => (
          modal
        )}
        closeIcon={<><CloseOutlined style={{ color: "white", fontSize: "20px" }} /></>}
        bodyStyle={{ padding: '0px', color: "white" }}
      >
        <div className={styles.modal2}>
          <div className={styles.modalTitle}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.modalBody}>
            <h6>
              Connect wallet
            </h6>
            <p>Skip approving every interaction with your wallet buy allowing Soulcard to remember you .</p>
            <span>
              {showAccount(selectedAccount)}
            </span>
            <button onClick={() => {
              setVisible2(false)
              setVisible3(true)
            }}>Remember Me</button>
          </div>
          <div className={styles.modalFooter}>
            <p>
              Signing keys can only sign messgaes and cannot hold funds. They are Stored securely in the browser database system.
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        visible={visible3}
        onCancel={() => {
          setVisible3(false)
          setMask(true)
        }}
        width={334}
        mask={false}
        destroyOnClose={true}
        maskClosable={false}
        title={null}
        footer={null}
        modalRender={modal => (
          modal
        )}
        closeIcon={<><CloseOutlined style={{ color: "white", fontSize: "20px" }} /></>}
        bodyStyle={{ padding: '0px', color: "white" }}
      >
        <div className={styles.modal3}>
          <div className={styles.modalTitle}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.modalBody}>
            <h6>
              Connection Succeeded
            </h6>
            <span>
              √
            </span>
            <button onClick={()=>{
                setVisible3(false)
                setVisible4(true)
            }}>start</button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        visible={visible4}
        onCancel={() => {
          setVisible4(false)
          setMask(true)
        }}
        width={334}
        mask={false}
        destroyOnClose={true}
        maskClosable={false}
        title={null}
        footer={null}
        modalRender={modal => (
          modal
        )}
        closeIcon={<><CloseOutlined style={{ color: "white", fontSize: "20px" }} /></>}
        bodyStyle={{ padding: '0px', color: "white" }}
      >
        <div className={styles.modal4}>
          <div className={styles.modalTitle}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.modalBody}>
            <h6>
            What is your character?
            </h6>
            <button onClick={gotoDao}>DAO Founder</button>
            <p>You can initiate a DAO or project.</p>
            <button onClick={gotoUser}>Individual User</button>
            <p>You can create your own soulcard
or join in a DAO or project.</p>
          </div>
        </div>
      </Modal>
      <Cards></Cards>
    </>
  )
}
