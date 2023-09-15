import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const useAuthValue = () => {
    const value = useContext(authContext);
    return value;
};

function AuthenticationContext(props) {
    console.log("in authcontext.js");

    const [user, setUser] = useState(null);

    useEffect(() => {
        const uid = localStorage.getItem("uid");
        console.log(`Local UID is: ${uid}`);
        if (uid) {
            setUser(uid);
        }
    }, []);

    return (
        <authContext.Provider value={{ user, setUser }}>
            {props.children}
        </authContext.Provider>
    );
};

export { useAuthValue };
export default AuthenticationContext;