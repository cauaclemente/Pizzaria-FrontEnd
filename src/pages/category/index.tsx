import { FormEvent, useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import Header from "@/components/header";

export default function Category(){

  const [name, setName] = useState("")

  async function handleRegister(event: FormEvent){
    event.preventDefault()

    alert("categoria")
  }

  return(
    <>
      <Head>
        <title>Nova categoria - LaPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>       
          <form className={styles.form} onSubmit={handleRegister}>
            <input 
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>

        </main>
      </div>
    </>
  )
}