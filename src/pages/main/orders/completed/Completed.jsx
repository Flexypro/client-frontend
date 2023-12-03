import React from 'react';
import './completed.css';
import OrderComponent from '../../../../components/main/order-component/OrderComponent';
import { useOrderContext } from '../../../../providers/OrderProvider';

const Completed = () => {

    const { ordersCompleted } = useOrderContext();

    return (
        <div className='completed'>
            {
                ordersCompleted.length > 0 ?
                ordersCompleted.map((order, index)=>{
                    return (
                        <OrderComponent content={order} key={index}/> 
                    )
                }):
                <div className='create-task-div'>
                    <article>No completed orders</article>
                </div>
            }
                      
        </div>
    );
}

export default Completed;
