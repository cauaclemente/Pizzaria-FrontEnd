'use client';

import { FormEvent, useContext, useState } from "react";
import styles from "../styles/home.module.scss";
import { toast } from "react-toastify";


import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import logoImg from "../../public/logo.png";

import { Input } from "../components/ui/input/input";
import { Button } from "../components/ui/button/button";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {

  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if(email === '' || password === ''){
      toast.error("Preencja todos os campos")
      return
    }

    setLoading(true)

    let data = {
      email,
      password,
    }

    await signIn(data)

    setLoading(false)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

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
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>
        </form>
        <Link style={{textDecoration: "none"}} href="/signup">
           <h3  className={styles.text}>Não possui uma conta? <span style={{color : "blue"}}>Cadastra-se</span> </h3>
        </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})