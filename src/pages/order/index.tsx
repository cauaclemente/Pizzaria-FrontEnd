import { FormEvent, useState } from "react";
import Head from "next/head";
import { setupAPIClient } from "@/service/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { toast } from "react-toastify";

import Header from "@/components/header";
import styles from "./styles.module.scss";
import  Router  from "next/router";
import { api } from "@/service/apiClient";

export default function Pedido() {
  const [number, setNumber] = useState("");

  async function openOrder(event: FormEvent) {
    event.preventDefault();

    if (number === "") {
      return;
    }

    try {
      const response = api.post('/order', {
        table: Number(number)
      })
      Router.push("/table");

    } catch{
      toast.error("Erro ao abrir mesa.");
    }
  }

  return (
    <>
      <Head>
        <title>Novo Pedido - LaPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Pedido</h1>
          <form className={styles.form} onSubmit={openOrder}>
            <input 
              type="text"
              placeholder="Numero da mesa"
              className={styles.input}
              value={number}
              onChange={(e) => setNumber(e.target.value)}       
            />
            <button className={styles.buttonAdd} type="submit">
              Abrir mesa
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});
