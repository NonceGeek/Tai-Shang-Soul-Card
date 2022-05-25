import styles from "./link.less"
import logo from "@/assets/images/logo.png"
import React, { useState, useEffect} from 'react'
import {useStorage} from "@/hooks/useStorage.ts"
import Stars from "@/components/Stars"
export default function index(props) {
  const [infos,setInfos] = useStorage("infos")
  const [articleLink,setArticleLink] = useState("")
  const [coodLink,setCoodLink] = useState("")
  const [designLink,setDesignLink] = useState("")
  const alChange =(event)=>{
    const articleLink = event.target.value
    setArticleLink(articleLink)
  }
  const clChange =(event)=>{
    const coodLink = event.target.value
    setCoodLink(coodLink)
  }
  const dlChange =(event)=>{
    const designLink = event.target.value
    setDesignLink(designLink)
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
          <p className={styles.textBottom}>Add more details to feed your soul</p>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <p>Article Link</p>
            <input type="text" value={articleLink} onChange={alChange}/>
          </div>
          <div className={styles.formItem}>
            <p>Cood Link</p>
            <input type="text" value={coodLink} onChange={clChange}/>
          </div>
          <div className={styles.formItem}>
            <p>Design Link</p>
            <input type="text" value={designLink} onChange={dlChange}/>
          </div>
        </div>
      </main>
      <footer>
        <button onClick={()=>{
            setInfos({...infos,article_link:"",cood_link:"",design_link:""})
            setTimeout(()=>{
              props.history.push("/gist")
            },100)
        }}>Skip</button>
        <button onClick={()=>{
            setInfos({...infos,article_link:articleLink,cood_link:coodLink,design_link:designLink})
            setTimeout(()=>{
                props.history.push("/gist")
            },100)
        }}>
          submit
        </button>
      </footer>
      <Stars></Stars>
    </>
  )
}

