import styles from "./Home.module.css";
import { useProductValue } from "../../ProductContext";

function HomeSidebar() {
  const {
    handleCategoryChange,
    maxPrice,
    selectedCategories,
    handlePriceChange,
  } = useProductValue();

  const categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Jewelery",
    "Electronics",
  ];

  return (
    <div className={styles.Sidebar}>
      <h2>Filter</h2>
      <label>
        Max Price: ${maxPrice}
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          step={50}
          onChange={handlePriceChange}
        />
      </label>
      <h2>Category</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                value={category.toLowerCase()}
                checked={selectedCategories.includes(category.toLowerCase())}
                onChange={() => handleCategoryChange(category.toLowerCase())}
              />
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSidebar;
