import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Header from "@/components/header"


export default function Dashboard(){
  return(
    <>
    <Head>
        <title>Painel - LaPizza</title> 
    </Head>
      <div>
        <Header />
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
      props:{}
  }
})

