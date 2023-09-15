import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import styles from "./Orders.module.css";
import { useProductValue } from "../../ProductContext";
import { useAuthValue } from "../../AuthenticationContext";
import { db } from "../../firebaseInit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Spinner from "react-spinner-material";

function Orders() {
  const { user } = useAuthValue();
  const { orders, setOrders } = useProductValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect of orders listener");
    if (user) {
      const ref = collection(db, "usersOrders", user, "orders");
      const q = query(ref, orderBy("timestamp", "desc"));
      const unsub = onSnapshot(q, (querySnapShot) => {
        const dataFromDB = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(dataFromDB);
        setLoading(false);
      });

      return unsub;
    }
  }, [user, setOrders]);

  return (
    <div className={styles.Orders}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : orders.length === 0 ? (
        <h1 className={styles.ordersEmpty}>No order yet!</h1>
      ) : (
        <>
          <h1>Your Orders</h1>
          {orders.map((order) => (
            <OrderTable key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}

export default Orders;
