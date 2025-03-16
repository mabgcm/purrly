import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { getDoc, doc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data());
                } else {
                    setUserInfo(null);
                }
            } else {
                setUser(null);
                setUserInfo(null);
                localStorage.removeItem('user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, userInfo, setUser }}>
            {!loading && children}
        </UserContext.Provider>
    );
};
