import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cart.module.css";
import { useProductValue } from "../../ProductContext";
import { useAuthValue } from "../../AuthenticationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseInit";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function CartSidebar() {
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { totalPrice, setTotalPrice, cart } = useProductValue();

  useEffect(() => {
    var newPrice = 0;
    cart.forEach((item) => {
      newPrice += Number(item.price.toFixed(2)) * item.quantity;
    });
    setTotalPrice(newPrice);
  }, [cart]);

  const handlePurchase = async (user) => {
    try {
      const ref = collection(db, "usersOrders", user, "orders");
      await addDoc(ref, {
        timestamp: serverTimestamp(),
        total: totalPrice,
        items: cart,
      });

      const querySnapShot = await getDocs(
        collection(db, "usersCarts", user, "mycart")
      );
      querySnapShot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      navigate("/myorders");
    } catch (error) {
      toast.error("Error purchasing!");
    }
  };

  return (
    <div className={styles.Sidebar}>
      <h2>Total Price</h2>
      <h3>$ {Number(totalPrice.toFixed(2))}</h3>
      <button
        className={styles.purchaseBtn}
        onClick={() => handlePurchase(user)}
      >
        Purchase
      </button>
    </div>
  );
}

export default CartSidebar;
