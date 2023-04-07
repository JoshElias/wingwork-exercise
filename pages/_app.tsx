import '@/styles/globals.css'
import { Nunito } from 'next/font/google'
import type { AppProps } from 'next/app'

const nunito = Nunito({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunito.className}`}>
      <Component {...pageProps} />
    </div>
  )
}