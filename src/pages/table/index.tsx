import { FormEvent, useEffect, useState } from "react";

import Head from "next/head";

import styles from "./styles.module.scss"

import { setupAPIClient } from "@/service/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Header from "@/components/header";

import { api } from "@/service/apiClient";
import Router from "next/router";
import { toast } from "react-toastify";


type categoryProps = {
  id: string;
  name: string
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type ProductProps = {
  id: string;
  name: string;
}


export default function table({ orderList }){

  const [table, setTable] = useState('');

  const [category, setCategory] = useState<categoryProps[] | []>([])
  const [categorySelect, setCategorySelect] = useState<categoryProps>()

  const [products, setProducts] = useState("");
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()

  const [amount, setAmount] = useState("1")
  const [items, setItems] = useState<ItemProps[]>([])


  useEffect(() => {
    async function loadInfo(){
      const response = await api.get('/category')

      setCategory(response.data)
      setCategorySelect(response.data[0])

    }

    loadInfo();
  },[])  

  useEffect(() => {

    async function loadProducts(){
        const response = await api.get('/category/product',{
          params:{
            category_id: categorySelect?.id
          }
        })
        
        setProductSelected(response.data[0])
        setProducts(response.data)
      }
    
  
    loadProducts()
  },[categorySelect])
  
  
  async function order(event: FormEvent){
    event.preventDefault();
  }

  async function handleAdd(){
    const response = await api.post('/order/add', {
      order_id: orderList,
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    let data = {
      id: orderList,
      product_id: productSelected?.id as string,
      name: productSelected.name as string,
      amount: amount
    }

    setItems(oldArray => [...oldArray, data])
  }

  function handleAvançar(){
    Router.push('/')
    toast.success("Pedido criado")
  }

  return(
    <>
      <Head>
        <title>Pedido - LaPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Criar pedido </h1>
          <form className={styles.form} onSubmit={order}>
            <select 
              value={table}
              onChange={(e) => setTable(e.target.value)}> 
              {orderList.map(item => (
                <option key={item.id} value={item.id}>
                  Mesa : {item.table}
                </option>
              ))}
            </select>
            {category.length !== 0 && (
              <select
              >
              {category.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
              </select>
            )}
            <div>
            <input
              className={styles.products} 
              type="text"
              placeholder="Digite o produto"
              />
            </div>

            <div className={styles.quantidade}>
              <span>Quantidade</span>
              <input 
                className={styles.input}
                type="text"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.buttonAdd} onClick={handleAdd}> + </button>
              <button type="submit" className={styles.button} onClick={handleAvançar}>Avançar</button>
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
