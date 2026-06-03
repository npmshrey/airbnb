import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { authDataContext } from "./Auth.context.jsx"
export const userDataContext = createContext()

function UserContextProvider({children}){
    const {serverUrl} = useContext(authDataContext)
    const [userData,setUserData] = useState(null)

    const getCurrentUser = async() => {
        try{
            const result = await axios.get(`${serverUrl}/api/users/current-user`, {withCredentials:true})
            setUserData(result.data.user)
        }catch(error){
            setUserData(null)
            console.log(error)
        }
    }

    useEffect(() => {
        if (serverUrl) {
            getCurrentUser()
        }
    },[serverUrl])

    let value = {
        userData,
        setUserData,
        getCurrentUser
    }

    return(
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContextProvider 
export const useUser = () => useContext(userDataContext)