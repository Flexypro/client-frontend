import { useContext } from "react";
import { createContext } from "react";
import { getAccessToken, setAccessToken } from "../utils/auth/AuthService";
import { useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {

    const [userToken, setUserToken] = useState();

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const loginUrl = `${import.meta.env.VITE_API_URL}/token/`

        try {
            const getToken = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'content-Type':'application/json'
                },
                body: JSON.stringify({
                    'username':username,
                    'password':password
                })            
            })
    
            const status = getToken.status;

            if (status===200){
                const token = await getToken.json()
    
                const accessToken = token.access;
                setAccessToken(accessToken)
                getUserToken();                
                // const refreshToken = token.refresh
            }    
    
        } catch(error) {
            console.log(error)            
        }                
    }

    // const 

    const getUserToken = () => {
        const token = getAccessToken()
        setUserToken(token)
    }

    useEffect(()=>{
        getUserToken();
    },[userToken])
    return (
        <AuthContext.Provider value={{handleLogin, userToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}