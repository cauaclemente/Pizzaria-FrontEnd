import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/home.module.scss"

import logoImg from "../../../public/logo.png"

import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button"

export default function SignUp(){
    return(
        <>
        <Head>
            <title>LaPizza - Faça seu cadastro</title>
        </Head>
        <div className={styles.containerCenter}>
            <Image src={logoImg} alt="Logo LaPizza" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>

            <form>
            <Input
                type="text"
                placeholder="Digite seu nome"
            />
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
                Cadastrar
            </Button>
            </form>
            <Link href="/">
              <h3 className={styles.text}>ja possui uma conta? <span style={{color : "blue"}}>Faça login</span> </h3>  
            </Link>
            </div>
        </div>
    </>
    )
}