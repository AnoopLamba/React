import styles from "./Home.module.css";
import { useProductValue } from "../../ProductContext";

function HomeForm() {
  const { searchQuery, setSearchQuery } = useProductValue();

  return (
    <div className={styles.HomeForm}>
      <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search..." />
    </div>
  );
}

export default HomeForm;
