import { useContext } from "react";
import { createContext } from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/auth/AuthService";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = props => {

    const [loading, setLoading] = useState(false);

    const profileUrl = `${import.meta.env.VITE_API_URL}/profile`;

    const navigate = useNavigate();
    const [userToken, setUserToken] = useState(getAccessToken());
    const [loadedUserProfile, setuserProfile] = useState();
    const [loadingUserProfile, setLoadingUserProfile] = useState(false);

    
    const headers = {
        'content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`
    }
    
    const getUserProfile =  async () => {
        setLoadingUserProfile(true);
        try {
            const getProfile = await fetch(`${profileUrl}`, {
                method:'get',
                headers
            });
    
            const profile = await getProfile.json();
            // console.log(profile);
            setuserProfile(profile[0]);
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingUserProfile(false);
        }
    }

    const handleLogOut = () => {
        removeAccessToken();
        setUserToken(null);
        navigate('/');
    }

    const handleLogin = async (e) => {
        setLoading(true);
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
                const token = await getToken.json();
    
                const accessToken = token.access;
                setAccessToken(accessToken);
                getUserToken();  
                setLoading(false);              
                // const refreshToken = token.refresh
            } 
            setLoading(false);        
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }             
    }

    const uploadProfilePhoto = async(photo, id) => {
        const data = new FormData();
        data.append('profile_photo', photo);

        try {            
            const response = await fetch(`${profileUrl}/${id}/`, {
                method:'put',
                headers:{
                    'Authorization':`Bearer ${userToken}`
                },
                body:data
            })

            const res = response.json();
            return res;

        } catch (error) {
            console.error(error);
        } finally{
            
        }
    }

    const submitNewBio = async(newBio, id) => {
        try {
            const response = await fetch(`${profileUrl}/${id}/`, {
                method:'put',
                headers:headers,
                body:JSON.stringify({
                    "bio":newBio
                })
            })

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        } finally {}
    }

    const getUserToken = () => {
        const token = getAccessToken();
        setUserToken(token);
    }

    useEffect(()=>{
        if (!userToken){
            getAccessToken();
        } 
        userToken && getUserProfile();
        
        
    }, [userToken])
    return (
        <AuthContext.Provider value={{
            handleLogin, 
            handleLogOut, 
            submitNewBio, 
            uploadProfilePhoto, 
            userToken, 
            loadedUserProfile,
            loadingUserProfile,
            loading
        }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}