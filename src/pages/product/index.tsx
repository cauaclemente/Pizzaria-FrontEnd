import { ChangeEvent, useState } from "react";

import  Head  from "next/head";
import styles from "./styles.module.scss"

import Header from "@/components/header";
import { canSSRAuth } from "@/utils/canSSRAuth";

import { FiUpload } from "react-icons/fi"

export default function Product(){

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }

    const image = e.target.files[0]

    if(image.type === "image/png" || image.type === "image/jpeg"){
      
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      } 
  }

  return(
    <>
      <Head>
        <title>Novo produto - LaPizza</title>
      </Head>
      <div>
        <Header />
          <main className={styles.container}>
            <h1>Novo produto</h1>
            <form className={styles.form}>

              <label className={styles.labelAvatar}>
                <span>
                  <FiUpload color="fff" size={30} />
                </span>
                <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                {avatarUrl && (
                  <img 
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                  />
                )}

              </label>

              <select>
                <option>Bebidas</option>         
                <option>Pizza</option>
              </select>

              <input
                type="text"
                placeholder="Digite o nome do produto"
                className={styles.input}
              />

              <input
                type="text"
                placeholder="Preço do produto"
                className={styles.input}
              />

              <textarea 
                placeholder="Descreva o seu produto..."
                className={styles.input}
              />

              <button className={styles.buttonAdd} type="submit">Cadastrar</button>
            </form>
          </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth (async (ctx) => {

   return {
      props: {},
    }
})