import styles from "./Cart.module.css";
import CartCard from "./CartCard";
import { useProductValue } from "../../ProductContext";

function CartList() {
  const { cart } = useProductValue();

  return (
    <div className={styles.List}>
      {cart.map((cartItem) => (
        <CartCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default CartList;
