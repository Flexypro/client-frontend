import React from 'react';
import './solved.css';
import OrderComponent from '../../../components/main/order-component/OrderComponent';
const Solved = () => {
    return (
        <div className='solved'>
            <OrderComponent content={[]}/>
            <OrderComponent content={[]}/>
        </div>
    );
}

export default Solved;
