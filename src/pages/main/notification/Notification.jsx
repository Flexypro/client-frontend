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
    
    const getNotifications = async(token) =>{
        const notifUrl = `${import.meta.env.VITE_API_URL}/notifications`;

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

    const navigateToOrder = (orderId) => {
        navigate(`../order/${orderId}`);
    }

    useEffect(()=>{
        getNotifications(userToken);
    },[userToken])

    return (
        <div className='notifications'>
            {
                notifications.map((notification, index)=>{
                    return (
                        <div onClick={()=>navigateToOrder(notification.order_id)} className='notif-box' key={index}>
                            <IoMdNotificationsOutline size={30}/>
                            <div className='notif-message'>
                                <article>{notification.message}</article>
                            </div>  
                            <div className='notif-duration'>
                                <article>{timeAgo(notification.created_at)}</article>                                  
                            </div>
                        </div>
                        )
                })
            }                        
        </div>
    );
}

export default Notification;
