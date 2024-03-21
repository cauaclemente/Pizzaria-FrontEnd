import { ReactNode, ButtonHTMLAttributes} from "react";
import styles from "./styles.module.scss";

import { CgSpinner } from "react-icons/cg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...rest}: ButtonProps){
    return (
        <button 
            className={styles.button}
            disabled={loading}
            {...rest}    
        >
        {loading ? (
            <CgSpinner color="#fff" size={20} />
        ) : (
            <a className={styles.buttonText}> 
                {children}
            </a>
        )}
        </button>
    )
}