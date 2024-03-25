import Link from "next/link";
import { useContext } from "react"
import { FiLogOut } from "react-icons/fi"

import styles from "./styles.module.scss";

import { AuthContext } from "../../contexts/AuthContext"

export default function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href='/dashboard'>
            <img src="/logo.png" alt="Logo da pizzaria" height={80}  />
          </Link>
          <nav className={styles.menuNav}>
            <Link href='/category'>
              <span> Categoria </span>
            </Link>
            <Link href='/product'>
              <span> Cardapio </span>
            </Link>
            <button onClick={signOut}>
              <FiLogOut size={24}  />
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}