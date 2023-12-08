import React from 'react';
import './notifications.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthContext } from '../../../providers/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { timeAgo } from '../../../utils/helpers/TimeAgo';
import{ useNavigate } from 'react-router-dom';
import { MdNotificationAdd } from "react-icons/md";
import { getAccessToken } from '../../../utils/auth/AuthService';
import { useOrderContext } from '../../../providers/OrderProvider';

const Notification = () => {

    const navigate = useNavigate();

    const { userToken } = useAuthContext();

    // const userToken = getAccessToken();


    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const notifUrl = `${import.meta.env.VITE_API_URL}/notifications`;
    
    const getNotifications = async() =>{

        try {
            const getNotif = await fetch(notifUrl, {
                method:'get',
                headers:{
                    'content-Type':'application/json',
                    'Authorization':`Bearer ${userToken}`
                }
            })
    
            const notifications = await getNotif.json();
            setNotifications(notifications);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        
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
        updateNotificationIconProfile();        
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
    
            const status = readNotification.status;
    
            return status;
        }
    }

    useEffect(()=>{
        getNotifications();
    },[])

    return (
        <div className='notifications'>
            {
               loading ?
               <div className='notif-skeleton'>
                    <div className='notif-skeleton-content'>
                        <div className='notif-sk-circle'></div>
                        <div className='notif-sk-box'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='notif-skeleton-content'>
                        <div className='notif-sk-circle'></div>
                        <div className='notif-sk-box'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='notif-skeleton-content'>
                        <div className='notif-sk-circle'></div>
                        <div className='notif-sk-box'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='notif-skeleton-content'>
                        <div className='notif-sk-circle'></div>
                        <div className='notif-sk-box'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
               </div>                    
               :
               notifications.length > 0 ?
                notifications?.map((notification, index)=>{
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
                                    <div className='notif-circle' style={{
                                    width:'10px',
                                    height:'10px',
                                    borderRadius:'50%'
                                }}></div> 
                                }                         
                            </div>
                        </div>
                        )
                }):
                <div className='no-notif'>
                    <div className='notif-child-box'>
                        <article>New notifications will appear here, hang on!</article>
                        <MdNotificationAdd size={120} className='placeholder-icon' />
                    </div>
                </div>                
            }                                
        </div>
    );
}

export default Notification;
