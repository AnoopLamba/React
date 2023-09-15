import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { useAuthValue } from "../AuthenticationContext";

import { auth } from "../firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { setUser } = useAuthValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const clear = () => {
    setName("");
    setEmail("");
    setPass("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        clear();
        toast.success("Sign up successful!");
        const uid = userCredential.user.uid;
        localStorage.setItem("uid", uid);
        setUser(uid);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code);
      })
      .finally(() => {
        setIsSigningUp(false);
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
