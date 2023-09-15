import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";
import { useAuthValue } from "../../AuthenticationContext";
import { useProductValue } from "../../ProductContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  addDoc,
  collection,
  increment,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseInit";

function ProductCard(props) {
  const { product } = props;
  const { user } = useAuthValue();
  const { cart } = useProductValue();
  const [itemAdding, setItemAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (prod) => {
    setItemAdding(true);
    if (user === null) {
      toast.error("Login in to add item!");
      setItemAdding(false);
      navigate("/signin");
      return;
    }

    const index = cart.findIndex(
      (cartItem) => cartItem.itemCode === prod.itemCode
    );

    try {
      if (index === -1) {
        const ref = collection(db, "usersCarts", user, "mycart");
        await addDoc(ref, {
          quantity: 1,
          ...prod,
        });
        toast.success("Added to cart!");
      } else {
        const ref = doc(db, "usersCarts", user, "mycart", cart[index].id);
        await updateDoc(ref, {
          quantity: increment(1),
        });
        toast.success("Quantity increased!");
      }
    } catch (error) {
      toast.error("Error adding item to cart!");
    } finally {
      setItemAdding(false);
    }
  };

  return (
    <div className={styles.ProductCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt="product" />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.titleText} title={product.title}>
          {product.title}
        </p>
        <p className={styles.productPrice}>$ {product.price}</p>
        <button
          className={styles.addBtn}
          onClick={() => handleAddToCart(product)}
        >
          {itemAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
