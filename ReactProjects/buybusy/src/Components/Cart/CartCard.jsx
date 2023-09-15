import PlusIcon from "../../Icons/square-plus.png";
import MinusIcon from "../../Icons/square-minus.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cart.module.css";
import { db } from "../../firebaseInit";
import { useAuthValue } from "../../AuthenticationContext";
import { increment, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

function CartCard(props) {
  const { cartItem } = props;
  const [itemRemoving, setItemRemoving] = useState(false);
  const { user } = useAuthValue();

  const quantityChange = async (amount) => {
    const ref = doc(db, "usersCarts", user, "mycart", cartItem.id);

    try {
      if (amount > 0) {
        await updateDoc(ref, {
          quantity: increment(1),
        });
      } else {
        const newQuantity = cartItem.quantity - 1;
        if (newQuantity === 0) {
          removeCartItem();
        } else {
          await updateDoc(ref, {
            quantity: increment(-1),
          });
        }
      }
    } catch (error) {
      toast.error("Error updating quantity!");
    }
  };

  const removeCartItem = async () => {
    setItemRemoving(true);
    const ref = doc(db, "usersCarts", user, "mycart", cartItem.id);

    try {
      await deleteDoc(ref);
      toast.success("Item removed!");
    } catch (error) {
      toast.error("Error removing item!");
    } finally {
      setItemRemoving(false);
    }
  };

  return (
    <div className={styles.CartCard}>
      <div className={styles.cartImage}>
        <img src={cartItem.image} alt="product" />
      </div>
      <div className={styles.cartDetails}>
        <p className={styles.titleText}>{cartItem.title}</p>
        <div className={styles.quantityContainer}>
          <p className={styles.productPrice}>$ {cartItem.price}</p>
          <div className={styles.quantityButtons}>
            <img
              onClick={() => quantityChange(-1)}
              src={MinusIcon}
              alt="minus icon"
            />
            <span>{cartItem.quantity}</span>
            <img
              onClick={() => quantityChange(1)}
              src={PlusIcon}
              alt="plus icon"
            />
          </div>
        </div>
        <button onClick={removeCartItem} className={styles.removeBtn}>
          {itemRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default CartCard;
