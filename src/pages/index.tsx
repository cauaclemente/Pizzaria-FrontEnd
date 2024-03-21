import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.scss"

import logoImg from "../../public/logo.png"

import { Input } from "../components/ui/input/input";
import { Button } from "../components/ui/button/button"


export default function Home() {
  return (
    <>
      <Head>
        <title>LaPizza - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo LaPizza" />
      <div className={styles.login}>
        <form>
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
          <a className={styles.text}>Não possui uma conta? <span style={{color : "blue"}}>Cadastra-se</span></a>
        </div>
      </div>
    </>
  );
}
