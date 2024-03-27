import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Modal from "react-modal";

import Head from "next/head";

import styles from "./styles.module.scss";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "@/service/api"

import Header from "@/components/header";
import { ModalOrder } from "@/components/ModalOrder/index"



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

 export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    neme: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string;
    status: string;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps){

  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
    
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail', {
      params:{
        order_id: id,
      }
    })

    setModalItem(response.data)
    setModalVisible(true)
  }

  async function handleFinshItem(id:string){
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish', {
      order_id: id,
    })
    const response = await apiClient.get('/orders');

    setOrderList(response.data)

    setModalVisible(false)
  }

  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/orders');

    setOrderList(response.data);
  }

  Modal.setAppElement("#__next")

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
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
            <article className={styles.listOrders}>

              {orderList.length === 0 && (
                <span className={styles.emptyList}>
                  Nenhum pedido aberto foi encontrado...
                </span>
              )}

              {orderList.map( item => (
                 <section key={item.id} className={styles.orderItem}>
                 <button onClick={ () => handleOpenModalView(item.id) }>
                   <div className={styles.tag}></div>
                   <span> {item.table}</span>
                 </button>
               </section>
              ))}   
            </article>
        </main>
          {modalVisible && (
            <ModalOrder
              isOpen={modalVisible}
              onRequestClose={handleCloseModal}
              order={modalItem}
              handleFinshOrder={handleFinshItem}
            />
          )}
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

