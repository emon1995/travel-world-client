import { createContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { getRole } from "../api/auth";
// import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    // const [axiosSecure] = useAxiosSecure();

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        if (user) {
            getRole(user?.email).then(data => {
                console.log(data);
                setRole(data);
            })
        }
    }, [user]);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const profileName = (displayName, photoURL) => {
        // setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        })
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const google = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem("access-token");
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // get and set token
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, { email: currentUser?.email })
                    .then(data => {
                        // console.log(data);
                        localStorage.setItem("access-token", data.data.token);
                        setLoading(false);

                    })
                    .catch(err => console.log(err));
            } else {
                localStorage.removeItem("access-token");
            }
            setLoading(false);
        })
        return () => {
            return unSubscribe()
        };
    }, [user]);



    const userInfo = {
        user,
        loading,
        registerUser,
        logIn,
        logOut,
        profileName,
        google,
        role,
        setRole,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthProvider;