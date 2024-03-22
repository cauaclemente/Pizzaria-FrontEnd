
import '../styles/globals.scss'
import type { AppProps } from "next/app";
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { Providers} from "../contexts/index"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </Providers>
      
  )
  
}
