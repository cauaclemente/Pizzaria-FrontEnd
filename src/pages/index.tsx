'use client'

import { FormEvent, useContext } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/home.module.scss"

import logoImg from "../../public/logo.png"

import { Input } from "../components/ui/input/input";
import { Button } from "../components/ui/button/button"
import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {

  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    let data = {
      email: "teste@teste.com",
      password: "123456"
    }

    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>LaPizza - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo LaPizza" />
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Digite seu email"
          />
          <Input
            type="password"
            placeholder="Sua senha"
          />
          <Button 
            type="submit"
            loading={false}
          >
            Acessar
          </Button>
        </form>
        <Link href="/signup">
           <h3 className={styles.text}>Não possui uma conta? <span style={{color : "blue"}}>Cadastra-se</span> </h3>
        </Link>
        </div>
      </div>
    </>
  );
}
