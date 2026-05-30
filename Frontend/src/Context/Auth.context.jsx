import React, { createContext, useState, useEffect } from 'react'

export const authDataContext = createContext();

function AuthContextProvider({ children }) {
    const serverUrl = "http://localhost:8000";
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            return null;
        }
    });

    const value = {
        serverUrl,
        user,
        setUser
    }

    return (
        <>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </>
    )
}
export default AuthContextProvider