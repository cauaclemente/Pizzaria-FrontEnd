import Head from "next/head";

import styles from "./styles.module.scss"

import { setupAPIClient } from "@/service/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Header from "@/components/header";



export default function table({ orderList}){
  return(
    <>
      <Head>
        <title>Pedido - LaPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Mesa: 10</h1>
          <form className={styles.form}>
            <select> 
              <option> 12</option>
              <option>15</option>
            </select>
            <select>
              <option>Pizza</option>
              <option>Lanche</option>
            </select>
            <div className={styles.quantidade}>
              <span>Quantidade</span>
              <input 
                className={styles.input}
                type="text"
                placeholder="0"
              />
            </div>
            <div className={styles.actions}>
              <button className={styles.buttonAdd}> + </button>
              <button className={styles.button}>Avançar</button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/allorders')

  return{
    props: {
      orderList: response.data
    }
  }
})
