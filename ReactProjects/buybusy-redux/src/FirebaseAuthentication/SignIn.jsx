import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signInThunk, userActions } from "../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../store/reducers/userReducer";
import { useEffect, useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isSigningIn, signInSuccess } = useSelector(userSelector);

  const clear = () => {
    setEmail("");
    setPass("");
  };

  useEffect(() => {
    if (signInSuccess) {
      navigate("/");
      dispatch(userActions.setSignInSuccess(false));
    }
  }, [signInSuccess, dispatch, navigate]);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInThunk({ email, pass }))
      .then((actionCreator) => {
        const uid = actionCreator.payload;
        localStorage.setItem("uid", uid);
        dispatch(userActions.setUser(uid));
        clear();
        toast.success("Signed in successfully!");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSignIn(e)}>
        <h2 className={styles.formHeading}>Sign In</h2>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />
        <input
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type="password"
          required
        />
        <button className={styles.formBtn}>
          {isSigningIn ? "..." : "Sign In"}
        </button>
        <span>
          No account ? <Link to="/signup">Create one!</Link>
        </span>
      </form>
    </div>
  );
}

export default SignIn;
