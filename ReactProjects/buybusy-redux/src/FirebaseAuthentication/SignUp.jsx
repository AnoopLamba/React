import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpThunk,
  userActions,
  userSelector,
} from "../store/reducers/userReducer";
import { useEffect, useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();
  const { isSigningUp, signUpSuccess } = useSelector(userSelector);

  const clear = () => {
    setName("");
    setEmail("");
    setPass("");
  };

  useEffect(()=> {
    if(signUpSuccess) {
      navigate("/");
      dispatch(userActions.setSignUpSuccess(false));
    }
  }, [signUpSuccess, dispatch, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(signUpThunk({ email, pass }))
      .then((actionCreator) => {
        const uid = actionCreator.payload;
        localStorage.setItem("uid", uid);
        dispatch(userActions.setUser(uid));
        clear();
        toast.success("Sign up successful!");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSignUp(e)}>
        <h2 className={styles.formHeading}>Sign Up</h2>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          required
        />
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
          {isSigningUp ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
