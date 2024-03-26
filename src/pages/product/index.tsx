
import { ChangeEvent, FormEvent, useState } from "react";

import  Head  from "next/head";
import styles from "./styles.module.scss"

import Header from "@/components/header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/service/api";

import { FiUpload } from "react-icons/fi"
import { toast } from "react-toastify";


type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

  const [name, setName] = useState("");
  const[price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

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

  function handleCategory(event){
    setCategorySelected(event.target.value)
  }

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    try{
      const data = new FormData();
      
      if(name === '' || price === '' || description === '' || imageAvatar === null){
        toast.error("Preencha todos os campos")
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('product', data);

      toast.success("Produto cadastrado com sucesso")

    }catch(err){
      console.log(err)
      toast.error("Ops erro ao cadastrar")
    }

    setName("");
    setPrice("");
    setDescription("");
    setAvatarUrl(null);
    setAvatarUrl("")
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
            <form className={styles.form} onSubmit={handleRegister}>

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

              <select value={categorySelected} onChange={handleCategory}>
                {categories.map((item, index) => {
                  return(
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })}
              </select>

              <input
                type="text"
                placeholder="Digite o nome do produto"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Preço do produto"
                className={styles.input}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <textarea 
                placeholder="Descreva o seu produto..."
                className={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button className={styles.buttonAdd} type="submit">Cadastrar</button>
            </form>
          </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth (async (ctx) => {

  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/category')

   return {
      props: {
        categoryList: response.data
      },
    }
})