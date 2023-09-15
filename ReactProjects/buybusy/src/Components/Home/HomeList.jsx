import styles from "./Home.module.css";
import ProductCard from "./ProductCard";
import { useProductValue } from "../../ProductContext";

function HomeList() {
  const { products, searchQuery, maxPrice, selectedCategories } =
    useProductValue();

  const filteredProducts = products.filter((product) => {
    const isSearchMatched = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const inPriceRange = product.price <= maxPrice;

    const inSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return isSearchMatched && inPriceRange && inSelectedCategory;
  });

  return (
    <div className={styles.List}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.itemCode} product={product} />
      ))}
    </div>
  );
}

export default HomeList;
