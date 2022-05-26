import styles from "./detail.less"
import logo from "@/assets/images/logo.png"
import React, { useState, useEffect} from 'react'
import {useStorage} from "@/hooks/useStorage.ts"
import Stars from "@/components/Stars"
export default function index(props) {
  const [infos,setInfos] = useStorage("infos")
  const [info,setInfo] = useState({
    username:'',
    email:'',
    about_me:'',
    abilities:''
  })
  const nameChange = (event)=>{
    const username = event.target.value
    setInfo({...info,username})
  }
  const emailChange = (event)=>{
    const email = event.target.value
    setInfo({...info,email })
  }
  const aboutMeChange = (event)=>{
    const about_me = event.target.value
    setInfo({...info, about_me })
  }
  const abilitiesChange = (event)=>{
    const abilities = event.target.value
    setInfo({...info, abilities })
  }
  return (
    <>
      <header>
        <div className={styles.logo}>
          <img src={logo} alt="" />
          <h2>Soul Card</h2>
        </div>
      </header>
      <main>
        <div className={styles.text}>
          <p className={styles.textTop}>Goodmorning~</p>
          <p className={styles.textBottom}>Let’s create your basic informationv</p>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <p>Name</p>
            <input type="text" value={info.username} onChange={nameChange}/>
          </div>
          <div className={styles.formItem}>
            <p>E-Mail</p>
            <input type="Email" value={info.email} onChange={emailChange}/>
          </div>
          <div className={styles.formItem}>
            <p>About Me</p>
            <textarea style={{height:'84px'}} name="" id="" placeholder="you can only use 20 words" value={info.about_me} onChange={aboutMeChange}></textarea>
          </div>
          <div className={styles.formItem}>
            <p>Personal Abilities</p>
            <textarea style={{height:'168px'}} name="" id="" placeholder="you can only use 50 words" value={info.abilities} onChange={abilitiesChange}></textarea>
          </div>
        </div>
      </main>
      <footer>
        <button onClick={()=>{
          setInfos({...infos,...info})
          setTimeout(()=>{
            props.history.push("/field")
          },100)
        }}>
          submit
        </button>
      </footer>
      <Stars></Stars>
    </>
  )
}
