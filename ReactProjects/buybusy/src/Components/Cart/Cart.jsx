import CartSidebar from "./CartSidebar";
import CartList from "./CartList";
import styles from "./Cart.module.css";
import { useProductValue } from "../../ProductContext";
import Spinner from "react-spinner-material";

function Cart() {
  const { cartLoading, cart } = useProductValue();

  return (
    <div className={styles.Cart}>
      {cartLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : cart.length === 0 ? (
        <h1 className={styles.cartEmpty}>No items in cart!</h1>
      ) : (
        <>
          <CartSidebar />
          <CartList />
        </>
      )}
    </div>
  );
}

export default Cart;