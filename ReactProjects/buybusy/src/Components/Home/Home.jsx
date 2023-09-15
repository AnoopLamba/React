import styles from "./Home.module.css";
import HomeList from "./HomeList";
import HomeSidebar from "./HomeSidebar";
import Spinner from "react-spinner-material";
import { useProductValue } from "../../ProductContext";
import HomeForm from "./HomeForm";

function Home() {
  console.log("home.js");
  const { products, productsLoading } = useProductValue();

  return (
    <div className={styles.Home}>
      {productsLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <h1 className={styles.productsEmpty}>No products!</h1>
      ) : (
        <>
          <HomeForm />
          <HomeSidebar />
          <HomeList />
        </>
      )}
    </div>
  );
}

export default Home;
