import React from 'react';
import './completed.css';
import OrderComponent from '../../../../components/main/order-component/OrderComponent';

const Completed = () => {
    return (
        <div className='completed'>
            <OrderComponent content={[]}/> 
        </div>
    );
}

export default Completed;
