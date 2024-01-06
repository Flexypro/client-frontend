import { useContext } from "react";
import { createContext } from "react";
import { useJwt } from 'react-jwt';
import { useAuthContext } from "./AuthProvider";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { timeFormater } from "../utils/helpers/TimeFormater";

export const NotificationContext = createContext();

export const NotificationProvider = (props) =>{

    const { userToken } = useAuthContext();

    const { decodedToken } = useJwt(userToken);

    const [socket, setSocket] = useState();

    const [user, setUser] = useState();

    const notifUrl = `${import.meta.env.VITE_API_URL}/notifications`;

    const [newNotification, setNewNotification] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadNotif, setUnreadNotif] = useState([])

    const toggleShow = () => {
        setShowNotification(false);
    }

    const getUnread = (notifications) => {
        const updatedNotif = notifications.filter((notif) => notif.read_status === false);
        setUnreadNotif(updatedNotif);
        return updatedNotif;
    }

    const getNotifications = async() =>{
        try {
            const getNotif = await fetch(notifUrl, {
                method:'get',
                headers:{
                    'content-Type':'application/json',
                    'Authorization':`Bearer ${userToken}`
                }
            })
    
            if (getNotif.ok) {
                const notifications = await getNotif.json();
                getUnread(notifications);
                setNotifications(notifications);
                return notifications
            } else {
                const status = getNotif.status;
                if (status===401){
                    navigate('/login?redirect=notifications');
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }        
    }

    const markNotificationRead  = async(notifId) => {
        const notification = notifications.find(item=>item.id===notifId);

        if (!notification?.read_status) {
            const readNotification = await fetch(`${notifUrl}/${notifId}/`, {
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${userToken}`
                },
                body:JSON.stringify({
                    'read_status':true
                })
            })

            if (readNotification.ok) {
                getNotifications();
            }
        }
    }

    useEffect(()=>{
        getNotifications();
    },[userToken])

    const CustomToast = ({newNotification}) => {
        return (
            <div style={{
                display:'flex'
            }}>
                <article>{newNotification?.message}</article>
                <small style={{
                    position:'absolute',
                    right:'4%',
                    bottom:'4%'
                }}>{timeFormater(newNotification.created_at)}</small>
            </div>
        )
    }

    useEffect(()=>{
        setUser(decodedToken?.user_id);

        if (user) {
            const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/${user}/`);        
            setSocket(newSocket);

            newSocket.onmessage = (event) => {
                const receivedData = JSON.parse(event.data);                
                console.log(receivedData);

                if (receivedData.type==='new_notification'){
                    const newNotification = (receivedData.message.notification);
                    setNewNotification(newNotification);
                    toast.success(                                                                        
                        <CustomToast newNotification={newNotification} />,                     
                        {
                            position:'bottom-left',
                            html:true,                           
                        },
                    )
                    setNotifications(prev=>{
                        const updatedNotif = [newNotification, ...prev];  
                        getUnread(updatedNotif);
                        setNotifications(updatedNotif);
                        return updatedNotif;
                    });
                    receivedData.type = null
                } 
            }
            setSocket(newSocket);            
        } else {
            socket?.close();
        }

        return () => {
            if (socket){
                socket.close();
            }
        }
    }, [user, decodedToken])

    return(
        <NotificationContext.Provider value={{loading, unreadNotif, showNotification, newNotification, notifications, markNotificationRead, getNotifications, toggleShow}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}