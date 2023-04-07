import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Hola mundo</h5>
        </div>
      </div>
    </div>
  )
}
