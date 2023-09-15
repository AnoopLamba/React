import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

const productContext = createContext();

const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

function ProductContext(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [cartLoading, setCartLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        console.log("productContext useEffect!");
        const unsub = onSnapshot(collection(db, "products"), (querySnapShot) => {
            const dataFromDB = querySnapShot.docs.map((doc) => (
                { ...doc.data() }
            ));
            setProducts(dataFromDB);
            setProductsLoading(false);
        });

        return unsub;
    }, []);

    const handlePriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((cat) => cat !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <productContext.Provider value={{
            products,
            setProducts,
            cart,
            setCart,
            totalPrice,
            setTotalPrice,
            orders,
            setOrders,
            searchQuery,
            setSearchQuery,
            selectedCategories,
            handleCategoryChange,
            maxPrice,
            setMaxPrice,
            handlePriceChange,
            cartLoading,
            setCartLoading,
            productsLoading,
        }}>
            {props.children}
        </productContext.Provider>
    );
};

export { useProductValue };
export default ProductContext;