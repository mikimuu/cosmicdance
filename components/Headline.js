import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {Link} from '../components/Link'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })



export  function Headline(props) {
    console.log(props)
  return (
    <div>
        <h1 className={styles.title}>Cosmicdance</h1>
          <p>
            さあ started by editing&nbsp;
            {props.code}
          </p>
    </div>

  )
}
