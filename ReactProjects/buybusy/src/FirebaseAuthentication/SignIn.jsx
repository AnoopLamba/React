import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthValue } from "../AuthenticationContext";

import { auth } from "../firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const { setUser } = useAuthValue();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const clear = () => {
    setEmail("");
    setPass("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        clear();
        toast.success("Signed in successfully!");
        const uid = userCredential.user.uid;
        localStorage.setItem("uid", uid);
        setUser(uid);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code);
      })
      .finally(() => {
        setIsSigningIn(false);
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
