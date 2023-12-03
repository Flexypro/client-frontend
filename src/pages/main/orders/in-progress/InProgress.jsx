import React from 'react';
import './in-progress.css';
import OrderComponent from '../../../../components/main/order-component/OrderComponent';
import { useOrderContext } from '../../../../providers/OrderProvider';
import { useNavigate } from 'react-router-dom';

const InProgress = () => {

    const {ordersInProgress} = useOrderContext();

    const navigate = useNavigate();

    return (
        <div className='in-progress'>             
            {
                (ordersInProgress.length > 0)?
                ordersInProgress.map((order, index)=>{
                    return <OrderComponent key={index} content={order}/>
                }):
                <div className='create-task-div'>
                    <article>No orders in progress</article>
                    <article className='create-task-helper' onClick={()=>navigate('create-task')}>Create Task</article>
                </div>
            }
        </div> 
    );
}

export default InProgress;
