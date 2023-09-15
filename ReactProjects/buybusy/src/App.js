import Navbar from "./Components/Navbar/Navbar";
import ErrorPage from "./Components/404/ErrorPage";
import Home from "./Components/Home/Home";
import Orders from "./Components/Orders/Orders";
import Cart from "./Components/Cart/Cart";
import SignIn from "./FirebaseAuthentication/SignIn";
import SignUp from "./FirebaseAuthentication/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuthValue } from "./AuthenticationContext";
import { useProductValue } from "./ProductContext";
import { db } from "./firebaseInit";

function App() {
  console.log("in app.js");
  const { user } = useAuthValue();
  const { setCart, setCartLoading } = useProductValue();

  useEffect(() => {
    console.log("useEffect of cart listener");
    if (user) {
      const ref = collection(db, "usersCarts", user, "mycart");
      const unsub = onSnapshot(ref, (querySnapShot) => {
        const dataFromDB = querySnapShot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCart(dataFromDB);
        setCartLoading(false);
      });

      return () => unsub();
    }
  }, [user, setCart]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        { path: "myorders", element: <Orders /> },
        { path: "cart", element: <Cart /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> }
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
