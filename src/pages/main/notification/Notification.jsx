import React from 'react';
import './notifications.css';
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
    return (
        <div className='notifications'>
            <div className='notif-box'>
                <IoMdNotificationsOutline size={30}/>
                <div className='notif-message'>
                    <article>Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur adipisicing elit.</article>
                </div>  
                <div className='notif-duration'>
                    <article>4 Hours</article>                                  
                </div>
            </div>
            <div className='notif-box'>
                <IoMdNotificationsOutline size={30}/>
                <div className='notif-message'>
                    <article>Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur adipisicing elit.</article>
                </div>  
                <div className='notif-duration'>
                    <article>4 Hours</article>                                  
                </div>
            </div>
        </div>
    );
}

export default Notification;
