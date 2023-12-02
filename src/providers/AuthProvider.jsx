import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = props => {
    const handleLogin = (e, username, password) => {
        e.preventDefault() 
        console.log(e.target.username.value)       
    }
    return (
        <AuthContext.Provider value={{handleLogin}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}