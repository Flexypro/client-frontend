import React from 'react';
import './notifications.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthContext } from '../../../providers/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { timeAgo } from '../../../utils/helpers/TimeAgo';
import{ useNavigate } from 'react-router-dom';

const Notification = () => {

    const navigate = useNavigate();

    const { userToken } = useAuthContext();

    const [notifications, setNotifications] = useState([]);

    const notifUrl = `${import.meta.env.VITE_API_URL}/notifications`;
    
    const getNotifications = async(token) =>{

        const getNotif = await fetch(notifUrl, {
            method:'get',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const notifications = await getNotif.json();
        setNotifications(notifications);
    }

    const navigateToOrder = (orderId, notifId) => {
        navigate(`../order/${orderId}`);
        markNotificationRead(notifId)
        .then((status)=>{
            if (status===200){
                console.log("Notification read");
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const markNotificationRead  = async(notifId) => {
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

        const status = readNotification.status;

        return status;
    }

    useEffect(()=>{
        getNotifications(userToken);
    },[userToken])

    return (
        <div className='notifications'>
            {
                notifications.map((notification, index)=>{
                    return (
                        <div style={{backgroundColor:notification?.read_status?'#eeeeee':''}} onClick={()=>navigateToOrder(notification.order_id, notification.id)} className='notif-box' key={index}>
                            <IoMdNotificationsOutline size={30}/>
                            <div className='notif-message'>
                                <article>{notification.message}</article>
                            </div>  
                            <div className='notif-duration'>
                                <article>{timeAgo(notification.created_at)}</article>        
                                {
                                    !notification?.read_status &&
                                    <div style={{
                                    backgroundColor:'green',
                                    width:'10px',
                                    height:'10px',
                                    borderRadius:'50%'
                                }}></div> 
                                }                         
                            </div>
                        </div>
                        )
                })
            }                        
        </div>
    );
}

export default Notification;
