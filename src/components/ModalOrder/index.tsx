import styles from "./styles.module.scss"
import Modal from "react-modal"
import { FiX } from "react-icons/fi"
import { OrderItemProps } from "@/pages/dashboard";

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinshOrder: (id:string) => void
}

export  function ModalOrder({ isOpen, onRequestClose, order, handleFinshOrder}: ModalOrderProps){

  const calcularValorTotal = () => {
    return order.reduce((total, item) => total + (item.amount * parseFloat(item.product.price)), 0);
  };


  const customStyles = {
    content: {
      
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e"
    }
  }

  return(
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{background: "transparent", border: 0}}
        > 
          <FiX size={45} color="#f34748" />
        </button>
        <div className={styles.container}>
          <h2> Detalhes do pedido </h2>
          <span className={styles.table}>
            Mesa: <strong style={{color: "#fa1b2a"}}>{order[0].order.table}</strong>
          </span>
          {order.map(item => (
            <section key={item.id} className={styles.containerItem}>
              <span>{item.amount} - <strong>{item.product.neme}</strong></span>
              <span className={styles.description}>
                {item.product.description}
              </span> 
              <span className={styles.valor}>Valor: R$ {(item.amount * parseFloat(item.product.price)).toFixed(2)}</span>
            </section>
          ))}
          <div>
          <span>Total do Pedido: R$ <strong>{calcularValorTotal().toFixed(2)}</strong></span>
          </div>
          <button className={styles.buttonOrder} onClick={() => handleFinshOrder(order[0].order_id) }>
            Concluir pedido
          </button>  
        </div>
      </Modal>
    </>
  )
}