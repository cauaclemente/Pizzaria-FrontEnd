import { useState } from "react";

import Head from "next/head";

import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import Header from "@/components/header";
import { setupAPIClient } from "@/service/api";

import { FiRefreshCcw } from "react-icons/fi";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps{
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps){

  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenModalView(){
    alert("teste")
  }

  return(
    <>
    <Head>
        <title>Painel - LaPizza</title> 
    </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
            <article className={styles.listOrders}>
              {orderList.map( item => (
                 <section key={item.id} className={styles.orderItem}>
                 <button onClick={ () => handleOpenModalView() }>
                   <div className={styles.tag}></div>
                   <span> {item.table}</span>
                 </button>
               </section>
              ))}   
            </article>
        </main>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  return {
      props:{
        orders: response.data
      }
  }
})

