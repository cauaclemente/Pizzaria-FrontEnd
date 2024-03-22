
import '../styles/globals.scss'
import type { AppProps } from "next/app";

import { Providers} from "../contexts/index"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
      
  )
  
}
