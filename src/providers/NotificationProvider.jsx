import { useContext } from "react";
import { createContext } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = (props) =>{
    return(
        <NotificationContext.Provider value={{}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}