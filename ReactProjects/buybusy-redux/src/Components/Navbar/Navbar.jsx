import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "../../Icons/house-chimney.png";
import OrdersIcon from "../../Icons/ballot.png";
import CartIcon from "../../Icons/shopping-cart.png";
import SignOutIcon from "../../Icons/exit.png";
import SignInIcon from "../../Icons/enter.png";
import styles from "./Navbar.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutThunk,
  userSelector,
  userActions,
} from "../../store/reducers/userReducer";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { user, signOutSuccess } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signOutSuccess) {
      navigate("/");
      dispatch(userActions.setSignOutSuccess(false));
    }
  }, [signOutSuccess, dispatch, navigate]);

  const handleSignOut = () => {
    dispatch(signOutThunk())
      .then(() => {
        localStorage.removeItem("uid");
        dispatch(userActions.setUser(null));
        toast.success("Logged out successfully!");
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <>
      <div className={styles.Navbar}>
        <Link to="/" className={styles.navLogo}>
          Buy Busy
        </Link>
        <ul className={styles.navMenu}>
          <li className={styles.navOption}>
            <Link to="/" className={styles.navLink}>
              <img
                className={styles.navIcon}
                src={HomeIcon}
                alt="home button"
              />
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className={styles.navOption}>
                <Link to="/myorders" className={styles.navLink}>
                  <img
                    className={styles.navIcon}
                    src={OrdersIcon}
                    alt="orders icon"
                  />
                  My Orders
                </Link>
              </li>
              <li className={styles.navOption}>
                <Link to="/cart" className={styles.navLink}>
                  <img
                    src={CartIcon}
                    className={styles.navIcon}
                    alt="cart icon"
                  />
                  Cart
                </Link>
              </li>
              <li className={styles.navOption} onClick={handleSignOut}>
                <Link className={styles.navLink}>
                  <img
                    src={SignOutIcon}
                    className={styles.navIcon}
                    alt="sign out icon"
                  />
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.navOption}>
              <Link to="/signin" className={styles.navLink}>
                <img
                  src={SignInIcon}
                  className={styles.navIcon}
                  alt="sign in icon"
                />
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
