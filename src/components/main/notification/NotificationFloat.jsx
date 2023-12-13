import React from 'react';
import { useNotificationContext } from '../../../providers/NotificationProvider';
import { timeFormater } from '../../../utils/helpers/TimeFormater';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const NotificationFloat = () => {
    const { newNotification, showNotification, toggleShow } = useNotificationContext();
    // const navigate = useNavigate();    

    return (  
        showNotification ?      
        <div className='notification-float-box'>
            <article>{newNotification.message}</article>
            <small>{timeFormater(newNotification.created_at)}</small>
            <RxCross2 size={20} className='cross' onClick={toggleShow} />
        </div>:
        null
    );
}

export default NotificationFloat;
