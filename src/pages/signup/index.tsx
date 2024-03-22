'use client';

import { FormEvent, useState, useContext } from "react"
import { toast } from "react-toastify"

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/home.module.scss"

import logoImg from "../../../public/logo.png"

import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button"
import { AuthContext } from "../../contexts/AuthContext"

export default function SignUp(){

    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent){
        event.preventDefault()

        if(name === "" || email === "" || name === ""){
           toast.error("Preencha todos os campos")
            return;
        }
        setLoading(true)

        let data = {
            name,
            email,
            password
        }

        await signUp(data)

        setLoading(false)
    }

    return(
        <>
        <Head>
            <title>LaPizza - Faça seu cadastro</title>
        </Head>
        <div className={styles.containerCenter}>
            <Image src={logoImg} alt="Logo LaPizza" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>

            <form onSubmit={handleSignUp}>
            <Input
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Digite seu email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
                type="submit"
                loading={loading}
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