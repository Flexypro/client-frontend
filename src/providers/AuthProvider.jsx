import { useContext } from "react";
import { createContext } from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/auth/AuthService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = props => {

    const navigate = useNavigate();
    const [userToken, setUserToken] = useState();
    const [userProfile, setuserProfile] = useState();

    const getUserProfile =  async (userToken) => {
        const profileUrl = `${import.meta.env.VITE_API_URL}/profile`;
        const getProfile = await fetch(profileUrl, {
            method:'get',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${userToken}`
            }
        });

        const profile = await getProfile.json();
        setuserProfile(profile[0]);
    }

    const handleLogOut = () => {
        removeAccessToken();
        setUserToken(null);
        navigate('/');
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const loginUrl = `${import.meta.env.VITE_API_URL}/token/`;

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

    useEffect(()=>{
        userToken && getUserProfile(userToken);
    }, [userToken])
    return (
        <AuthContext.Provider value={{handleLogin, handleLogOut, userToken, userProfile}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}